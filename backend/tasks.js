const express = require('express');
const router = express.Router();

let tasks = [
  { id: 1, title: 'Learn React', description: 'Study React hooks' },
  { id: 2, title: 'Build API', description: 'Create Node.js backend' }
];
let nextId = 3;

// GET all tasks
router.get('/', (req, res) => {
  res.json(tasks);
});

// POST new task
router.post('/', (req, res) => {
  const newTask = {
    id: nextId++,
    title: req.body.title,
    description: req.body.description
  };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// PUT update task
router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const taskIndex = tasks.findIndex(t => t.id === id);
  
  if (taskIndex === -1) return res.status(404).send('Task not found');
  
  tasks[taskIndex] = { 
    ...tasks[taskIndex], 
    ...req.body 
  };
  
  res.json(tasks[taskIndex]);
});

// DELETE task
router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  tasks = tasks.filter(t => t.id !== id);
  res.status(204).end();
});

module.exports = router;