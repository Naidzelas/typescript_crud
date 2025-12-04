import { getConnection } from '../database';
import { AppActivityLog } from '../types';
import sql from 'mssql';

export class LogService {
  async createLog(log: AppActivityLog): Promise<void> {
    try {
      const pool = await getConnection();
      await pool
        .request()
        .input('id', sql.Int, log.id || null)
        .input('code', sql.NVarChar(100), log.code)
        .input('payload', sql.NVarChar(sql.MAX), JSON.stringify(log.payload))
        // .input('created_by', sql.NVarChar(100), log.created_by)
        .input('created_at', sql.DateTime, log.created_at || null)
        .query(`
          INSERT INTO app_activity_log (id, code, payload, created_at)
          VALUES (@id, @code, @payload, @created_at    )
        `);
    } catch (error) {
      console.error('Error creating log:', error);
    }
  }

  async getRecentLogs(limit: number = 100): Promise<AppActivityLog[]> {
    try {
      const pool = await getConnection();
      const result = await pool
        .request()
        .input('Limit', sql.Int, limit)
        .query(`
          SELECT TOP (@Limit) * FROM app_activity_log
          ORDER BY created_at DESC
        `);
      return result.recordset;
    } catch (error) {
      console.error('Error fetching logs:', error);
      throw error;
    }
  }

  async getLogsByClientId(clientId: number): Promise<AppActivityLog[]> {
    try {
      const pool = await getConnection();
      const result = await pool
        .request()
        .input('ClientId', sql.Int, clientId)
        .query(`
          SELECT * FROM app_activity_log
          WHERE id = @ClientId
          ORDER BY created_at DESC
        `);
      return result.recordset;
    } catch (error) {
      console.error('Error fetching logs by client:', error);
      throw error;
    }
  }
}
