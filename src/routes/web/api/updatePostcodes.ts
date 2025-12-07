import express, { Request, Response } from 'express';
import axios from 'axios';
import { config } from '../../../config';
import { getConnection } from '../../../database';
import sql from 'mssql';

const router = express.Router();

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

router.post('/update-postcodes', async (req: Request, res: Response) => {
  try {
    const pool = await getConnection();
    
    // Get all clients without postcodes or with empty postcodes
    const clientsResult = await pool.request()
      .query(`SELECT id, name, address, postcode FROM clients WHERE postcode IS NULL OR postcode = ''`);
    
    const clients = clientsResult.recordset;
    
    if (clients.length === 0) {
      return res.json({
        success: true,
        message: 'All clients already have postcodes',
        updated: 0,
        failed: 0,
        errors: []
      });
    }

    let updated = 0;
    let failed = 0;
    const errors: string[] = [];

    for (const client of clients) {
      try {
        // Call Postit API to get postcode
        const postitResponse = await axios.get<PostitApiResponse>(
          'https://api.postit.lt/v2/',
          {
            params: {
              address: client.address,
              key: config.postit.apiKey
            },
            timeout: 10000
          }
        );

        if (postitResponse.data.success && postitResponse.data.data && postitResponse.data.data.length > 0) {
          const postcode = postitResponse.data.data[0].post_code;
          
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

    res.json({
      success: true,
      message: `Postcode update completed. Updated: ${updated}, Failed: ${failed}`,
      updated,
      failed,
      total: clients.length,
      errors: errors.length > 0 ? errors : undefined
    });
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : String(error);
    res.status(500).json({
      success: false,
      message: 'Failed to update postcodes',
      error: errorMsg
    });
  }
});

export default router;
