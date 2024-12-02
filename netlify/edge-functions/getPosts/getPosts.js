// netlify/edge-functions/getPosts.js

export async function handler(event) {
    try {
        // Dynamic import for MongoDB client to avoid bundling issues
        const { MongoClient } = await import('mongodb');  

        const uri = "mongodb+srv://<username>:<password>@cluster0.vnroy.mongodb.net/<dbname>?retryWrites=true&w=majority";
        const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

        // Connect to MongoDB
        await client.connect();

        const db = client.db('<dbname>');
        const collection = db.collection('posts');
        
        // Fetch the posts
        const posts = await collection.find({}).toArray();

        return new Response(JSON.stringify(posts), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',  // Add CORS headers
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
