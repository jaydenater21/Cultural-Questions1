// netlify/edge-functions/getPosts.js

// Use dynamic import for MongoDB to avoid bundling issues with Edge
export default async function handler(event) {
    try {
        const { MongoClient } = await import('mongodb');  // Dynamically import MongoDB

        const uri = "mongodb+srv://<username>:<password>@cluster0.vnroy.mongodb.net/<dbname>?retryWrites=true&w=majority";
        const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

        // Connect to MongoDB
        await client.connect();

        const db = client.db('<dbname>');
        const collection = db.collection('posts');
        
        // Fetch posts from the database
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

