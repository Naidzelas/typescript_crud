import { getConnection } from '../database';
import { AppActivityLog } from '../types';
import sql from 'mssql';
import { AppDataSource } from '../data-source';

export class LogService {
  async createLog(log: AppActivityLog): Promise<void> {
    try {
      console.log('[LogService] Creating log:', { code: log.code, action: log.action });
      
      const pool = await getConnection();
      const result = await pool
        .request()
        .input('code', sql.Int, log.code)
        .input('action', sql.NVarChar(255), log.action)
        .input('payload', sql.NVarChar(sql.MAX), JSON.stringify(log.payload))
        .query(`
          INSERT INTO app_activity_log (code, action, payload)
          VALUES (@code, @action, @payload)
        `);
      
      console.log('[LogService] Log created successfully, rows affected:', result.rowsAffected);
    } catch (error) {
      console.error('[LogService] Error creating activity log:', error);
      throw error;
    }
  }

  async getAllLogs(): Promise<AppActivityLog[]> {
    try {
      const pool = await getConnection();
      const result = await pool
        .request()
        .query(`
          SELECT * FROM app_activity_log
          ORDER BY created_at DESC
        `);
      return result.recordset;
    } catch (error) {
      console.error('Error fetching logs:', error);
      throw error;
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
