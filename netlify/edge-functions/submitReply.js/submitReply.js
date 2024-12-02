// netlify/functions/submitReply.js

export default async function handler(event, context) {
    try {
        // Dynamically import Supabase client for edge function
        const { createClient } = await import('@supabase/supabase-js');  // Dynamically import Supabase client

        // Get Supabase credentials from environment variables
        const supabaseUrl = process.env.SUPABASE_DATABASE_URL;
        const supabaseKey = process.env.SUPABASE_ANON_KEY;
        
        // Initialize Supabase client
        const supabase = createClient(supabaseUrl, supabaseKey);

        if (event.httpMethod === 'POST') {
            const { postId, name, message } = JSON.parse(event.body);

            // Add the reply
            const reply = { name, message, createdAt: new Date().toISOString() };

            // Update the post with the reply in Supabase (assuming replies column is JSONB)
            const { data, error } = await supabase
                .from('posts')  // Assuming 'posts' is your table name
                .update({
                    replies: supabase.raw('array_append(replies, ?)', [reply])  // Append the reply to the 'replies' array
                })
                .eq('id', postId)  // Find the post by postId
                .single();

            if (error) {
                throw error;
            }

            // Return success response
            return new Response(JSON.stringify({ message: 'Reply submitted successfully' }), {
                status: 200,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',  // CORS header
                },
            });
        }

        return new Response(JSON.stringify({ error: 'Method Not Allowed' }), {
            status: 405,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.error('Error submitting reply:', error);
        return new Response(JSON.stringify({ error: 'Error submitting reply' }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}
