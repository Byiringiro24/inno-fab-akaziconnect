// models/User.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ['employee','employer','admin'], default: 'employee' },
  verified: { type: Boolean, default: false },
  company: {
    name: String,
    regNumber: String,
    proofUrl: String
  },
  profile: {
    bio: String,
    skills: [String],
    resumeUrl: String
  }
}, { timestamps: true });

export default mongoose.models.User || mongoose.model('User', userSchema);
