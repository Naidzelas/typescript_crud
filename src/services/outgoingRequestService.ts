import { getConnection } from '../database';
import { OutgoingRequest } from '../types';
import sql from 'mssql';

export class OutgoingRequestService {
  async logRequest(request: OutgoingRequest): Promise<void> {
    try {
      console.log('[OutgoingRequestService] Logging request:', { 
        endpoint: request.endpoint, 
        method: request.method, 
        code: request.code 
      });
      
      const pool = await getConnection();
      const result = await pool
        .request()
        .input('endpoint', sql.NVarChar(255), request.endpoint)
        .input('method', sql.NVarChar(10), request.method)
        .input('payload', sql.NVarChar(sql.MAX), JSON.stringify(request.payload))
        .input('code', sql.Int, request.code)
        .query(`
          INSERT INTO outgoing_requests (endpoint, method, payload, code)
          VALUES (@endpoint, @method, @payload, @code)
        `);
      
      console.log('[OutgoingRequestService] Request logged successfully, rows affected:', result.rowsAffected);
    } catch (error) {
      console.error('[OutgoingRequestService] Error logging outgoing request:', error);
      throw error;
    }
  }

  async getAllRequests(): Promise<OutgoingRequest[]> {
    try {
      const pool = await getConnection();
      const result = await pool
        .request()
        .query(`
          SELECT * FROM outgoing_requests
          ORDER BY created_at DESC
        `);
      return result.recordset;
    } catch (error) {
      console.error('Error fetching outgoing requests:', error);
      throw error;
    }
  }
}
