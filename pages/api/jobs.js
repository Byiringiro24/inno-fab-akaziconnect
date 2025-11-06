// pages/api/jobs.js
import { connectMongo } from '../../lib/mongodb';
import Job from '../../models/Job';
import User from '../../models/User';
import { getSession } from 'next-auth/react';

export default async function handler(req,res){
  await connectMongo();
  const session = await getSession({ req });

  if (req.method === 'POST'){
    if (!session || session.user.role !== 'employer') return res.status(401).json({ error:'Not authorized' });
    const employer = await User.findOne({ email: session.user.email });
    if (!employer.verified) return res.status(403).json({ error:'Employer not verified' });
    const { title, description, location, category, salaryRange, deadline, featured } = req.body;
    const job = await Job.create({ title, description, employer: employer._id, location, category, salaryRange, deadline, featured: !!featured, status: 'pending' });
    return res.json(job);
  }

  if (req.method === 'GET'){
    // query options: ?pending=1 ; ?mine=1 ; ?id=...
    if (req.query.pending){
      const jobs = await Job.find({ status: 'pending' }).populate('employer','company.name email');
      return res.json(jobs);
    }
    if (req.query.mine){
      if (!session) return res.status(401).json([]);
      const u = await User.findOne({ email: session.user.email });
      const jobs = await Job.find({ employer: u._id }).sort({ createdAt:-1 });
      return res.json(jobs);
    }
    if (req.query.id){
      const job = await Job.findById(req.query.id).populate('employer','company.name email');
      return res.json(job);
    }
    // public listing: approved & not expired
    const now = new Date();
    const jobs = await Job.find({ status: 'approved', deadline: { $gte: now } }).populate('employer','company.name');
    return res.json(jobs);
  }

  if (req.method === 'PUT'){
    // admin approve/reject
    if (!session || session.user.role !== 'admin') return res.status(401).json({ error:'Not authorized' });
    const { jobId, action } = req.body;
    const job = await Job.findById(jobId);
    if (!job) return res.status(404).json({ error:'Not found' });
    job.status = action === 'approve' ? 'approved' : 'rejected';
    await job.save();
    return res.json(job);
  }

  res.status(405).end();
}
