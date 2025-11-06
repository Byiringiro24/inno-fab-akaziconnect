// models/Application.js
import mongoose from 'mongoose';

const appSchema = new mongoose.Schema({
  job: { type: mongoose.Schema.Types.ObjectId, ref: 'Job' },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  status: { type: String, enum: ['applied','accepted','rejected'], default: 'applied' },
  resumeUrl: String
}, { timestamps: true });

export default mongoose.models.Application || mongoose.model('Application', appSchema);
