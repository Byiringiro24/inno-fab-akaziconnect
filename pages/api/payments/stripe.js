// pages/api/payments/stripe.js
import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY||'sk_test_placeholder');

export default async function handler(req,res){
  if (req.method === 'POST'){
    const { amount } = req.body;
    const pi = await stripe.paymentIntents.create({ amount: Math.round(amount), currency: 'usd' });
    return res.json({ clientSecret: pi.client_secret });
  }
  res.status(405).end();
}
