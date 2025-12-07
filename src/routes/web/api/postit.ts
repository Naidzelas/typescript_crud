import express, { Request, Response } from 'express';
import { PostitService } from '../../../services/postitService';

const router = express.Router();
const postitService = new PostitService();

/**
 * Health check endpoint to verify Postit API connectivity
 */
router.get('/postit/health', async (req: Request, res: Response) => {
  try {
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
  try {
    const result = await postitService.updateAllPostCodes();
    res.json(result);
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : String(error);
    res.status(500).json({
      success: false,
      message: 'Failed to update postcodes',
      error: errorMsg
    });
  }
});

export default router;