# TilbudJagt.dk

TilbudJagt.dk is a Danish deals and store directory. The site lists approved affiliate partners and direct store links, and only shows prices or offers when they come from a verified feed or the store itself.

## Live site

- Website: https://www.tilbudjagt.dk
- Store directory: https://www.tilbudjagt.dk/butikker
- Product search: https://www.tilbudjagt.dk/produkter
- Guides: https://www.tilbudjagt.dk/guides

## What is implemented

- Responsive Next.js App Router site in Danish, English and Arabic (Arabic uses RTL).
- Store directory with categories, search, individual store pages and logos.
- Approved partner stores use official affiliate links with visible Reklame/affiliate disclosure and `rel="sponsored nofollow noopener noreferrer"`.
- Non-partner stores use direct links and are clearly labelled as direct links without commission.
- Product catalogue built from approved Partner-ads and Awin feeds, with server-side search.
- Weekly feed refresh workflow and weekly link/security monitoring.
- VIP interest list with welcome email, unsubscribe link and Danish unsubscribe confirmation.
- Legal pages: privacy policy, terms, cookie policy and advertising information.
- Security headers, basic rate limiting for public endpoints, `security.txt`, `ads.txt` and `app-ads.txt`.

## Not enabled yet

- Paid VIP subscriptions and Stripe checkout are intentionally disabled until the bank/payment setup is confirmed.
- Real display ads are not loaded before the ad network approval and consent setup are complete.
- The mobile app is not published on Google Play or the App Store yet. A signed Android test build is used for internal testing only.
- Prices and offers are shown only when a verified feed is available; the site does not invent prices.

## Local development

1. Install Node.js 20 or newer.
2. Run `npm install`.
3. Copy `.env.example` to `.env.local` and fill in the services you are using.
4. Run `npm run dev` and open http://localhost:3000.

Useful commands:

```bash
npm run build
npm run typecheck
npm run check:links
npm run check:links:all
npm run import:feeds
```

## Environment variables

See `.env.example`. Never commit real API keys, service-role keys or passwords. Privileged operations run server-side only.

## Affiliate and legal notes

- Affiliate links are added only after the advertiser/network has approved TilbudJagt.
- Commission percentages and programme terms come from the relevant network and may change.
- The site does not guarantee a specific saving or price. Users should always check the current price and terms at the retailer.
- Sponsored or affiliate content is disclosed in Danish in the relevant page copy.

## Monitoring

- GitHub Actions: security/DNS monitor and weekly store-link monitor.
- Vercel Cron: weekly security and traffic report sent to the site support mailbox only.
- Manus scheduled review: weekly check without making changes without approval.
