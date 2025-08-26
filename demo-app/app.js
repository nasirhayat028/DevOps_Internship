require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/demo-app';

mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// User Schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

// Serve static assets
app.use(express.static(path.join(__dirname, 'public')));

// Middleware to parse JSON bodies
app.use(express.json());

// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// GET endpoint to list all users
app.get('/users', async (req, res) => {
    try {
        const users = await User.find().sort({ createdAt: -1 });
        res.json({
            success: true,
            message: 'Users retrieved successfully',
            data: users
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error retrieving users',
            error: error.message
        });
    }
});

// POST endpoint to add a new user
app.post('/users', async (req, res) => {
    try {
        const { name, phone } = req.body;

        // Validate required fields
        if (!name || !phone) {
            return res.status(400).json({
                success: false,
                message: 'Name and phone are required fields'
            });
        }

        const newUser = new User({
            name: name.trim(),
            phone: phone.trim()
        });

        const savedUser = await newUser.save();
        res.status(201).json({
            success: true,
            message: 'User added successfully',
            data: savedUser
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error adding user',
            error: error.message
        });
    }
});

// PUT endpoint to update an existing user
app.put('/users/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        const { name, phone } = req.body;

        if (!name && !phone) {
            return res.status(400).json({
                success: false,
                message: 'Nothing to update. Provide name or phone.'
            });
        }

        const updateData = { updatedAt: new Date() };
        if (typeof name === 'string' && name.trim()) {
            updateData.name = name.trim();
        }
        if (typeof phone === 'string' && phone.trim()) {
            updateData.phone = phone.trim();
        }

        const updatedUser = await User.findByIdAndUpdate(
            userId, 
            updateData, 
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        res.json({ success: true, message: 'User updated successfully', data: updatedUser });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error updating user', error: error.message });
    }
});

// DELETE endpoint to remove a user
app.delete('/users/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        const deletedUser = await User.findByIdAndDelete(userId);
        
        if (!deletedUser) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        res.json({ success: true, message: 'User deleted successfully', data: deletedUser });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error deleting user', error: error.message });
    }
});

// Root endpoint - serve the UI
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Visit http://localhost:${PORT} for API documentation`);
});
