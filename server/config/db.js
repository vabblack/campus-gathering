const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

// Promise-based connection
console.log("Connecting to MongoDB...");
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Original async/await connection function (kept for reference)
const connectDB = async () => {
  try {
    // Debug logs
    console.log('Current directory:', __dirname);
    console.log('Environment variables:', process.env.MONGO_URI ? 'MONGO_URI exists' : 'MONGO_URI missing');
    
    // Try to use env var, otherwise use hardcoded connection string as fallback
    const mongoURI = process.env.MONGO_URI || 
                     'mongodb+srv://vabblack:vaibhav23@campus-gathering.zg7neut.mongodb.net/?retryWrites=true&w=majority&appName=Campus-gathering';
    
    console.log('Connecting to MongoDB...');
    
    const conn = await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB; 