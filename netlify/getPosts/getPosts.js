const { Client } = require('@supabase/supabase-js');
const supabase = new Client('https://mluwlxyfriojitbflifm.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1sdXdseHlmcmlvaml0YmZsaWZtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzMxNzYyOTgsImV4cCI6MjA0ODc1MjI5OH0.xB9l3vqvKvMxZuNU8Hjaq2Z58K2zMd2E12Gtxox1oZA');

exports.handler = async (event, context) => {
    try {
        const { data, error } = await supabase
            .from('posts')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            return {
                statusCode: 500,
                body: JSON.stringify({ error: error.message })
            };
        }

        return {
            statusCode: 200,
            body: JSON.stringify(data)
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Internal Server Error' })
        };
    }
};
