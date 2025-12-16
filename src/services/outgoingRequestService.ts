import { OutgoingRequest as OutgoingRequestType } from '../types';
import { AppDataSource } from '../data-source';
import { OutgoingRequest } from '../entity/OutgoingRequest';

export class OutgoingRequestService {
  async logRequest(request: OutgoingRequestType): Promise<void> {
    try {
      console.log('[OutgoingRequestService] Logging request:', { 
        endpoint: request.endpoint, 
        method: request.method, 
        code: request.code 
      });
      
      const requestRepo = AppDataSource.getRepository(OutgoingRequest);
      const newRequest = requestRepo.create({
        endpoint: request.endpoint,
        method: request.method,
        payload: JSON.stringify(request.payload),
        code: request.code
      });
      await requestRepo.save(newRequest);
      
      console.log('[OutgoingRequestService] Request logged successfully');
    } catch (error) {
      console.error('[OutgoingRequestService] Error logging outgoing request:', error);
      throw error;
    }
  }

  async getAllRequests(): Promise<OutgoingRequestType[]> {
    try {
      const requestRepo = AppDataSource.getRepository(OutgoingRequest);
      const requests = await requestRepo.find({
        order: { created_at: 'DESC' }
      });
      return requests.map(req => ({
        ...req,
        payload: JSON.parse(req.payload)
      }));
    } catch (error) {
      console.error('Error fetching outgoing requests:', error);
      throw error;
    }
  }
}
