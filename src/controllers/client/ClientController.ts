import { Client } from "../../types";
import sql from 'mssql';
import { getConnection } from "../../database";

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
        try {
            const pool = await getConnection();
            await pool.request()
                .input('name', sql.NVarChar(255), client.name)
                .input('address', sql.NVarChar(500), client.address)
                .input('postcode', sql.NVarChar(20), client.postcode || '')
                .query('INSERT INTO clients (name, address, postcode) VALUES (@name, @address, @postcode)');
            res.status(201).json({ message: 'Client created successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Error creating client', error });
        }
    }

    async update(req: any, res: any): Promise<void> {
        const client: Client = req.body;
        try {
            const pool = await getConnection();
            await pool.request()
                .input('id', sql.Int, client.id)
                .input('name', sql.NVarChar(255), client.name)
                .input('address', sql.NVarChar(500), client.address)
                .input('postcode', sql.NVarChar(20), client.postcode || '')
                .query('UPDATE clients SET name = @name, address = @address, postcode = @postcode WHERE id = @id');
            res.json({ message: 'Client updated successfully' });
        } catch (error) {
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
        
        if (!Array.isArray(clients)) {
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

            res.status(201).json({ 
                message: 'Bulk import completed',
                inserted,
                skipped,
                errors: errors.length > 0 ? errors : undefined
            });
        } catch (error) {
            res.status(500).json({ message: 'Error during bulk import', error });
        }
    }
}