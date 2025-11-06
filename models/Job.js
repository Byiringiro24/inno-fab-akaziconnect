// models/Job.js
import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
  title: String,
  description: String,
  employer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  location: String,
  category: String,
  salaryRange: String,
  deadline: Date,
  status: { type: String, enum: ['pending','approved','expired','rejected'], default: 'pending' },
  featured: { type: Boolean, default: false },
  pricePaid: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.models.Job || mongoose.model('Job', jobSchema);
