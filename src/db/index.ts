// database connection
import { createClient } from '@libsql/client'
import { drizzle } from 'drizzle-orm/libsql'

import env from '../env'

// Imports all exported members from the ./schema file, and Bundles them into a single object called schema
import * as schema from './schema'

// libSQL can connect to both SQLite files and Turso remote databases
// LibSQL is a fork of SQLite that offers a bit more functionality compared to standard SQLite

// The lib Sql client that Turso provide can actually talk to a file on your local machine.
// So when we are running in Dev mode, we can talk to a sqlite database living in the same folder
// When we deploy, we can create an Turso instance and then set our environment variable to be that endpoint
const client = createClient({
  url: env.DATABASE_URL,
  authToken: env.DATABASE_AUTH_TOKEN,
})

// create a drizzle db instance
// let drizzle know about the schema, so that we can use the schema to query the database
const db = drizzle(client, { schema })

export default db
