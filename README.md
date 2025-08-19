# QuickResumeEdit – Stripe Ready MVP

## Env vars (Vercel)
OPENAI_API_KEY=
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
NEXT_PUBLIC_STRIPE_PRICE_MONTHLY=
NEXT_PUBLIC_STRIPE_PRICE_YEARLY=
NEXT_PUBLIC_SITE_URL=https://quickresumeedit.com

## Stripe Webhook
Add endpoint: https://quickresumeedit.com/api/stripe-webhook
Events: checkout.session.completed, invoice.payment_succeeded, customer.subscription.deleted
