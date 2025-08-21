const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// In-memory storage for notes
let notes = [];

// Health API route
app.get('/health', (req, res) => {
    res.json({
        status: "ok",
        version: "v2"
    });
});

// Routes
app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Notes App v2</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    max-width: 800px;
                    margin: 0 auto;
                    padding: 20px;
                    background-color: #f5f5f5;
                }
                .container {
                    background-color: white;
                    padding: 30px;
                    border-radius: 10px;
                    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                }
                h1 {
                    color: #333;
                    text-align: center;
                    margin-bottom: 30px;
                }
                .form-group {
                    margin-bottom: 15px;
                }
                label {
                    display: block;
                    margin-bottom: 5px;
                    font-weight: bold;
                    color: #555;
                }
                input[type="text"], textarea {
                    width: 100%;
                    padding: 10px;
                    border: 1px solid #ddd;
                    border-radius: 5px;
                    font-size: 16px;
                    box-sizing: border-box;
                }
                textarea {
                    height: 100px;
                    resize: vertical;
                }
                button {
                    background-color: #007bff;
                    color: white;
                    padding: 12px 24px;
                    border: none;
                    border-radius: 5px;
                    cursor: pointer;
                    font-size: 16px;
                    margin-right: 10px;
                }
                button:hover {
                    background-color: #0056b3;
                }
                .delete-btn {
                    background-color: #dc3545;
                    margin-left: 10px;
                }
                .delete-btn:hover {
                    background-color: #c82333;
                }
                .nav-links {
                    margin-top: 20px;
                    text-align: center;
                }
                .nav-links a {
                    color: #007bff;
                    text-decoration: none;
                    margin: 0 10px;
                }
                .nav-links a:hover {
                    text-decoration: underline;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>🔥 My Notes App v2 — Now with Delete Feature!</h1>
                
                <form action="/add-note" method="POST">
                    <div class="form-group">
                        <label for="title">Title:</label>
                        <input type="text" id="title" name="title" required>
                    </div>
                    
                    <div class="form-group">
                        <label for="description">Description:</label>
                        <textarea id="description" name="description" required></textarea>
                    </div>
                    
                    <button type="submit">Add Note</button>
                </form>
                
                <div class="nav-links">
                    <a href="/notes">View All Notes</a>
                </div>
            </div>
        </body>
        </html>
    `);
});

app.post('/add-note', (req, res) => {
    const { title, description } = req.body;
    
    if (!title || !description) {
        return res.status(400).send('Title and description are required');
    }
    
    const newNote = {
        id: Date.now(),
        title: title,
        description: description,
        createdAt: new Date().toLocaleString()
    };
    
    notes.push(newNote);
    
    res.redirect('/notes');
});

// Delete note route
app.post('/delete-note/:id', (req, res) => {
    const noteId = parseInt(req.params.id);
    const noteIndex = notes.findIndex(note => note.id === noteId);
    
    if (noteIndex === -1) {
        return res.status(404).send('Note not found');
    }
    
    notes.splice(noteIndex, 1);
    res.redirect('/notes');
});

app.get('/notes', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>All Notes - Notes App v2</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    max-width: 800px;
                    margin: 0 auto;
                    padding: 20px;
                    background-color: #f5f5f5;
                }
                .container {
                    background-color: white;
                    padding: 30px;
                    border-radius: 10px;
                    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                }
                h1 {
                    color: #333;
                    text-align: center;
                    margin-bottom: 30px;
                }
                .note {
                    border: 1px solid #ddd;
                    border-radius: 5px;
                    padding: 20px;
                    margin-bottom: 20px;
                    background-color: #f9f9f9;
                    position: relative;
                }
                .note h3 {
                    margin-top: 0;
                    color: #333;
                    margin-right: 100px;
                }
                .note p {
                    color: #666;
                    line-height: 1.6;
                    margin-right: 100px;
                }
                .note .timestamp {
                    font-size: 12px;
                    color: #999;
                    margin-top: 10px;
                }
                .note-actions {
                    position: absolute;
                    top: 20px;
                    right: 20px;
                }
                .delete-btn {
                    background-color: #dc3545;
                    color: white;
                    padding: 8px 16px;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                    font-size: 14px;
                }
                .delete-btn:hover {
                    background-color: #c82333;
                }
                .nav-links {
                    text-align: center;
                    margin-top: 30px;
                }
                .nav-links a {
                    color: #007bff;
                    text-decoration: none;
                    margin: 0 10px;
                }
                .nav-links a:hover {
                    text-decoration: underline;
                }
                .no-notes {
                    text-align: center;
                    color: #666;
                    font-style: italic;
                    padding: 40px;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>📝 All Notes</h1>
                
                ${notes.length === 0 ? 
                    '<div class="no-notes">No notes yet. <a href="/">Add your first note!</a></div>' : 
                    notes.map(note => `
                        <div class="note">
                            <div class="note-actions">
                                <form action="/delete-note/${note.id}" method="POST" style="display: inline;">
                                    <button type="submit" class="delete-btn" onclick="return confirm('Are you sure you want to delete this note?')">🗑️ Delete</button>
                                </form>
                            </div>
                            <h3>${note.title}</h3>
                            <p>${note.description}</p>
                            <div class="timestamp">Created: ${note.createdAt}</div>
                        </div>
                    `).join('')
                }
                
                <div class="nav-links">
                    <a href="/">← Back to Home</a>
                </div>
            </div>
        </body>
        </html>
    `);
});

// Start server
app.listen(PORT, () => {
    console.log(`🔥 Notes App v2 is running on http://localhost:${PORT}`);
});
