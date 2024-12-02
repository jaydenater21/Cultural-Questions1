// createPost.js (Netlify Function)

import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabase = createClient(
  process.env.SUPABASE_DATABASE_URL, // Database URL from environment variables
  process.env.SUPABASE_SERVICE_ROLE_KEY // Service role key from environment variables
);

exports.handler = async (event, context) => {
    if (event.httpMethod === 'POST') {
        const { name, title, culture, message } = JSON.parse(event.body);

        // Validate incoming data
        if (!name || !title || !culture || !message) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: 'Missing required fields' }),
            };
        }

        // Insert the new post into the 'posts' table
        const { data, error } = await supabase
            .from('posts') // Assuming you have a 'posts' table
            .insert([
                {
                    name,
                    title,
                    culture,
                    message,
                    created_at: new Date().toISOString(),
                    replies: [], // Default empty replies
                },
            ]);

        if (error) {
            console.error('Error creating post:', error.message);
            return {
                statusCode: 500,
                body: JSON.stringify({ error: 'Error creating post' }),
            };
        }

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Post created successfully', data }),
        };
    }

    return {
        statusCode: 405,
        body: JSON.stringify({ error: 'Method Not Allowed' }),
    };
};




