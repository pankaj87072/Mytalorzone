const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./api/auth');
const cartRoutes = require('./api/cart');
const complaintsRoutes = require('./api/complaints');
const dbCheck = require('./middleware/dbCheck');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: 'Ecommerce',
      retryWrites: true,
      w: 'majority',
      ssl: true,
    });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    setTimeout(connectDB, 5000);
  }
};

connectDB();

app.use('/auth', dbCheck, authRoutes);
app.use('/cart', dbCheck, cartRoutes);
app.use('/complaints', dbCheck, complaintsRoutes);

app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ 
    message: err.message || 'Something went wrong!',
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
});

// Export the handler for Vercel to use
module.exports = app;
