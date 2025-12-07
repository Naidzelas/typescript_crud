import express, { Request, Response } from 'express';
import { ClientController } from '../../../controllers/client/ClientController';
import { LogService } from '../../../services/logService';

const router = express.Router();

const clientController = new ClientController();
const logService = new LogService();

router.get('/client', async (req: Request, res: Response) => {
    await logService.createLog({
        code: 200,
        action: 'ROUTE_ACCESSED',
        payload: { name: 'System', message: 'GET /client route accessed' }
    });
    return clientController.index(req, res);
});

router.post('/client/store', async (req: Request, res: Response) => {
    await logService.createLog({
        code: 200,
        action: 'ROUTE_ACCESSED',
        payload: { name: 'System', message: 'POST /client/store route accessed' }
    });
    return clientController.store(req, res);
});

router.post('/client/bulk-import', async (req: Request, res: Response) => {
    await logService.createLog({
        code: 200,
        action: 'FILE_UPLOAD_STARTED',
        payload: { name: 'System', message: `Bulk import started with ${req.body.clients?.length || 0} clients` }
    });
    return clientController.bulkStore(req, res);
});

router.patch('/client/update', async (req: Request, res: Response) => {
    await logService.createLog({
        code: 200,
        action: 'ROUTE_ACCESSED',
        payload: { name: 'System', message: 'PATCH /client/update route accessed' }
    });
    return clientController.update(req, res);
});

router.get('/client/get_all', async (req: Request, res: Response) => {
    await logService.createLog({
        code: 200,
        action: 'ROUTE_ACCESSED',
        payload: { name: 'System', message: 'GET /client/get_all route accessed' }
    });
    try {
        const clients = await clientController.getAllClients();
        res.json(clients);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch clients' });
    }
});

export default router;