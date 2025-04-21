import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB from './config/db.js';

// Get current directory name (ES module equivalent of __dirname)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '.env') });

// Create Express app
const app = express();

// CORS configuration
const corsOptions = {
  origin: process.env.FRONTEND_URL || '*',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 200
};

// Apply CORS middleware before any routes
app.use(cors(corsOptions));

// Other middleware
app.use(express.json());

// Routes - move to root path for serverless functions
app.use('/api/auth', (await import('./routes/auth.js')).default);
app.use('/api/events', (await import('./routes/events.js')).default);

// Add a healthcheck endpoint
app.get('/api/healthcheck', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'API is working' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Connect to MongoDB - only when not in serverless environment
if (process.env.NODE_ENV !== 'production') {
  // Connect to MongoDB
  connectDB();
  
  // Start server
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Frontend URL: ${process.env.FRONTEND_URL}`);
  });
} else {
  // In production/serverless, connect on demand
  connectDB();
}

// Export for serverless use
export default app; 