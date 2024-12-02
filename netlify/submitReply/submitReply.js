// netlify/functions/submitReply.js

const { Client } = require('@supabase/supabase-js');
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;

const supabase = new Client(SUPABASE_URL, SUPABASE_ANON_KEY);

exports.handler = async function(event, context) {
    if (event.httpMethod === 'POST') {
        try {
            // Parse incoming data
            const { postId, name, message } = JSON.parse(event.body);

            // Insert the new reply into Supabase
            const { data, error } = await supabase
                .from('replies')
                .insert([
                    {
                        post_id: postId,
                        name,
                        message,
                        createdAt: new Date().toISOString(),
                    }
                ]);

            if (error) {
                console.error('Error inserting reply:', error);
                return {
                    statusCode: 500,
                    body: JSON.stringify({ error: 'Error submitting reply' }),
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*', // Allow all origins for CORS
                    },
                };
            }

            return {
                statusCode: 200,
                body: JSON.stringify({ message: 'Reply submitted successfully' }),
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
