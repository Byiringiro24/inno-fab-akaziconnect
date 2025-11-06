// scripts/seedAdmin.js
import bcrypt from 'bcryptjs';
import { connectMongo } from '../lib/mongodb';
import User from '../models/User';
import dotenv from 'dotenv';
dotenv.config();

async function run(){
  await connectMongo();
  const email = process.env.ADMIN_EMAIL || "byiringirofabrice6@gmail.com";
  const password = process.env.ADMIN_PASSWORD || "Password@123";
  const existing = await User.findOne({ email });
  if (existing) {
    console.log('Admin already exists'); process.exit(0);
  }
  const hash = await bcrypt.hash(password, 10);
  await User.create({ name: 'Admin', email, password: hash, role: 'admin', verified: true });
  console.log('Admin created:', email);
  process.exit(0);
}
run().catch(e=>{ console.error(e); process.exit(1); });
