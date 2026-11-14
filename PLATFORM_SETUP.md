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

1. Create and open the TilbudJagt Supabase project.
2. Review and apply both SQL files in the Supabase SQL Editor, in filename order:
   - `supabase/migrations/202611140001_initial_schema.sql`
   - `supabase/migrations/202611140002_auth_profile_trigger.sql`
3. Configure Auth email sign-in and allowed redirect URLs for the production domain and the Vercel preview domain.
4. Add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` to Vercel for Production and Preview. The publishable key can be used as the public client key; never use an `sb_secret` key in a `NEXT_PUBLIC_*` variable.
5. Keep any service-role/secret key server-side only. Never paste real keys into GitHub or public chat.

The migrations create profiles, stores, offers, saved offers, moderated comments, user interests, merchant submissions, VIP memberships, and feed-import history. Row-level security is enabled. Public visitors can read only active offers and active stores. User submissions are held for moderation. Stripe membership state and AWIN feed imports must be written by trusted server-side processes.

## Stripe setup

1. Create a recurring VIP price of 40 DKK per month in Stripe.
2. Add the price ID as `STRIPE_VIP_PRICE_ID`.
3. Configure a webhook endpoint on the server and verify webhook signatures before updating membership rows.
4. Do not activate checkout until tax/VAT treatment, cancellation flow, customer portal, terms, and webhook handling have been tested.

## Safety and release rules

- Do not use sample offers as real offers. Production listings must come from verified merchant feeds or reviewed user submissions.
- Do not claim an offer is live, current, or discounted unless its source and validity dates are verified.
- Do not expose AWIN tokens, Supabase service-role keys, or Stripe secret keys in browser code or Git.
- Do not deploy this branch to production until the application build, database policies, payment lifecycle, accessibility, SEO, and mobile tests pass.
- Merge into `main` only after review and explicit release approval.

## Current repository findings

The original `main` branch is still separate from this platform foundation. The new foundation branch contains the Next.js application, Supabase authentication and database migrations, and moderated offer-submission flow. The live production domain remains on `main` until an explicit release is approved.
