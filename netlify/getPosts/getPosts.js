// netlify/edge-functions/getPosts.js

const { Client } = require('@supabase/supabase-js');
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;

const supabase = new Client(SUPABASE_URL, SUPABASE_ANON_KEY);

export default async function handler(event) {
    try {
        // Fetch posts from Supabase
        const { data, error } = await supabase
            .from('posts')
            .select('*');

        if (error) {
            console.error('Error fetching posts:', error);
            return new Response(JSON.stringify({ error: 'Error fetching posts' }), {
                status: 500,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*', // CORS
                },
            });
        }

        return new Response(JSON.stringify(data), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*', // Allow all origins for CORS
            },
        });
    } catch (error) {
        console.error('Error fetching posts:', error);
        return new Response(JSON.stringify({ error: 'Error fetching posts' }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*', // CORS
            },
        });
    }
}

