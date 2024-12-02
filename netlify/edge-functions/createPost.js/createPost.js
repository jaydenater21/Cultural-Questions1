// createPost.js (Netlify Function)

import { MongoClient } from 'mongodb';

const fs = require('fs');
const path = require('path');

exports.handler = async (event, context) => {
    if (event.httpMethod === 'POST') {
        const { name, title, culture, message } = JSON.parse(event.body);

        // Simulate saving post data (In a real app, store in a database like FaunaDB or Airtable)
        const post = {
            name,
            title,
            culture,
            message,
            createdAt: new Date().toISOString(),
            replies: []
        };

        // Load existing posts
        const filePath = path.join(__dirname, '..', 'posts.json');
        let posts = [];

        if (fs.existsSync(filePath)) {
            const data = fs.readFileSync(filePath);
            posts = JSON.parse(data);
        }

        // Save new post
        posts.push(post);
        fs.writeFileSync(filePath, JSON.stringify(posts));

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Post created successfully' }),
        };
    }

    return {
        statusCode: 405,
        body: JSON.stringify({ error: 'Method Not Allowed' }),
    };
};






