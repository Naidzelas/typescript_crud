import sql from 'mssql';
import { config } from './config'

let pool: sql.ConnectionPool | null = null;

export async function getConnection(): Promise<sql.ConnectionPool> {
  if (!pool) {
    pool = await sql.connect(config.database);
  }
  return pool;
}

export async function closeConnection(): Promise<void> {
  if (pool) {
    await pool.close();
    pool = null;
  }
}