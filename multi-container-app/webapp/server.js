const express = require('express');
const path = require('path');
const { createClient } = require('redis');

const app = express();
const port = 3000;

// Redis client setup
const redisClient = createClient({
  socket: {
    host: process.env.REDIS_HOST || 'localhost',
    port: process.env.REDIS_PORT || 6379
  }
});

// Connect to Redis
redisClient.connect()
  .then(() => console.log('✅ Connected to Redis'))
  .catch((err) => console.error('❌ Redis connection error:', err));

// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.static('public'));

// Home Route: Counts page views
app.get('/', async (req, res) => {
  await redisClient.incr('pageviews');
  const views = await redisClient.get('pageviews');
  console.log(`👁️ Pageviews: ${views}`);
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

// POST /api/users: Save user to Redis
app.post('/api/users', async (req, res) => {
  try {
    const user = req.body;

    // Validation
    if (!user.name || !user.email || !user.gender || !user.phone) {
      return res.status(400).json({ success: false, message: 'Missing fields' });
    }

    // Push user as JSON string to Redis List
    await redisClient.rPush('users', JSON.stringify(user));

    // Get all users after adding
    const userList = await redisClient.lRange('users', 0, -1);
    const parsedUsers = userList.map(userStr => JSON.parse(userStr));

    res.json({ success: true, users: parsedUsers });
  } catch (err) {
    console.error('❌ Error saving user:', err);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

// GET /api/users: Fetch all users from Redis
app.get('/api/users', async (req, res) => {
  try {
    const userList = await redisClient.lRange('users', 0, -1);
    const parsedUsers = userList.map(userStr => JSON.parse(userStr));
    res.json(parsedUsers);
  } catch (err) {
    console.error('❌ Error fetching users:', err);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

// Start server
app.listen(port, () => {
  console.log(`🚀 Server is running at http://localhost:${port}`);
});


const greeting = process.env.GREETING || "Hello from default 👋";
console.log("GREETING from ENV:", greeting);

