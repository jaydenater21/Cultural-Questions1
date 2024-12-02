const { Client } = require('@supabase/supabase-js');
const supabase = new Client('https://mluwlxyfriojitbflifm.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1sdXdseHlmcmlvaml0YmZsaWZtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzMxNzYyOTgsImV4cCI6MjA0ODc1MjI5OH0.xB9l3vqvKvMxZuNU8Hjaq2Z58K2zMd2E12Gtxox1oZA');

exports.handler = async (event, context) => {
    try {
        // Parse the incoming request body
        const { name, title, culture, message } = JSON.parse(event.body);

        // Validate input (optional but recommended)
        if (!name || !title || !culture || !message) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: 'All fields are required' })
            };
        }

        // Insert post into Supabase
        const { data, error } = await supabase
            .from('posts')
            .insert([{ name, title, culture, message }]);

        // Handle potential errors from Supabase
        if (error) {
            console.error('Error inserting post:', error);
            return {
                statusCode: 500,
                body: JSON.stringify({ error: error.message })
            };
        }

        // Successfully created the post
        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Post created successfully!' })
        };
    } catch (error) {
        // Catch any unexpected errors
        console.error('Error in function:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Internal Server Error' })
        };
    }
};
