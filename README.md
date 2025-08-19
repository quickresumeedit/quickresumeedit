# QuickResumeEdit – MVP

One-page app to tailor a resume to a job description using OpenAI.

## Quick start

1. Copy `.env.example` to `.env.local` and fill:
```
OPENAI_API_KEY=...
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
```
2. Install deps & run:
```
npm install
npm run dev
```
3. Open http://localhost:3000

## Deploy to Vercel
Create a new project on Vercel and add the same env vars in **Settings → Environment Variables**.

## Notes
- Uses `/api/tailor` to call OpenAI `responses` API with `gpt-4o-mini`.
- Stripe is stubbed (pricing page) – can be wired later.
- Supabase client is included for future auth/storage.
