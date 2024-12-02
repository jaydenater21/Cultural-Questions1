// netlify/functions/getPosts.js
const { MongoClient } = require('mongodb');

// Connection URI and Database Name
const uri = "mongodb+srv://jayden:jayden@cluster0.vnroy.mongodb.net/jayden?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

exports.handler = async (event, context) => {
    try {
        // Connect to MongoDB
        await client.connect();

        // Access the database and collection
        const db = client.db('jayden'); // Replace <dbname> with your actual DB name
        const collection = db.collection('posts'); // Replace 'posts' with the collection name you want to query

        // Query to get all posts
        const posts = await collection.find({}).toArray();

        // Return the posts as a JSON response with CORS headers
        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*', // Allow all origins (you can restrict this to specific domains)
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS', // Allowed HTTP methods
                'Access-Control-Allow-Headers': 'Content-Type', // Allowed headers
            },
            body: JSON.stringify(posts),
        };
    } catch (error) {
        console.error("Error fetching posts:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Error fetching posts' }),
        };
    } finally {
        // Close the connection
        await client.close();
    }
};

