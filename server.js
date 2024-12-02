const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

// Enable CORS and JSON parsing
app.use(cors());
app.use(bodyParser.json());

// Path to the file that will store the posts
const postsFilePath = './posts.json';

// Function to load posts from the JSON file
const loadPosts = () => {
  if (fs.existsSync(postsFilePath)) {
    const data = fs.readFileSync(postsFilePath, 'utf8');
    return JSON.parse(data);
  }
  return []; // Return an empty array if the file doesn't exist
};

// Function to save posts to the JSON file
const savePosts = (posts) => {
  fs.writeFileSync(postsFilePath, JSON.stringify(posts, null, 2));
};

// API endpoint to get all posts
app.get('/posts', (req, res) => {
  const posts = loadPosts();
  res.json(posts);
});

// API endpoint to create a new post
app.post('/posts', (req, res) => {
  const { name, title, culture, message } = req.body;
  
  if (!name || !title || !culture || !message) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const posts = loadPosts();
  const newPost = {
    name,
    title,
    culture,
    message,
    createdAt: new Date()
  };

  posts.push(newPost);
  savePosts(posts);

  res.status(201).json(newPost);
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
