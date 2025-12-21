import { AppActivityLog as AppActivityLogType } from '../types';
import { AppDataSource } from '../data-source';
import { AppActivityLog } from '../entity/AppActivityLog';

export class LogService {
  async createLog(log: AppActivityLogType): Promise<void> {
    try {
      console.log('[LogService] Creating log:', { code: log.code, action: log.action });
      
      const logRepo = AppDataSource.getRepository(AppActivityLog);
      const newLog = logRepo.create({
        code: log.code,
        action: log.action,
        payload: JSON.stringify(log.payload)
      });
      await logRepo.save(newLog);
      
      console.log('[LogService] Log created successfully');
    } catch (error) {
      console.error('[LogService] Error creating activity log:', error);
      throw error;
    }
  }

  async getAllLogs(): Promise<AppActivityLogType[]> {
    try {
      const logRepo = AppDataSource.getRepository(AppActivityLog);
      const logs = await logRepo.find({
        order: { created_at: 'DESC' }
      });
      return logs.map(log => ({
        ...log,
        payload: JSON.parse(log.payload)
      }));
    } catch (error) {
      console.error('Error fetching logs:', error);
      throw error;
    }
  }

  async getRecentLogs(limit: number = 100): Promise<AppActivityLogType[]> {
    try {
      const logRepo = AppDataSource.getRepository(AppActivityLog);
      const logs = await logRepo.find({
        order: { created_at: 'DESC' },
        take: limit
      });
      return logs.map(log => ({
        ...log,
        payload: JSON.parse(log.payload)
      }));
    } catch (error) {
      console.error('Error fetching logs:', error);
      throw error;
    }
  }

  async getLogsByClientId(clientId: number): Promise<AppActivityLogType[]> {
    try {
      const logRepo = AppDataSource.getRepository(AppActivityLog);
      const logs = await logRepo.find({
        where: { id: clientId },
        order: { created_at: 'DESC' }
      });
      return logs.map(log => ({
        ...log,
        payload: JSON.parse(log.payload)
      }));
    } catch (error) {
      console.error('Error fetching logs by client:', error);
      throw error;
    }
  }
}
