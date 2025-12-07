import sql from 'mssql';
import { config } from './config';

let pool: sql.ConnectionPool | null = null;

export async function getConnection(): Promise<sql.ConnectionPool> {
  if (!pool) {
    const dbConfig: sql.config = {
      server: config.database.server,
      database: config.database.database,
      user: config.database.user,
      password: config.database.password,
      driver: 'msnodesqlv8',
      options: {
        trustedConnection: true,
        encrypt: config.database.options.encrypt,
        trustServerCertificate: config.database.options.trustServerCertificate,
        enableArithAbort: config.database.options.enableArithAbort,
        connectTimeout: config.database.options.connectTimeout,
        requestTimeout: config.database.options.requestTimeout,
      },
    };

    pool = await sql.connect(dbConfig);
  }
  return pool;
}

export async function closeConnection(): Promise<void> {
  if (pool) {
    await pool.close();
    pool = null;
  }
}