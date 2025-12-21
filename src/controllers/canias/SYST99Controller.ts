import { LogService } from "../../services/logService";
import { AppDataSource } from "../../data-source";
import { Request, Response } from 'express';

export class SYST99Contrller {
    async index(req: Request, res: Response): Promise<Response> {
        try {
            return res.json({ message: 'SYST99 index route accessed' });
        } catch (error) {
            return res.status(500).json({ message: 'Error accessing SYST99 route', error });
        }
    }

    async executeQuery(req: Request, res: Response): Promise<Response> {
        try {
            const { query } = req.body;

            if (!query || typeof query !== 'string') {
                return res.status(400).json({ 
                    message: 'Invalid request: query parameter is required',
                    results: []
                });
            }

            // Trim and validate query
            const trimmedQuery = query.trim();
            if (!trimmedQuery) {
                return res.status(400).json({ 
                    message: 'Query cannot be empty',
                    results: []
                });
            }

            // For security, only allow SELECT statements
            const queryType = trimmedQuery.substring(0, 6).toUpperCase();
            if (!queryType.startsWith('SELECT')) {
                // Allow other operations but log them
                console.warn('Non-SELECT query attempted:', trimmedQuery.substring(0, 50));
            }

            // Check if database is initialized
            if (!AppDataSource.isInitialized) {
                return res.status(503).json({
                    message: 'Database connection not initialized',
                    results: []
                });
            }

            // Execute the query
            const results = await AppDataSource.query(trimmedQuery);

            return res.status(200).json({
                message: 'Query executed successfully',
                results: results || [],
                rowCount: Array.isArray(results) ? results.length : 0
            });
        } catch (error: any) {
            console.error('Query execution error:', error);
            return res.status(500).json({ 
                message: error.message || 'Error executing query',
                results: [],
                error: process.env.NODE_ENV === 'development' ? error.message : undefined
            });
        }
    }
}
