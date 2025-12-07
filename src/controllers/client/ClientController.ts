import { Client } from "../../types";
import sql from 'mssql';
import { getConnection } from "../../database";
import { LogService } from "../../services/logService";

export class ClientController {


    async index(req: any, res: any): Promise<void> {
        try {
            const pool = await getConnection();
            const result = await pool.request().query('SELECT * FROM clients');
            res.json(result.recordset);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching clients', error });
        }
    }

    async store(req: any, res: any): Promise<void> {
        const client: Client = req.body;
        const logService = new LogService();
        
        try {
            const pool = await getConnection();
            await pool.request()
                .input('name', sql.NVarChar(255), client.name)
                .input('address', sql.NVarChar(500), client.address)
                .input('postcode', sql.NVarChar(20), client.postcode || '')
                .query('INSERT INTO clients (name, address, postcode) VALUES (@name, @address, @postcode)');
            
            await logService.createLog({
                code: 201,
                action: 'CLIENT_CREATED',
                payload: {
                    name: client.name,
                    message: `Client created: ${client.name} at ${client.address}`
                }
            });
            
            res.status(201).json({ message: 'Client created successfully' });
        } catch (error) {
            await logService.createLog({
                code: 500,
                action: 'CLIENT_CREATE_ERROR',
                payload: {
                    name: client.name || 'Unknown',
                    message: `Failed to create client: ${error instanceof Error ? error.message : String(error)}`
                }
            });
            res.status(500).json({ message: 'Error creating client', error });
        }
    }

    async update(req: any, res: any): Promise<void> {
        const client: Client = req.body;
        const logService = new LogService();
        
        try {
            const pool = await getConnection();
            await pool.request()
                .input('id', sql.Int, client.id)
                .input('name', sql.NVarChar(255), client.name)
                .input('address', sql.NVarChar(500), client.address)
                .input('postcode', sql.NVarChar(20), client.postcode || '')
                .query('UPDATE clients SET name = @name, address = @address, postcode = @postcode WHERE id = @id');
            
            await logService.createLog({
                code: 200,
                action: 'CLIENT_UPDATED',
                payload: {
                    name: client.name,
                    message: `Client updated: ${client.name} (ID: ${client.id})`
                }
            });
            
            res.json({ message: 'Client updated successfully' });
        } catch (error) {
            await logService.createLog({
                code: 500,
                action: 'CLIENT_UPDATE_ERROR',
                payload: {
                    name: client.name || 'Unknown',
                    message: `Failed to update client: ${error instanceof Error ? error.message : String(error)}`
                }
            });
            res.status(500).json({ message: 'Error updating client', error });
        }
    }

    async getAllClients(): Promise<Client[]> {
        try {
            const pool = await getConnection();
            const result = await pool.request().query('SELECT * FROM clients');
            return result.recordset;
        } catch (error) {
            throw new Error('Error fetching clients: ' + (error instanceof Error ? error.message : String(error)));
        }
    }

    async bulkStore(req: any, res: any): Promise<void> {
        const clients: Client[] = req.body.clients;
        const logService = new LogService();
        
        if (!Array.isArray(clients)) {
            await logService.createLog({
                code: 400,
                action: 'BULK_IMPORT_ERROR',
                payload: { name: 'System', message: 'Invalid data format for bulk import' }
            });
            res.status(400).json({ message: 'Invalid data format. Expected an array of clients.' });
            return;
        }

        let inserted = 0;
        let skipped = 0;
        const errors: string[] = [];

        try {
            const pool = await getConnection();

            for (const client of clients) {
                try {
                    // Check if client with same name and address already exists
                    const checkResult = await pool.request()
                        .input('name', sql.NVarChar(255), client.name)
                        .input('address', sql.NVarChar(500), client.address)
                        .query('SELECT id FROM clients WHERE name = @name AND address = @address');

                    if (checkResult.recordset.length > 0) {
                        skipped++;
                        continue;
                    }

                    // Insert new client
                    await pool.request()
                        .input('name', sql.NVarChar(255), client.name)
                        .input('address', sql.NVarChar(500), client.address)
                        .input('postcode', sql.NVarChar(20), client.postcode || '')
                        .query('INSERT INTO clients (name, address, postcode) VALUES (@name, @address, @postcode)');
                    
                    inserted++;
                } catch (error) {
                    errors.push(`Failed to insert ${client.name}: ${error instanceof Error ? error.message : String(error)}`);
                }
            }

            await logService.createLog({
                code: 201,
                action: 'BULK_IMPORT_COMPLETED',
                payload: {
                    name: 'System',
                    message: `Bulk import completed. Inserted: ${inserted}, Skipped: ${skipped}, Errors: ${errors.length}`
                }
            });

            res.status(201).json({ 
                message: 'Bulk import completed',
                inserted,
                skipped,
                errors: errors.length > 0 ? errors : undefined
            });
        } catch (error) {
            await logService.createLog({
                code: 500,
                action: 'BULK_IMPORT_ERROR',
                payload: {
                    name: 'System',
                    message: `Bulk import failed: ${error instanceof Error ? error.message : String(error)}`
                }
            });
            res.status(500).json({ message: 'Error during bulk import', error });
        }
    }
}