import dotenv from 'dotenv';

dotenv.config();

export const config = {
  database: {
    server: process.env.DB_SERVER || 'localhost\\SQLEXPRESS',
    database: process.env.DB_DATABASE || 'ts',
    port: parseInt(process.env.DB_PORT || '1433'),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    options: {
      encrypt: true,
      trustServerCertificate: true,
      enableArithAbort: true,
      connectTimeout: 30000,
      requestTimeout: 30000,
      instanceName: 'SQLEXPRESS',
      // Use Windows Authentication if user/password not provided
      ...(!(process.env.DB_USER && process.env.DB_PASSWORD) && {
        trustedConnection: true,
      }),
    },
  },
  postit: {
    apiUrl: process.env.POSTIT_API_URL || 'https://postit.lt/API/v2/',
    apiKey: process.env.POSTIT_API_KEY || '',
  },
  server: {
    port: parseInt(process.env.PORT || '3000'),
  },
};