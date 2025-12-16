import { ClientType } from "../../types";
import { LogService } from "../../services/logService";
import { Client } from "../../entity/Client";
import { AppDataSource } from "../../data-source";

export class ClientController {
    async index(req: any, res: any): Promise<void> {
        try {
            const clientRepo = AppDataSource.getRepository(Client);
            const result = await clientRepo.createQueryBuilder('client').getMany();
            res.json(result);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching clients', error });
        }
    }

    async store(req: any, res: any): Promise<void> {
        const client: ClientType = req.body;
        const logService = new LogService();
        
        try {
            const clientRepo = AppDataSource.getRepository(Client);
            const newClient = clientRepo.create({
                name: client.name,
                address: client.address,
                postcode: client.postcode || ''
            });
            await clientRepo.save(newClient);
            
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
        const client: ClientType = req.body;
        const logService = new LogService();
        
        try {
            const clientRepo = AppDataSource.getRepository(Client);
            const existingClient = await clientRepo.findOneBy({ id: client.id });

            if (!existingClient) {
                res.status(404).json({ message: 'Client not found' });
                return;
            }

            existingClient.name = client.name;
            existingClient.address = client.address;
            existingClient.postcode = client.postcode || '';

            await clientRepo.save(existingClient);
            
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

    async getAllClients(): Promise<ClientType[]> {
        try {
            const clientRepo = AppDataSource.getRepository(Client);
            const clients = await clientRepo.find();
            
            return clients.map(client => ({
                ...client,
                address: client.address ?? ''
            }));
        } catch (error) {
            throw new Error('Error fetching clients: ' + (error instanceof Error ? error.message : String(error)));
        }
    }

    async bulkStore(req: any, res: any): Promise<void> {
        const clients: ClientType[] = req.body.clients;
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
            const clientRepo = AppDataSource.getRepository(Client);

            for (const client of clients) {
                try {
                    // Check if client with same name and address already exists
                    const existingClient = await clientRepo.findOne({
                        where: {
                            name: client.name,
                            address: client.address
                        }
                    });

                    if (existingClient) {
                        skipped++;
                        continue;
                    }

                    // Insert new client
                    const newClient = clientRepo.create({
                        name: client.name,
                        address: client.address,
                        postcode: client.postcode || ''
                    });
                    await clientRepo.save(newClient);
                    
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