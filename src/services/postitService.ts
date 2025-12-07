import axios from 'axios';
import { config } from '../config';
import { getConnection } from '../database';
import sql from 'mssql';
import { OutgoingRequestService } from './outgoingRequestService';

interface PostitApiResponse {
  status: string;
  success: boolean;
  message: string;
  message_code: number;
  total: number;
  data: Array<{
    post_code: string;
    address: string;
    street: string;
    number: string;
    city: string;
    municipality: string;
  }>;
}

interface UpdateResult {
  success: boolean;
  message: string;
  updated: number;
  failed: number;
  total: number;
  errors?: string[];
}

export class PostitService {
  /**
   * Check if the Postit API is accessible and responding
   */
  async healthCheck(): Promise<{ success: boolean; message: string }> {
    try {
      const response = await axios.get<PostitApiResponse>(
        'https://api.postit.lt/v2/',
        {
          params: {
            city: 'Vilnius',
            key: config.postit.apiKey
          },
          timeout: 5000
        }
      );

      if (response.data.success) {
        return { 
          success: true, 
          message: 'Postit API is accessible and responding correctly' 
        };
      } else {
        return { 
          success: false, 
          message: `API responded but returned error: ${response.data.message}` 
        };
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return { 
          success: false, 
          message: `Cannot connect to Postit API: ${error.message}` 
        };
      }
      return { 
        success: false, 
        message: `Unknown error: ${error instanceof Error ? error.message : String(error)}` 
      };
    }
  }

  /**
   * Update postcodes for all clients without postcodes
   */
  async updateAllPostCodes(): Promise<UpdateResult> {
    try {
      const pool = await getConnection();
      
      // Get all clients without postcodes or with empty postcodes
      const clientsResult = await pool.request()
        .query(`SELECT id, name, address, postcode FROM clients WHERE postcode IS NULL OR postcode = ''`);
      
      const clients = clientsResult.recordset;
      
      if (clients.length === 0) {
        return {
          success: true,
          message: 'All clients already have postcodes',
          updated: 0,
          failed: 0,
          total: 0,
          errors: []
        };
      }

      let updated = 0;
      let failed = 0;
      const errors: string[] = [];

      for (const client of clients) {
        try {
          const postcode = await this.getPostCodeByAddress(client.address);
          
          if (postcode) {
            // Update client with the postcode
            await pool.request()
              .input('id', sql.Int, client.id)
              .input('postcode', sql.NVarChar(20), postcode)
              .query('UPDATE clients SET postcode = @postcode WHERE id = @id');
            
            updated++;
          } else {
            failed++;
            errors.push(`Client ${client.name}: No postcode found for address "${client.address}"`);
          }
        } catch (error) {
          failed++;
          const errorMsg = error instanceof Error ? error.message : String(error);
          errors.push(`Client ${client.name}: ${errorMsg}`);
        }

        // Add small delay to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 100));
      }

      return {
        success: true,
        message: `Postcode update completed. Updated: ${updated}, Failed: ${failed}`,
        updated,
        failed,
        total: clients.length,
        errors: errors.length > 0 ? errors : undefined
      };
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : String(error);
      return {
        success: false,
        message: 'Failed to update postcodes',
        updated: 0,
        failed: 0,
        total: 0,
        errors: [errorMsg]
      };
    }
  }

  /**
   * Get postcode by full address using Postit v2 API
   */
  async getPostCodeByAddress(address: string): Promise<string | null> {
    const outgoingRequestService = new OutgoingRequestService();
    
    try {
      // Parse address to separate street and city
      // Format: "Street address, City" or just "Street address"
      const addressParts = address.split(',').map((part: string) => part.trim());
      const streetAddress = addressParts[0];
      const city = addressParts.length > 1 ? addressParts[addressParts.length - 1] : undefined;
      
      let postitResponse: any = null;
      
      // Try with separate city and address parameters if city is available
      if (city) {
        try {
          const endpoint = 'https://api.postit.lt/v2/';
          const params = { address: streetAddress, city: city, key: config.postit.apiKey };
          
          postitResponse = await axios.get<PostitApiResponse>(endpoint, { params, timeout: 10000 });
          
          // Log the request
          await outgoingRequestService.logRequest({
            endpoint,
            method: 'GET',
            payload: params,
            code: postitResponse.status
          });
        } catch (err) {
          // If separated query fails, try with full address
          postitResponse = null;
        }
      }
      
      // If no result yet, try with full address as fallback
      if (!postitResponse || !postitResponse.data.success || !postitResponse.data.data || postitResponse.data.data.length === 0) {
        const endpoint = 'https://api.postit.lt/v2/';
        const params = { address: address, key: config.postit.apiKey };
        
        postitResponse = await axios.get<PostitApiResponse>(endpoint, { params, timeout: 10000 });
        
        // Log the request
        await outgoingRequestService.logRequest({
          endpoint,
          method: 'GET',
          payload: params,
          code: postitResponse.status
        });
      }

      if (postitResponse.data.success && postitResponse.data.data && postitResponse.data.data.length > 0) {
        return postitResponse.data.data[0].post_code;
      }

      return null;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Log failed request
        await outgoingRequestService.logRequest({
          endpoint: 'https://api.postit.lt/v2/',
          method: 'GET',
          payload: { address },
          code: error.response?.status || 500
        });
        throw new Error(`Postit API error: ${error.response?.data?.message || error.message}`);
      }
      throw error;
    }
  }
}
