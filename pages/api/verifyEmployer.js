// pages/api/verifyEmployer.js
import { getSession } from 'next-auth/react';
import { connectMongo } from '../../lib/mongodb';
import User from '../../models/User';

export default async function handler(req,res){
  await connectMongo();
  const session = await getSession({ req });
  if (req.method === 'GET'){
    if (req.query.list){
      const list = await User.find({ role: 'employer', verified: false }).select('-password');
      return res.json(list);
    }
    return res.status(400).end();
  }

  if (req.method === 'POST'){
    if (!session || session.user.role !== 'admin') return res.status(401).json({ error:'Not authorized' });
    const { employerId, action } = req.body;
    const user = await User.findById(employerId);
    if (!user) return res.status(404).json({ error:'Not found' });
    user.verified = action === 'approve';
    await user.save();
    return res.json({ ok:true, verified: user.verified });
  }

  res.status(405).end();
}
