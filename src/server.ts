import express from 'express';
import cors from 'cors';
import path from 'path';
import clientsRouter from './routes/clients';
import postcodeRouter from './routes/postcode';
import logsRouter from './routes/logs';
import { config } from './config';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// API Routes
app.use('/api/clients', clientsRouter);
app.use('/api/postcode', postcodeRouter);
app.use('/api/logs', logsRouter);

// Serve frontend
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Start server
const PORT = config.server.port;
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`Database: ${config.database.server}/${config.database.database}`);
});

// Handle graceful shutdown
process.on('SIGINT', async () => {
  console.log('\nShutting down gracefully...');
  process.exit(0);
});
