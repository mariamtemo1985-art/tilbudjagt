# TilbudJagt.dk — platform foundation

This branch is the isolated implementation branch for the full platform. The existing `main` branch and live site are not changed by this foundation work.

## Agreed product decisions

- Default language: Danish; additional launch languages: English and Arabic (including RTL).
- VIP membership: 40 DKK/month.
- Affiliate network: AWIN, with advertiser approval and feed availability verified per program.
- Retailer-paid/promoted offers must be reviewed and clearly labeled as sponsored.
- PWA first; native Android/iOS apps are a later phase.
- Supabase is the planned database/authentication backend; Stripe is the planned recurring-payment provider.

## Supabase setup

1. Create a Supabase project owned by the site operator.
2. Open SQL Editor and apply `supabase/migrations/202611140001_initial_schema.sql`.
3. Configure Auth email sign-in and allowed redirect URLs for the production domain and local development.
4. Add the environment variables from `.env.example` to the hosting provider. Never commit real keys.
5. Keep the service-role key server-side only. Do not put it in a `NEXT_PUBLIC_*` variable.

The initial migration creates profiles, stores, offers, saved offers, moderated comments, user interests, merchant submissions, VIP memberships, and feed-import history. Row-level security is enabled. Public visitors can read only active offers and active stores. User submissions are held for moderation. Stripe membership state and AWIN feed imports must be written by trusted server-side processes.

## Stripe setup

1. Create a recurring EUR? No — the agreed billing currency is DKK.
2. Create a recurring VIP price of 40 DKK per month in Stripe.
3. Add the price ID as `STRIPE_VIP_PRICE_ID`.
4. Configure a webhook endpoint on the server and verify webhook signatures before updating membership rows.
5. Do not activate checkout until tax/VAT treatment, cancellation flow, customer portal, terms, and webhook handling have been tested.

## Safety and release rules

- Do not use sample offers as real offers. Production listings must come from verified merchant feeds or reviewed user submissions.
- Do not claim an offer is live, current, or discounted unless its source and validity dates are verified.
- Do not expose AWIN tokens, Supabase service-role keys, or Stripe secret keys in browser code or Git.
- Do not deploy this branch to production until the application build, database policies, payment lifecycle, accessibility, SEO, and mobile tests pass.
- Merge into `main` only after review and explicit release approval.

## Current repository findings

The current repository is a very small prototype: it contains a static `index.html`, a separate React/Next-style page in a directory whose name contains a zero-width character, and no root package manifest or production backend configuration. The prototype contains hard-coded example offers and a stale VIP price. The new foundation is kept separate so it cannot silently replace the existing site.
