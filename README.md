# TilbudJagt.dk

Next.js foundation for a Danish deals and community platform.

## Local development

1. Install Node.js 20 or newer.
2. Run `npm install`.
3. Copy `.env.example` to `.env.local` and fill in values only after creating the corresponding services.
4. Run `npm run dev` and open http://localhost:3000.

## Current implementation status

- Next.js App Router foundation and responsive landing page.
- Danish, English and Arabic interface switch; Arabic uses RTL layout.
- Demo deal cards, category filtering, search, sorting and local save interaction.
- VIP information display at the agreed price of DKK 40/month.
- Basic metadata for search and social sharing.
- Existing Google verification file, ads.txt, legacy index.html and Supabase migration are retained.

## Not production-ready yet

The visible deals are explicitly demo data. Authentication, database reads/writes, moderation, merchant submission, affiliate tracking, Stripe checkout/webhooks, consent management, email alerts, app installation manifest, legal pages and automated tests still require implementation and configuration. Do not advertise live offers or accept payments until those features are connected and tested.

## Services

Supabase is planned for authentication and data. Stripe is planned for VIP billing. Never commit secret keys. Use deployment environment variables and server-only code for privileged operations.
