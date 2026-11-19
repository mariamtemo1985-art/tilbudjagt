# Website monetisation — safe activation guide

This repository contains three revenue paths:

1. **Affiliate / CPA** through approved networks and disclosed partner links.
2. **Display advertising** through AdSense-compatible slots, disabled by default.
3. **Direct sponsor placements**, labelled “Sponsoreret”.

The site must not claim revenue from every page view. Affiliate and CPC income only
arise from a qualifying click or purchase under the relevant agreement. Display ads
can earn per impression or click, but only after the advertising account, consent
solution and ad units are approved and configured.

## 1. Display ads — do not activate early

The `AdSlot` component renders **nothing** unless all of the following are present:

- `NEXT_PUBLIC_ADSENSE_CLIENT`
- the relevant `NEXT_PUBLIC_ADSENSE_SLOT_*` value
- `NEXT_PUBLIC_ADSENSE_CMP_READY=true`

`NEXT_PUBLIC_ADSENSE_CMP_READY` must only be set to `true` after a Google-certified
consent management platform (CMP) is configured for the site in AdSense. A homemade
cookie banner is not a substitute for the consent solution Google requires. Keep the
flag `false` until that setup is complete.

Before setting the flag:

1. Get the site approved in AdSense.
2. Create the ad units and copy their numeric slot IDs into the matching variables.
3. Configure the certified CMP / consent message for EEA, UK and Swiss visitors.
4. Test with a consent rejection and confirm that no ad request is made.
5. Update the privacy and cookie pages if the actual data flow changes.
6. Redeploy after changing public environment variables.

Do not place ads above or inside a store’s primary visit button, and never style an
ad as navigation, a store result or an editorial recommendation. The component adds
the label “Annonce” automatically.

## 2. Direct sponsor placements

Set these public variables to show one sponsor banner on the home and store-directory
pages:

- `NEXT_PUBLIC_SPONSOR_NAME`
- `NEXT_PUBLIC_SPONSOR_URL`
- `NEXT_PUBLIC_SPONSOR_TEXT`

The banner is automatically labelled “Sponsoreret” and uses
`rel="sponsored noopener noreferrer"`. A plain sponsor link does not set first-party
cookies, but any tracking pixel or third-party script added later requires a separate
consent and privacy assessment.

Use a written agreement that states the placement, period, price, labelling and the
advertiser’s responsibility for its content. Do not sell “top result” positions
without making the paid nature clear, and do not imply that a sponsor has been
independently reviewed.

## 3. Affiliate and performance links

- Use only approved network links.
- Keep the visible “Reklame” or partner disclosure.
- Do not describe directory-only stores as partners or offers.
- Do not add prices or discounts that the store has not supplied.
- Follow each network’s rules on PPC, coupons, apps and email.

## 4. Suggested placement map

| Page | Placement | Rule |
| --- | --- | --- |
| Home | After hero | One sponsor banner or one display slot, never both competing |
| Store directory | Above results | One slot, labelled; do not cover filters |
| Product results | Above results | One slot, labelled; keep results usable |
| Guides | After article body | One slot; do not interrupt the main advice |
| Store detail | Below the store CTA | Never above the visit button |
| Newsletter | Dedicated sponsor section | Only relevant, clearly labelled content |

The store-detail slot uses `NEXT_PUBLIC_ADSENSE_SLOT_STORE`.

## 5. Legal checklist

- Marketing and affiliate links must be identifiable as advertising.
- Obtain valid consent before non-essential cookies or ad tracking.
- Do not use forced clicks, misleading buttons, pop-unders or fake close buttons.
- Do not sell or scrape personal data.
- Keep the privacy policy, cookie policy and terms aligned with what is live.
- Get Danish legal/tax advice before launching paid memberships or material revenue.

The `/annoncering` page explains the available formats to advertisers without
inventing traffic numbers or guaranteed results.
