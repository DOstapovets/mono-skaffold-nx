const express = require('express');
const router = express.Router();

// In-memory todos storage
let todos = [
  { id: 1, title: 'Learn React', completed: true },
  { id: 2, title: 'Build a TODO app', completed: false },
  { id: 3, title: 'Deploy the app', completed: false },
];

// Get all todos
router.get('/', (req, res) => {
  res.json(todos);
});

// Get todo by ID
router.get('/:id', (req, res) => {
  const todoId = parseInt(req.params.id);
  if (todoId <= 0 || isNaN(todoId)) {
    return res.status(400).json({ error: 'Invalid todo ID' });
  }
  
  const todo = todos.find(el => el.id === todoId);
  if (!todo) {
    return res.status(404).json({ error: 'Todo not found' });
  }
  
  res.json(todo);
});

// Create a new todo
router.post('/', (req, res) => {
  const { title } = req.body;
  
  if (!title) {
    return res.status(400).json({ error: 'Title is required' });
  }

  const newId = todos.length > 0 ? Math.max(...todos.map(t => t.id)) + 1 : 1;
  const todo = {
    id: newId,
    title,
    completed: false
  };

  todos.push(todo);
  res.status(201).json(todo);
});

// Update a todo
router.put('/:id', (req, res) => {
  const todoId = parseInt(req.params.id);
  const { title, completed } = req.body;
  
  if (todoId <= 0 || isNaN(todoId)) {
    return res.status(400).json({ error: 'Invalid todo ID' });
  }
  
  if (title === undefined && completed === undefined) {
    return res.status(400).json({ error: 'At least one field (title or completed) is required' });
  }

  const todo = todos.find(el => el.id === todoId);

  if (!todo) {
    return res.status(404).json({ error: 'Todo not found' });
  }

  if (title !== undefined) {
    todo.title = title;
  }

  if (completed !== undefined) {
    todo.completed = completed;
  }
  
  res.json(todo);
});

// Toggle todo completion status
router.patch('/:id/toggle', (req, res) => {
  const todoId = parseInt(req.params.id);
  
  if (todoId <= 0 || isNaN(todoId)) {
    return res.status(400).json({ error: 'Invalid todo ID' });
  }

  const todo = todos.find(el => el.id === todoId);

  if (!todo) {
    return res.status(404).json({ error: 'Todo not found' });
  }

  todo.completed = !todo.completed;
  res.json(todo);
});

// Delete a todo
router.delete('/:id', (req, res) => {
  const todoId = parseInt(req.params.id);
  
  if (todoId <= 0 || isNaN(todoId)) {
    return res.status(400).json({ error: 'Invalid todo ID' });
  }
  
  const todoIndex = todos.findIndex(todo => todo.id === todoId);
  if (todoIndex === -1) {
    return res.status(404).json({ error: 'Todo not found' });
  }
  
  todos.splice(todoIndex, 1);
  res.json({ message: `Todo ${todoId} deleted successfully` });
});

module.exports = router;