// import { neon, neonConfig } from '@neondatabase/serverless';
// import { drizzle } from 'drizzle-orm/neon-http';
import { drizzle, type NodePgDatabase } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'
import { env } from '@/env.mjs';
 
// neonConfig.fetchConnectionCache = true;
 
// const sql = neon(env.DB_URL);
// export const db = drizzle(sql);

const pool = new Pool({
  connectionString: env.DB_URL,
})
export const db: NodePgDatabase = drizzle(pool)
