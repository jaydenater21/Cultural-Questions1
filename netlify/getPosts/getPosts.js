// netlify/edge-functions/getPosts.js

// Dynamically import Supabase client for Edge function
export default async function handler(event) {
  try {
      const { createClient } = await import('@supabase/supabase-js');  // Dynamically import Supabase client

      // Get Supabase credentials from environment variables
      const supabaseUrl = process.env.SUPABASE_DATABASE_URL;
      const supabaseKey = process.env.SUPABASE_ANON_KEY;
      
      // Initialize Supabase client
      const supabase = createClient(supabaseUrl, supabaseKey);

      // Fetch posts from Supabase database (posts table)
      const { data, error } = await supabase
          .from('posts')  // Assuming 'posts' is your table name
          .select('*');

      if (error) {
          throw error;
      }

      // Return the fetched posts
      return new Response(JSON.stringify(data), {
          status: 200,
          headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*',  // CORS header
          },
      });
  } catch (error) {
      console.error("Error fetching posts:", error);
      return new Response(JSON.stringify({ error: 'Error fetching posts' }), {
          status: 500,
          headers: {
              'Content-Type': 'application/json',
          },
      });
  }
}
