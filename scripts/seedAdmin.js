// scripts/seedAdmin.js
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import { MongoClient } from 'mongodb';

// Load .env.local explicitly
dotenv.config({ path: '.env.local' });

// MongoDB connection
const uri = process.env.MONGODB_URI;
if (!uri) throw new Error("Please define the MONGODB_URI in your .env.local");

const client = new MongoClient(uri);

async function connectMongo() {
  try {
    await client.connect();
    console.log('✅ MongoDB connected');
    return client.db(); // returns the default DB
  } catch (err) {
    console.error('❌ MongoDB connection failed:', err);
    process.exit(1);
  }
}

async function run() {
  const db = await connectMongo();
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;

  const existing = await db.collection('users').findOne({ email });
  if (existing) {
    console.log('Admin already exists');
    process.exit(0);
  }

  const hash = await bcrypt.hash(password, 10);
  await db.collection('users').insertOne({
    name: 'Admin',
    email,
    password: hash,
    role: 'admin',
    verified: true,
  });

  console.log('Admin created:', email);
  process.exit(0);
}

run().catch(err => { console.error(err); process.exit(1); });
