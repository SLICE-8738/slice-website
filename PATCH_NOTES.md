# Patch Notes — Feedback Round (Aug 2026)

This documents every change made in response to the feedback list, what
data came from the live slicerobotics.org site vs. what's still a
placeholder, and the manual setup steps needed before a few features
(donations, the contact form) actually work in production.

**Build note:** the sandbox this was built in couldn't run `npm run dev`
or `npm run build` — the packaged `node_modules` has Windows-only native
bindings (`@rolldown/binding-win32-x64-msvc`) and there's no network
access in the sandbox to reinstall the Linux ones. Every change here was
made by careful hand-editing and manual review of the `.astro`/`.css`
source, not verified against a live render. **Please run `npm run dev`
locally and click through the site before deploying** — flag anything
that looks off.

---

## 1. CSS review / uneven spacing

- **Root cause of misaligned cards:** `.card` didn't have a fixed
  layout strategy, so cards with more or less blurb text ended up
  different heights, and any trailing button/CTA landed at a different
  vertical position row-to-row (visible on the homepage quick-links,
  robot gallery, and sponsor cards). Fixed by making `.card` a flex
  column with `height: 100%` and pinning any trailing `.button` to the
  bottom via `margin-top: auto`. Cards in a grid row now bottom-align
  their buttons regardless of text length above.
- Added consistent `margin` resets on `.card h3/h4/p` so heading/body
  spacing inside cards doesn't vary by browser default margins.
- Rebuilt the homepage "Our Mission" block: it was one `<blockquote>`
  with manual `<br>` tags chaining six lines together, which read as an
  uneven wall of text. It's now six separate `<p>` lines in a
  `.mission-lines` flex column with a consistent 10px gap.
- Fixed a real HTML bug on the homepage: `<p class="hero-copy";
  style="color: var(--text);">` had a stray semicolon inside the tag
  (invalid attribute syntax). Replaced the inline style with a proper
  scoped rule (`.hero .hero-copy { color: var(--text); }`).
- Removed a leftover, undefined `card-grid` class from `robots.astro`
  and `outreach.astro` (it did nothing — `grid grid-3` was already
  doing the actual layout work; having an extra fake class was just
  noise flagged in the old code comments).

## 2. Donate link on the front page

Added two donate CTAs on the homepage: one in the hero button row
(`Donate ->`), and a more prominent one in a new "Support SLICE"
section near the bottom with a short blurb + a secondary "Become a
Sponsor" link to `/sponsor-us`.

**Action needed:** `DONATE_URL` in `src/pages/index.astro` is currently
a placeholder PayPal donate link
(`hosted_button_id=REPLACE_ME`). To make this real:
1. Log into the team's PayPal (business/nonprofit) account.
2. Create a PayPal Donate button (PayPal Buttons → Donate).
3. Copy the real `hosted_button_id` and replace `REPLACE_ME` in
   `index.astro`.

## 3. Left padding on narrow/vertical viewports

`.page` used a fixed 20px inset on every side at every width. On tall,
narrow phone screens that reads as cramped, especially against the
left edge where headings/body text start. Added two mobile breakpoints
in `global.css` (`≤600px` and `≤420px`) that both widen the total
side inset *and* weight it toward the left — e.g. at ≤600px the content
now sits ~34px from the left edge vs. ~22px from the right. If "more
padding on the left" was meant more literally (e.g. only on specific
pages), let me know which ones and I can scope it further.

## 4. Contact form backend

