import { defineConfig } from 'drizzle-kit'

import env from './src/env'

export default defineConfig({
  dialect: 'turso',
  schema: './src/db/schema.ts',
  out: './src/db/migrations',
  dbCredentials: {
    url: env.DATABASE_URL,
    authToken: env.DATABASE_AUTH_TOKEN,
  },
})

// "npx drizzle-kit generate" or "npx drizzle-kit generate --config=drizzle.config.ts" to generate migrations
// "npx drizzle-kit push" to push the migrations to the database
// then you will see a dev.db sqlite file in the root of the project (dev.db is the file we set up in .env file)
// add dev.db to .gitignore
// "npx drizzle-kit studio": the built-in web based tool to open the studio to view the database
