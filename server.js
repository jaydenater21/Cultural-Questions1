const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware to parse JSON data
app.use(bodyParser.json());
app.use(express.static('public')); // Serve static files (like your HTML)

// Store posts in memory (you can later replace this with a database)
let posts = [];

// Route to get all posts
app.get('/posts', (req, res) => {
    res.json(posts);
});

// Route to create a new post
app.post('/posts', (req, res) => {
    const { name, title, culture, message } = req.body;
    
    if (!name || !title || !culture || !message) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    // Save the new post
    const newPost = {
        name,
        title,
        culture,
        message,
        createdAt: new Date().toISOString(),
    };
    posts.push(newPost);

    // Send back the new post
    res.status(201).json(newPost);
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});