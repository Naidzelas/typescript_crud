import { LogService } from "../../services/logService";
import { AppDataSource } from "../../data-source";

export class SYST99Contrller {
    async index(req: any, res: any): Promise<void> {
        try {
            res.json({ message: 'SYST99 index route accessed' });
        } catch (error) {
            res.status(500).json({ message: 'Error accessing SYST99 route', error });
        }
    }
}
