const { Client } = require('@supabase/supabase-js');
const supabase = new Client('https://mluwlxyfriojitbflifm.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1sdXdseHlmcmlvaml0YmZsaWZtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzMxNzYyOTgsImV4cCI6MjA0ODc1MjI5OH0.xB9l3vqvKvMxZuNU8Hjaq2Z58K2zMd2E12Gtxox1oZA');
const { createClient } = require('@supabase/supabase-js');

exports.handler = async (event, context) => {
    try {
        // Fetch posts from Supabase
        const { data, error } = await supabase
            .from('posts')
            .select('*');

        // Handle potential errors from Supabase
        if (error) {
            console.error('Error fetching posts:', error);
            return {
                statusCode: 500,
                body: JSON.stringify({ error: error.message })
            };
        }

        // Return posts
        return {
            statusCode: 200,
            body: JSON.stringify(data)
        };
    } catch (error) {
        // Catch any unexpected errors
        console.error('Unexpected error:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Internal Server Error' })
        };
    }
};
