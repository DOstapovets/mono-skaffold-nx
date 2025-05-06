const express = require('express');
const router = express.Router();

const users = [
  { id: 1, name: 'User 1', email: 'user1@example.com' },
  { id: 2, name: 'User 2', email: 'user2@example.com' },
  { id: 3, name: 'User 3', email: 'user3@example.com' },
];

// Get all users
router.get('/', (req, res) => {
  res.json(users);
});

// Get user by ID
router.get('/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  if (userId <= 0 || isNaN(userId)) {
    return res.status(400).json({ error: 'Invalid user ID' });
  }
  const user = users.find(el => el.id == userId);
  // In a real app, this would fetch from a database
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  
  res.json(user);
});

// Create a new user
router.post('/', (req, res) => {
  const { name, email } = req.body;
  
  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' });
  }

  const user = {
    id: users.length + 1,
    name,
    email
  };

  users.push(user);
  
  // In a real app, this would save to a database
  res.status(201).json({ ...user, message: 'User created successfully' });
});

// Update a user
router.put('/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const { name, email } = req.body;
  
  if (userId <= 0 || isNaN(userId)) {
    return res.status(400).json({ error: 'Invalid user ID' });
  }
  
  if (!name && !email) {
    return res.status(400).json({ error: 'At least one field (name or email) is required' });
  }

  const user = users.find(el => el.id === userId);

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  if (name) {
    user.name = name;
  }

  if (email) {
    user.email = email;
  }
  
  res.json(user);
});

// Delete a user
router.delete('/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  
  if (userId <= 0 || isNaN(userId)) {
    return res.status(400).json({ error: 'Invalid user ID' });
  }
  
  const userIndex = users.findIndex(user => user.id === userId);
  if (userIndex === -1) {
    return res.status(404).json({ error: 'User not found' });
  }
  users.splice(userIndex, 1);

  // In a real app, this would delete from a database
  res.json({ message: `User ${userId} deleted successfully` });
});

module.exports = router;