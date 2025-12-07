import express, { Request, Response } from 'express';
import postitRouter from './web/api/postit';
import clientRouter from './web/client/client';
import logRouter from './web/app/log';
import updatePostcodesRouter from './web/api/updatePostcodes';

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
    res.send('Welcome to the web route!');
});

router.use(postitRouter);
router.use(clientRouter);
router.use(logRouter);
router.use(updatePostcodesRouter);

export default router;