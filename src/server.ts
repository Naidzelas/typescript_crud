import express from 'express';
import cors from 'cors';
import path from 'path';
import { config } from './config';
import webRoutes from './routes/web';
import { AppDataSource } from './data-source';

AppDataSource.initialize()
  .then(() => {
    const app = express();

    // CORS configuration
    app.use(cors({
      origin: '*',
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
    }));
    
    // Serve frontend
    app.get('/', (req, res) => {
      res.sendFile(path.join(__dirname, '../public/index.html'));
    });
    
    // Middleware
    app.use(express.json());
    app.use(express.static(path.join(__dirname, '../public')));

    // API Routes
    app.use('/api', webRoutes);
    
    // Health check
    app.get('/api/health', async (req, res) => {
      try {
        // You can use AppDataSource.manager.query('SELECT 1 AS test') here
        await AppDataSource.manager.query('SELECT 1 AS test');
        res.json({
          status: 'OK',
          db: 'connected',
          server: config.database.server,
          database: config.database.database,
          timestamp: new Date().toISOString()
        });
      } catch (err) {
        const errorMessage = (err instanceof Error) ? err.message : String(err);
        res.status(500).json({
          status: 'ERROR',
          db: 'disconnected',
          error: errorMessage,
          timestamp: new Date().toISOString()
        });
      }
    });

    // Start server
    const PORT = config.server.port;
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
      console.log(`Database: ${config.database.server}\\${config.database.database}`);
    });

    // Handle graceful shutdown
    process.on('SIGINT', async () => {
      console.log('\nShutting down gracefully...');
      await AppDataSource.destroy();
      process.exit(0);
    });
  })
  .catch((error) => {
    console.error('Error during Data Source initialization:', error);
  });