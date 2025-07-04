
import { MongoClient, ServerApiVersion } from 'mongodb';
const URI = process.env.ATLAS_URI || '';
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

let db

const connectMongoDB = async () => {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    db = await client.db("student-mgmt-system");
    console.log('Connected to MongoDB Atlas');
  } catch (err) {
    console.log('There was an error to connect MongoDB Atlas', err);
    await client.close();
  }
}

const getDB = async() => {
  if (!db) {
    throw new Error('Database not initialized. Call connectMongoDB first.');
  }
  return db;
}

export {
  getDB,
  connectMongoDB
};

