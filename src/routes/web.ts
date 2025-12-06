import express, { Request, Response } from 'express';
import postitRouter from './web/api/postit';
import clientRouter from './web/client/client';
import logRouter from './web/app/log';

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
    res.send('Welcome to the web route!');
});

router.use(postitRouter);
router.use(clientRouter);
router.use(logRouter);

export default router;