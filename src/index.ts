import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import searchHistoryRoutes from './routes/historyRoutes'

// Load environment variables from .env file
dotenv.config()

const app = express()
const port = process.env.PORT || 4750

app.use(cors()) // Enable CORS for frontend
app.use(express.json()) // Parse JSON bodies

// debugging docker
console.log('NODE_ENV:', process.env.NODE_ENV)
console.log('DATABASE_URL:', process.env.DATABASE_URL)

app.get('/', (req, res) => {
  res.json({
    message: 'Weather App Backend API on Vercel',
    version: '1.0.0',
    endpoints: {
      searchHistory: '/api/search-history',
    },
  })
})

// Mount search history routes
app.use('/api/search-history', searchHistoryRoutes)

// Error handling middleware
app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error('Unhandled error:', err)
    res.status(500).json({
      success: false,
      error: 'Internal server error',
    })
  }
)

// 404 handler
// * as a wildcard gets type error, fixed when changed to /*splat
app.use('/*splat', (req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found',
  })
})

app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`)
})

// Only start server in development (not on Vercel)
// if (process.env.NODE_ENV !== 'production') {
//   app.listen(port, () => {
//     console.log(`Server is running on port http://localhost:${port}`)
//   })
// }

// for deployment on Vercel
// export default app
