import type { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '');

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { priceKey } = req.body as {
    priceKey: 'NEXT_PUBLIC_STRIPE_PRICE_MONTHLY' | 'NEXT_PUBLIC_STRIPE_PRICE_YEARLY'
  };
  if (!priceKey) return res.status(400).json({ error: 'Missing priceKey' });

  const priceId = process.env[priceKey];
  if (!priceId) return res.status(400).json({ error: `Price ID not configured for ${priceKey}` });

  try {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${siteUrl}/success`,
      cancel_url: `${siteUrl}/cancel`,
      allow_promotion_codes: true,
      billing_address_collection: 'auto',
    });

    return res.status(200).json({ url: session.url });
  } catch (e: any) {
    console.error(e);
    return res.status(500).json({ error: e.message || 'Stripe error' });
  }
}