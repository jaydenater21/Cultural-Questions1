const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3000;

// In-memory storage for posts and replies
let posts = [];

// Middleware to parse JSON bodies
app.use(bodyParser.json());
app.use(cors()); // To handle cross-origin requests from the frontend

// POST request to create a new post
app.post('/posts', (req, res) => {
    const { name, title, culture, message } = req.body;
    
    if (!name || !title || !culture || !message) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    // Create a new post
    const newPost = {
        id: posts.length + 1,
        name,
        title,
        culture,
        message,
        createdAt: new Date(),
        replies: []
    };

    posts.push(newPost);
    res.status(201).json(newPost); // Send the created post back
});

// GET request to get all posts
app.get('/posts', (req, res) => {
    res.json(posts);
});

// POST request to create a new reply
app.post('/reply', (req, res) => {
    const { postId, name, message } = req.body;

    if (!postId || !name || !message) {
        return res.status(400).json({ error: 'All fields are required for replies.' });
    }

    // Find the post to reply to
    const post = posts.find(p => p.id === postId);
    if (!post) {
        return res.status(404).json({ error: 'Post not found.' });
    }

    // Create a new reply
    const newReply = {
        name,
        message,
        createdAt: new Date()
    };

    post.replies.push(newReply);
    res.status(201).json(newReply); // Send the created reply back
});

// Start the server, binding it to localhost
app.listen(port, 'localhost', () => {
    console.log(`Server is running on http://localhost:${port}`);
});
