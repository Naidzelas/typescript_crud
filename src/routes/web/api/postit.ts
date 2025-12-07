import express, { Request, Response } from 'express';
import { PostitService } from '../../../services/postitService';

const router = express.Router();

/**
 * Health check endpoint to verify Postit API connectivity
 */
router.get('/postit/health', async (req: Request, res: Response) => {
  try {
    const postitService = new PostitService();
    const result = await postitService.healthCheck();
    res.status(result.success ? 200 : 503).json(result);
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : String(error);
    res.status(500).json({
      success: false,
      message: 'Health check failed',
      error: errorMsg
    });
  }
});

/**
 * Update postcodes for all clients without postcodes
 */
router.post('/update-postcodes', async (req: Request, res: Response) => {
  const { LogService } = await import('../../../services/logService');
  const logService = new LogService();
  
  await logService.createLog({
    code: 200,
    action: 'UPDATE_POSTCODES_STARTED',
    payload: { name: 'System', message: 'Update postcodes process initiated' }
  });
  
  try {
    const postitService = new PostitService();
    const result = await postitService.updateAllPostCodes();
    
    await logService.createLog({
      code: 200,
      action: 'UPDATE_POSTCODES_COMPLETED',
      payload: {
        name: 'System',
        message: `Update postcodes completed. Updated: ${result.updated}, Failed: ${result.failed}`
      }
    });
    
    res.json(result);
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : String(error);
    
    await logService.createLog({
      code: 500,
      action: 'UPDATE_POSTCODES_ERROR',
      payload: { name: 'System', message: `Update postcodes failed: ${errorMsg}` }
    });
    
    res.status(500).json({
      success: false,
      message: 'Failed to update postcodes',
      error: errorMsg
    });
  }
});

export default router;