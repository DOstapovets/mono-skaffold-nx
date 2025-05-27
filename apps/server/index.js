// Server entry point with Express
const express = require('express');
const cors = require('cors');
const apiRoutes = require('./routes/api');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Simple logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Default routes
app.get('/', (req, res) => {
  res.json({ 
    message: 'Welcome to the TODO API Server', 
    version: '1.0.0',
    documentation: '/api-docs',
    healthCheck: '/health'
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: process.memoryUsage()
  });
});

// Mount API routes
app.use('/api', apiRoutes);

// Error handling middleware
app.use((req, res, next) => {
  res.status(404).json({ 
    error: 'Not Found',
    message: `The requested resource '${req.originalUrl}' was not found on this server`
  });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'production' ? 'Something went wrong' : err.message
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
  console.log(`API available at http://localhost:${PORT}/api`);
  console.log(`Health check at http://localhost:${PORT}/health`);
});
