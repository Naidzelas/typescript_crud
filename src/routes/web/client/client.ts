import express, { Request, Response } from 'express';
import { ClientController } from '../../../controllers/client/ClientController';

const router = express.Router();

const clientController = new ClientController();

router.get('/client', clientController.index);
router.post('/client/store', clientController.store);
router.patch('/client/update', clientController.update);

export default router;