// submitReply.js (Netlify Function)
const fs = require('fs');
const path = require('path');

exports.handler = async (event, context) => {
    if (event.httpMethod === 'POST') {
        const { postId, name, message } = JSON.parse(event.body);

        // Load existing posts
        const filePath = path.join(__dirname, '..', 'posts.json');
        const data = fs.readFileSync(filePath);
        const posts = JSON.parse(data);

        const post = posts.find(p => p.id === postId);
        if (!post) {
            return {
                statusCode: 404,
                body: JSON.stringify({ error: 'Post not found' }),
            };
        }

        // Add reply to the post
        const reply = { name, message, createdAt: new Date().toISOString() };
        post.replies.push(reply);

        // Save updated posts
        fs.writeFileSync(filePath, JSON.stringify(posts));

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Reply submitted successfully' }),
        };
    }

    return {
        statusCode: 405,
        body: JSON.stringify({ error: 'Method Not Allowed' }),
    };
};