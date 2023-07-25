import { drizzle, type NodePgDatabase } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'
import { env } from '@/env.mjs'

const pool = new Pool({
  connectionString: env.DB_URL,
})
export const db: NodePgDatabase = drizzle(pool)