**This site deploys to GitHub Pages** (confirmed via
`.github/workflows/astro.yml`), which is static-hosting only — there's
no server to run a real form-submission handler on, and Astro API
routes need a server adapter GitHub Pages doesn't support. The
standard fix for a static site is a client-side form backend service,
so the form now POSTs via `fetch()` to
**[Formspree](https://formspree.io)** — free for low volume, no server
code required, and easy to test-then-swap exactly like the feedback
asked for.

**Action needed to actually receive email:**
1. Create a free account at formspree.io.
2. Create a new form, verify it against `benpark20@icloud.com` for
   testing (Formspree emails a confirmation link).
3. Copy the form's endpoint (`https://formspree.io/f/XXXXXXXX`) and
   paste it in `FORM_ENDPOINT` in `src/pages/contact.astro`, replacing
   the `xxxxxxxx` placeholder.
4. Test the form on the live/deployed site (Formspree blocks
   submissions from `localhost` on the free tier).
5. When ready for the real site, create a **second** Formspree form
   verified against the team's real business email, and swap
   `FORM_ENDPOINT` again.

Also added while wiring this up:
- Required-field validation, a hidden honeypot field (`_gotcha`) to
  cut down on bot spam, and a disabled/"Sending…" state on the submit
  button.
- Inline success/error status messaging (`.form-status` in
  `global.css`) instead of a silent failure or a page navigation.

## 5. Instagram + YouTube links

Pulled directly from the live site's footer:
- Instagram: https://www.instagram.com/slice_robotics/
- YouTube: http://www.youtube.com/@FVHSLICE8738

Added as icon links in the footer (new `.social-links` block, next to
the team blurb) and as text links in the footer's Sponsors column.

## 6. Leadership page — real org structure

The old page was a flat grid of 4 placeholder names. Rebuilt using the
actual roster scraped from slicerobotics.org's Team Leadership page,
organized into the real reporting structure:

- **President:** Logan Baker
- **Captains:** Ben Park (Engineering), Caraline Kruger (Business),
  Zach Mugnone (Operations)
- **Engineering Leads:** Emma Smith (Mechanical), Preston Kruse
  (Electrical), Layakara Sai Kambhampalli (Software)
- **Business Leads:** Ishika Harish (Revenue); Marketing, Impact, and
  Finance Leads are shown as open/vacant, matching the live site's
  "Interested? This could be you!" copy for those roles
- **Operations Leads:** Luke Baker (Build Space), Jake Mendler
  (Design), Jacob Martin (Strategy)

President is shown as a single centered card, Captains and each Leads
group get their own row. No student photos were available from the
scrape, so cards still show a "PHOTO" placeholder box — drop real
headshots into `public/images/` and swap the placeholder `<div
class="image square">` for an `<img>` per person when you have them.

## 7. Robot gallery cards — actually fixed

Found the real bug: card links were `href={`/robots/${robot.slug}`}`
with **no base path prefix**. Since the site deploys under
`/slice-website/` (see `astro.config.mjs`), every robot card was a
dead 404 link in production, even though it worked fine in local dev
(where the base path doesn't apply the same way). Fixed by using the
same `sitePath()` helper the rest of the site already uses. Also added
`card-image` class to the photo placeholder so it gets the same
edge-to-edge treatment as image cards elsewhere on the site.

## 8. Sponsor Us page — visually tiered cards

Previously all three tiers (Title/Gold/Silver) rendered as identical
boxes with only the heading text implying rank. Now:
- **Title** is enlarged (~2% scale), has a warm gradient background, a
  brighter border/glow, and a "Top Tier" badge ribbon.
- **Gold** sits at a middle visual weight.
- **Silver** is smaller-feeling and slightly dimmed.

**Action needed:** dollar amounts are still `PLACEHOLDER $` — the live
site has a `Tiers.png` graphic with real numbers that couldn't be read
from a text-only scrape. Send over the real tier pricing and I'll drop
it in (`tiers` array in `src/pages/sponsor-us.astro`).

## 9. Google Calendar embed

Added a real embedded calendar on `/calendar`, using the same public
calendar the live site embeds (`business@slicerobotics.org`, timezone
`America/New_York`). Wrapped in a responsive `.calendar-embed`
container (16:11 on desktop, 4:5 on mobile) instead of a fixed-height
iframe.

## 10. Real favicon / tab-bar icon

The site previously used Astro's default placeholder icon —
`favicon.ico`/`favicon.svg` were never even linked in
`<head>`. Generated a proper icon set from the actual SLICE logo
(`public/images/logo.webp`): `favicon.ico` (16/32/48px), 16px and
32px PNGs, and a 180px Apple touch icon, all linked in
`src/layouts/Layout.astro`. Also generated (but didn't wire up) 192px
and 512px PNGs in case you want a PWA manifest down the line.

## 11. Homepage countdown

Added a live-ticking countdown widget (`src/components/Countdown.astro`,
plain client-side JS, no framework dependency) between the mission
statement and the quick-links section.

Defaulted the target to **the 2027 FRC Kickoff — January 9, 2027, 12:00
PM ET** — a confirmed, real date (per firstinspires.org) rather than a
made-up placeholder, since it's a date every FRC team already cares
about. **Swap `COUNTDOWN_TARGET` in `src/pages/index.astro` to SLICE's
actual next competition date** once that's locked in — the component
takes any ISO date via a prop, so this is a one-line change.

---

## Other things worth a look (not explicitly requested, found in review)

- **`/sponsors` page:** of the 6 sponsor logos on the live site, only
  3 had identifiable names from their image filenames — **Caterpillar**,
  the **Gene Haas Foundation**, and **TE Connectivity** are now real;
  the other 3 are still `PLACEHOLDER Sponsor`. Send names/tiers/logo
  files for those and I'll fill them in.
- **Footer legal name:** still flagged as a placeholder ("Fuquay Varina
  Robotics Boosters, Inc.") from before this round — worth confirming
  it's the correct legal/parent org name.
- **Robot descriptions:** the gallery page still has one-line
  `PLACEHOLDER description of {name}` text per robot — real
  descriptions weren't available from the scrape.
