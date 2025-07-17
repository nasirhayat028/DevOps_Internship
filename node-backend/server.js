const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 3005;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// In-memory storage for todos
let todos = [
    {
        id: '1',
        text: 'Welcome to your Todo App! 🎉',
        completed: false,
        createdAt: new Date().toISOString(),
        priority: 'medium'
    },
    {
        id: '2',
        text: 'Click the + button to add new tasks',
        completed: false,
        createdAt: new Date().toISOString(),
        priority: 'low'
    },
    {
        id: '3',
        text: 'Mark tasks as complete by clicking the checkbox',
        completed: true,
        createdAt: new Date().toISOString(),
        priority: 'high'
    }
];

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// API Routes
app.get('/api/todos', (req, res) => {
    res.json(todos);
});

app.post('/api/todos', (req, res) => {
    const { text, priority = 'medium' } = req.body;
    
    if (!text || text.trim() === '') {
        return res.status(400).json({ error: 'Todo text is required' });
    }

    const newTodo = {
        id: uuidv4(),
        text: text.trim(),
        completed: false,
        createdAt: new Date().toISOString(),
        priority
    };

    todos.unshift(newTodo);
    res.status(201).json(newTodo);
});

app.put('/api/todos/:id', (req, res) => {
    const { id } = req.params;
    const { text, completed, priority } = req.body;

    const todoIndex = todos.findIndex(todo => todo.id === id);
    
    if (todoIndex === -1) {
        return res.status(404).json({ error: 'Todo not found' });
    }

    if (text !== undefined) todos[todoIndex].text = text;
    if (completed !== undefined) todos[todoIndex].completed = completed;
    if (priority !== undefined) todos[todoIndex].priority = priority;

    res.json(todos[todoIndex]);
});

app.delete('/api/todos/:id', (req, res) => {
    const { id } = req.params;
    const todoIndex = todos.findIndex(todo => todo.id === id);
    
    if (todoIndex === -1) {
        return res.status(404).json({ error: 'Todo not found' });
    }

    const deletedTodo = todos.splice(todoIndex, 1)[0];
    res.json(deletedTodo);
});

app.delete('/api/todos', (req, res) => {
    todos = todos.filter(todo => !todo.completed);
    res.json({ message: 'Completed todos deleted' });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Todo App running on http://localhost:${PORT}`);
    console.log(`✨ Beautiful UI ready to use!`);
}); 



