import express, { Request, Response } from 'express';
import { LogService } from '../../../services/logService';
import { SYST99Contrller } from '../../../controllers/canias/SYST99Controller';

const router = express.Router();

const syst99Controller = new SYST99Contrller();
const logService = new LogService();

router.get('/canias/syst99', async (req: Request, res: Response) => {
    await logService.createLog({
        code: 200,
        action: 'ROUTE_ACCESSED',
        payload: { name: 'System', message: 'GET /canias/syst99 route accessed' }
    });
    return syst99Controller.index(req, res);
});