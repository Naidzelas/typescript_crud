import { Client } from "../../types";
import sql from 'mssql';
import { getConnection } from "../../database";

export class ClientController {


    async index(req: any, res: any): Promise<void> {
        try {
            const pool = await getConnection();
            const result = await pool.request().query('SELECT * FROM Clients');
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
                .input('name', sql.NVarChar(100), client.name)
                .query('INSERT INTO Clients (name, email, phone) VALUES (@name, @email, @phone)');
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
                .input('name', sql.NVarChar(100), client.name)
                .query('UPDATE Clients SET name = @name, email = @email, phone = @phone WHERE id = @id');
            res.json({ message: 'Client updated successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Error updating client', error });
        }
    }
}