import express, { Request, Response } from 'express';
import { ClientController } from '../../../controllers/client/ClientController';

const router = express.Router();

const clientController = new ClientController();

router.get('/client', clientController.index);
router.post('/client/store', clientController.store);
router.post('/client/bulk-import', clientController.bulkStore);
router.patch('/client/update', clientController.update);
router.get('/client/get_all', async (req: Request, res: Response) => {
    try {
        const clients = await clientController.getAllClients();
        res.json(clients);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch clients' });
    }
});

export default router;