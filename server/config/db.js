import mongoose from 'mongoose';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

// Get current directory name (ES module equivalent of __dirname)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env') });

// Cached connection for serverless environment
let cachedConnection = null;

const connectDB = async () => {
  // If connection exists, reuse it
  if (cachedConnection) {
    console.log('Using existing MongoDB connection');
    return cachedConnection;
  }

  try {
    // Debug logs
    console.log('Environment variables:', process.env.MONGO_URI ? 'MONGO_URI exists' : 'MONGO_URI missing');
    
    // Try to use env var, otherwise use hardcoded connection string as fallback
    const mongoURI = process.env.MONGO_URI || 
                     'mongodb+srv://vabblack:vaibhav23@campus-gathering.zg7neut.mongodb.net/?retryWrites=true&w=majority&appName=Campus-gathering';
    
    console.log('Connecting to MongoDB...');
    
    const conn = await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000, // Timeout after 5s
      connectTimeoutMS: 10000, // Give up initial connection after 10s
    });
    
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    cachedConnection = conn;
    return conn;
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    // Don't exit in serverless environment
    if (process.env.NODE_ENV !== 'production') {
      process.exit(1);
    }
    throw error;
  }
};

export default connectDB; 