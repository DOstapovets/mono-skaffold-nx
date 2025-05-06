const express = require('express');
const todosRoutes = require('./todos');

const router = express.Router();

// Mount todos routes
router.use('/todos', todosRoutes);

// Sample data endpoint
router.get('/data', (req, res) => {
  res.json({
    message: 'TODO API',
    timestamp: new Date().toISOString(),
    appInfo: {
      name: 'Simple TODO List App',
      version: '1.0.0'
    }
  });
});

module.exports = router;