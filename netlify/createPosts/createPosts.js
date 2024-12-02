// netlify/functions/createPost.js

const { Client } = require('@supabase/supabase-js');
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;

const supabase = new Client(SUPABASE_URL, SUPABASE_ANON_KEY);

exports.handler = async function(event, context) {
    if (event.httpMethod === 'POST') {
        try {
            // Parse incoming data
            const { name, title, culture, message } = JSON.parse(event.body);

            // Insert the new post into Supabase
            const { data, error } = await supabase
                .from('posts')
                .insert([
                    {
                        name,
                        title,
                        culture,
                        message,
                        createdAt: new Date().toISOString(),
                    }
                ]);

            if (error) {
                console.error('Error inserting post:', error);
                return {
                    statusCode: 500,
                    body: JSON.stringify({ error: 'Error creating post' }),
                };
            }

            return {
                statusCode: 200,
                body: JSON.stringify({ message: 'Post created successfully' }),
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*', // Allow all origins for CORS
                },
            };
        } catch (error) {
            console.error('Error processing the request:', error);
            return {
                statusCode: 500,
                body: JSON.stringify({ error: 'Error processing request' }),
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*', // Allow all origins for CORS
                },
            };
        }
    }

    return {
        statusCode: 405,
        body: JSON.stringify({ error: 'Method Not Allowed' }),
        headers: {
            'Content-Type': 'application/json',
        },
    };
};
