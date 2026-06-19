const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
// app.use('/api/users', require('./routes/userRoutes'));
// app.use('/api/gigs', require('./routes/gigRoutes'));

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to skill2Earn API' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

module.exports = app;
