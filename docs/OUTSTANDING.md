# Outstanding items

Everything here is either left off the site or marked as interim until the owner confirms it.
Last updated 9 November 2026 (second pass).

## Facts to confirm

| Item | Current state | Where to change it |
|---|---|---|
| Registered legal name | Not shown. Sync's docs say "Raavon Limited" | `content/site.ts`, `site.legalName` |
| contact@raavon.com as the public address | Published, subject to confirmation | `content/site.ts` |
| The four capability areas | Published as written in the brief | `content/capabilities.ts` |
| Budget ranges in the form (₦) | Under ₦1m, ₦1m to ₦5m, ₦5m to ₦15m, ₦15m to ₦50m, Over ₦50m | `content/engagement.ts` |
| Klario stage wording ("Private beta") | Based on the Klario README (closed testing) | `content/projects/*.ts` |
| Klario Business invoicing as a live feature | Listed, based on the invoices page in klario-business | `content/projects/*.ts` |
| Klario receipts | Listed for the business dashboard (found in klario-business Sales) | `content/projects/klario.ts` |
| Klario transfers, bills and savings | Not listed until live status and partner arrangements are confirmed | `content/projects/*.ts` |
| Klario app store links | Website linked (klario.finance); store links not added | `content/projects/klario.ts` |
| Sync | Published as an owned venture (approved). letsyncyou.com did not respond, so it is not linked | `content/projects/sync.ts` |
| Client work | Nine projects published with the owner's approval. Confirm each client is happy to be named | `content/projects/clients.ts` |
| "What changed" text on client projects | Taken from the owner's portfolio drafts (hellomuiz.com). Qualitative, not measured | `content/projects/clients.ts` |
| Klario Business example data | The business screenshots show the dashboard's built-in example (thecodehive, three banks with last digits). Confirm these are safe to publish | `public/projects/klario/` |
| Social profiles | None shown. The old `@raavongroup` handle was unverified | `content/site.ts`, `site.social` |
| Founding date and location | Removed from structured data until confirmed | `app/layout.tsx` |

## Assets needed

- **Vector logo files (SVG).** The supplied logos are raster PNGs. Web versions are in
  `public/brand/`; the on-dark versions recolour the light files to the supplied Dark
  colours (Cream lettering, Burgundy V) on a transparent background. Supply SVGs for the
  sharpest result.
- **Favicon.** `app/icon.png` is the official RV symbol on a Cream tile. Replace if a dedicated icon is designed.
- **Privacy policy text.** The contact and newsletter forms collect personal data, so a
  privacy page is needed. It is not linked until the text is approved.
- **More Klario screenshots, if wanted.** Three are used. Several were left out on purpose:
  - `debt.jpeg` shows a real person's name and loan details.
  - `ai.jpeg` shows a bank name and account digits.
  - `savings.jpeg` and `dashboard.jpeg` show a "Klario wallet" balance, which could suggest
    that Klario holds customer funds.
- **Budgets screenshot.** The income rows in `budgets.jpg` render the Klario logo as an image
  where the income names should be. Replace it with a clean capture if this is a bug.
- **Founder or team details and photographs**, only if they should be published.

## Integrations awaiting configuration

| Integration | Needed for | Variables |
|---|---|---|
| Resend, with raavon.com verified | Contact form, newsletter, admin replies and broadcasts | `RESEND_API_KEY`, `RESEND_FROM`, `CONTACT_INBOX` |
| Signing secret | Admin sessions and unsubscribe links | `SESSION_SECRET` |
| Admin password | `/admin` | `ADMIN_PASSWORD` |
| Durable storage (recommended: a Supabase table, as Klario uses) | Keeping enquiries and subscribers across deploys. `lib/storage.ts` writes to `/tmp`, which Vercel clears | Not yet built |
| Shared rate limit (optional) | Stronger abuse protection than the in-memory limiter | Not yet built |

Until Resend is configured, both forms say clearly that nothing was sent and offer an
email fallback. They never show a false success message.

## Projects

- Excluded on purpose (NDA, per the owner's portfolio): FeeXeet, PTAD NHIS, Norocio (TSES), Q-blog, and IQX/FMDQ work.
- Screenshots were captured from the live sites (Dine At Night, Ìtàn Ìtàn, Lagos Wellness Club,
  Twelve, klario.finance) or from local builds (Orneli, SKOA, Bejewelled, The WOW Signatures, Sync)
  on 9 November 2026. PNI uses the cover from the owner's portfolio. Recapture when sites change.
- Not yet captured: The WOW Signatures and Sync live sites did not respond.
- SKOA's local Next.js version printed a security advisory when started. Consider upgrading Next.js in that project.

## Studio (/studio)

- Visitors build a page from templates, palettes, fonts and sections, share it by link,
  or send it as a brief to the contact form (`?brief=`). There is deliberately no download
  or export: the design stays inside the Studio.
