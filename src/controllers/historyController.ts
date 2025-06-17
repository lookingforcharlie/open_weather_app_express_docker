import { desc, eq } from 'drizzle-orm'
import { Request, Response } from 'express'
import { z } from 'zod'
import db from '../db/index.js'
import { insertSearchHistorySchema, searchHistory } from '../db/schema.js'

export const historyController = {
  // Add new search history
  async addSearchHistory(req: Request, res: Response) {
    try {
      const validatedData = insertSearchHistorySchema.parse(req.body)
      const result = await db
        .insert(searchHistory)
        .values(validatedData)
        .returning()

      res.status(201).json({
        success: true,
        data: result[0],
        message: 'Search history added successfully',
      })
    } catch (error) {
      console.error('Error adding search history:', error)

      if (error instanceof z.ZodError) {
        return res.status(400).json({
          success: false,
          error: 'Validation error',
          details: error.errors,
        })
      }

      res.status(500).json({
        success: false,
        error: 'Failed to add search history',
      })
    }
  },

  // Get all search history
  async getAllSearchHistory(req: Request, res: Response) {
    try {
      const history = await db
        .select()
        .from(searchHistory)
        .orderBy(desc(searchHistory.createdAt))

      res.json({
        success: true,
        data: history,
        count: history.length,
      })
    } catch (error) {
      console.error('Error fetching search history:', error)
      res.status(500).json({
        success: false,
        error: 'Failed to fetch search history',
      })
    }
  },

  // Delete specific search history
  async deleteSearchHistory(req: Request, res: Response) {
    try {
      if (!req.params.id) {
        return res.status(400).json({
          success: false,
          error: 'ID parameter is required',
        })
      }
      const id = parseInt(req.params.id)

      if (isNaN(id)) {
        return res.status(400).json({
          success: false,
          error: 'Invalid ID format',
        })
      }

      const result = await db
        .delete(searchHistory)
        .where(eq(searchHistory.id, id))
        .returning()

      if (result.length === 0) {
        return res.status(404).json({
          success: false,
          error: 'Search history not found',
        })
      }

      res.json({
        success: true,
        message: 'Search history deleted successfully',
      })
    } catch (error) {
      console.error('Error deleting search history:', error)
      res.status(500).json({
        success: false,
        error: 'Failed to delete search history',
      })
    }
  },
}
