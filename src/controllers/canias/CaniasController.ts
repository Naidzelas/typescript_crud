import { Request, Response } from 'express';

export class CaniasController {
    async index(_req: Request, res: Response): Promise<Response> {
        try {
            return res.json({ message: 'Canias index route accessed' });
        } catch (error) {
            return res.status(500).json({ message: 'Error accessing Canias route', error });
        }
    }
}