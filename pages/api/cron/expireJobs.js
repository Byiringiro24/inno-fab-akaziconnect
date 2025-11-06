// pages/api/cron/expireJobs.js
import { connectMongo } from '../../../lib/mongodb';
import Job from '../../../models/Job';

export default async function handler(req,res){
  const key = req.query.key;
  if (process.env.CRON_SECRET && key !== process.env.CRON_SECRET) return res.status(401).json({ error:'Bad key' });
  await connectMongo();
  const now = new Date();
  const result = await Job.updateMany({ deadline: { $lt: now }, status: { $ne: 'expired' } }, { $set: { status: 'expired' } });
  return res.json({ ok:true, result });
}
