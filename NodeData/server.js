const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3005;

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

const DATA_FILE = path.join(__dirname, 'data', 'todos.json');

// Ensure todos file exists
if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, '[]');
}

// Helper to read/write todos
const readTodos = () => JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
const writeTodos = (todos) => fs.writeFileSync(DATA_FILE, JSON.stringify(todos, null, 2));

// Get todos
app.get('/api/todos', (req, res) => {
    const todos = readTodos();
    res.json(todos);
});

// Add a todo
app.post('/api/todos', (req, res) => {
    const todos = readTodos();
    const newTodo = {
        id: Date.now(),
        text: req.body.text,
        completed: false,
        priority: req.body.priority || 'medium'
    };
    todos.push(newTodo);
    writeTodos(todos);
    res.status(201).json(newTodo);
});

// Server Start
app.listen(PORT, () => {
    console.log(`✅ Server running at http://localhost:${PORT}`);
});
