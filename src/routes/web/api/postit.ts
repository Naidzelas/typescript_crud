import express, { Request, Response } from 'express';

const router = express.Router();

router.get('/api/address', (req: Request, res: Response) => {
    res.json({ address: '123 Main St, Anytown, USA' });
});

export default router;