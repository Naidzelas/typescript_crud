import express from 'express';
import cors from 'cors';
import path from 'path';
import { config } from './config';
import webRoutes from './routes/web';
import { getConnection } from './database';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// API Routes
app.use('/api', webRoutes);

// Serve frontend
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});
app.use(cors({
  origin: '*', // Or specify your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Health check
app.get('/api/health', async (req, res) => {
  try {
    const pool = await getConnection();
    // Test the connection by running a simple query
    await pool.request().query('SELECT 1 AS test');
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
  // eslint-disable-next-line no-console
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`Database: ${config.database.server}\\${config.database.database}`);
});

// Handle graceful shutdown
process.on('SIGINT', async () => {
  console.log('\nShutting down gracefully...');
  process.exit(0);
});
