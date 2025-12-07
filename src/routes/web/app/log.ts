import express, { Request, Response } from 'express';
import { LogService } from '../../../services/logService';
import { OutgoingRequestService } from '../../../services/outgoingRequestService';

const router = express.Router();

/**
 * Get all activity logs
 */
router.get('/logs/activity', async (req: Request, res: Response) => {
  try {
    const logService = new LogService();
    const logs = await logService.getAllLogs();
    res.json(logs);
  } catch (error) {
    console.error('Error in /logs/activity:', error);
    const errorMsg = error instanceof Error ? error.message : String(error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch activity logs',
      error: errorMsg
    });
  }
});

/**
 * Get all outgoing requests
 */
router.get('/logs/outgoing-requests', async (req: Request, res: Response) => {
  try {
    const outgoingRequestService = new OutgoingRequestService();
    const requests = await outgoingRequestService.getAllRequests();
    res.json(requests);
  } catch (error) {
    console.error('Error in /logs/outgoing-requests:', error);
    const errorMsg = error instanceof Error ? error.message : String(error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch outgoing requests',
      error: errorMsg
    });
  }
});

export default router;