// testMongo.js
import dotenv from 'dotenv';
import { MongoClient } from 'mongodb';

// Explicitly tell dotenv to load .env.local
dotenv.config({ path: '.env.local' });

const uri = process.env.MONGODB_URI;

if (!uri) {
  console.error('❌ Missing MONGODB_URI in .env.local');
  process.exit(1);
}

const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    console.log('✅ MongoDB connected successfully!');
  } catch (err) {
    console.error('❌ MongoDB connection failed:', err);
  } finally {
    await client.close();
  }
}

run();
