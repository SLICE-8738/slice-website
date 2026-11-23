# Updating the SLICE Robotics Website

This guide is for anyone updating the website, even if they have never edited a website before. Most updates are simple text changes in an `.astro` page. The notes at the top of each page file point out the safest place to make common edits.

## The simple version

1. Open this project folder in Visual Studio Code.
2. Find the page or shared file listed below.
3. Change the text or data, keeping the surrounding code and punctuation in place.
4. Preview the site locally and check the page you changed.
5. Run a production build, then ask another team member to review the change before it is published.

You do not need to understand all of Astro to update text. If a change requires new behavior, a new page, a form integration, or a complicated layout, ask a developer for help rather than guessing.

## Start and preview the website

The project requires Node.js 22.12.0 or newer. Open a terminal in the project folder (the folder containing `package.json`) and run:

```sh
npm install
npm run dev
```

`npm install` is normally only needed the first time on a computer, or after project dependencies change. Open the local address printed in the terminal (usually `http://localhost:4321`). Keep the terminal open while previewing; press `Ctrl+C` there to stop the server.

When you finish editing, run:

```sh
npm run build
```

A successful build means Astro could generate the website. It does not check whether every fact, link, or image is correct, so also open your changed page in the local preview and check it on a phone-sized screen if possible. The site deploys through the GitHub Actions workflow when changes reach the `main` branch; do not push directly to `main` unless that is the team's agreed process.

## Find the right file

Each file in `src/pages/` becomes a page on the website. The file name determines its address. Edit the existing page file for content updates; the page comments and the map below describe what belongs in each one.

| Page | File | What to update there |
| --- | --- | --- |
| Home (`/`) | [`src/pages/index.astro`](src/pages/index.astro) | Homepage introduction, mission, quick links, donation text, robot carousel, and kickoff countdown. Quick links and carousel entries are data lists near the top. |
| About (`/about/`) | [`src/pages/about.astro`](src/pages/about.astro) | Team overview, engineering/business subteam lists, team information, and meeting details. |
| Awards (`/awards/`) | [`src/pages/awards.astro`](src/pages/awards.astro) | Award history. Add or correct entries in the `awards` list near the top; each entry has a year, event, award name, and description. |
| Calendar (`/calendar/`) | [`src/pages/calendar.astro`](src/pages/calendar.astro) | Calendar embed. The calendar itself is managed in Google Calendar; change the embed address only when the public calendar changes. |
| Contact (`/contact/`) | [`src/pages/contact.astro`](src/pages/contact.astro) | Contact introduction, organization details, and form labels/topics. Do not change the form endpoint or hidden access key unless the form administrator directs you to. |
| Design playground (`/design/`) | [`src/pages/design.astro`](src/pages/design.astro) | Visual examples for testing the site's typography and components. It is a design reference, not a normal content page. |
| What is FIRST? (`/first/`) | [`src/pages/first.astro`](src/pages/first.astro) | FIRST/FRC explanation, season timeline, and kickoff/build/competition photo lists. |
| Join (`/join/`) | [`src/pages/join.astro`](src/pages/join.astro) | Membership invitation, interest-area descriptions, meeting information, and contact callout. |
| Leadership (`/leadership/`) | [`src/pages/leadership.astro`](src/pages/leadership.astro) | Current student leadership names, roles, and the introduction. Names are displayed from lists near the top. |
| Mentors (`/mentors/`) | [`src/pages/mentors.astro`](src/pages/mentors.astro) | Mentor names and roles in the `mentors` list near the top. |
| Outreach (`/outreach/`) | [`src/pages/outreach.astro`](src/pages/outreach.astro) | Outreach stories in the `programs` list, including each event's heading, title, and description. |
| Robot gallery (`/robots/`) | [`src/pages/robots.astro`](src/pages/robots.astro) | The robot cards and their season summaries. Each card links to a detail page listed below. |
| Sponsor us (`/sponsor-us/`) | [`src/pages/sponsor-us.astro`](src/pages/sponsor-us.astro) | Sponsorship information, tier names/amounts/benefits, packet link, and contact callout. Confirm all financial details with the team before publishing. |
| Current sponsors (`/sponsors/`) | [`src/pages/sponsors.astro`](src/pages/sponsors.astro) | Sponsor names, tiers, logo filenames, and website links in the `sponsors` list. |
| Page not found (404) | [`src/pages/404.astro`](src/pages/404.astro) | The message and links shown for a missing page. |
| C² robot (`/robots/c2/`) | [`src/pages/robots/c2.astro`](src/pages/robots/c2.astro) | C² game and robot description, stats, photos, CAD/code links, and competition results. |
| Clementune (`/robots/clementune/`) | [`src/pages/robots/clementune.astro`](src/pages/robots/clementune.astro) | Clementune game and robot description, stats, photos, CAD/code links, and competition results. |
| SLICEasaurus Rex (`/robots/sliceasaurus-rex/`) | [`src/pages/robots/sliceasaurus-rex.astro`](src/pages/robots/sliceasaurus-rex.astro) | SLICEasaurus Rex game and robot description, stats, photos, CAD/code links, and competition results. |
| S.S. Squeeze (`/robots/ss-squeeze/`) | [`src/pages/robots/ss-squeeze.astro`](src/pages/robots/ss-squeeze.astro) | S.S. Squeeze game and robot description, stats, photos, CAD/code links, and competition results. |
| Tangerine (`/robots/tangerine/`) | [`src/pages/robots/tangerine.astro`](src/pages/robots/tangerine.astro) | Tangerine game and robot description, stats, photos, CAD/code links, and competition results. |

The top navigation is maintained separately in [`src/components/Header.astro`](src/components/Header.astro), and the footer links and social accounts are in [`src/components/Footer.astro`](src/components/Footer.astro). If a page is added, renamed, or removed, check both navigation files so visitors can find it and links do not break.

## Common updates

### Change text

1. Open the page file from the table.
2. Search within the file for the text shown on the website.
3. Replace only the text between the HTML tags (for example, between `<p>` and `</p>`), or change the matching value in a data list.
4. Save and check the local preview.

For data lists, preserve the surrounding quotes, commas, and braces. For example, an entry may look like `{ name: "Example", role: "Team Lead" }`. Change the words inside the quotes; do not remove the punctuation around them. To add a list item, copy an existing item and replace its values.

### Add or replace an image

Images used by the site are stored in `public/images/`. Keep new images in the matching subfolder (such as `outreach`, `people/leaders`, `people/mentors`, `sponsors`, or a robot's `hero`, `photos`, or `cad` folder). Use a simple filename without spaces where possible. Paths and file-name capitalization must match exactly.

For an image to appear, both the image file and its reference in the page must be correct. Some pages build the image filename from a title or a person's name; follow the existing pattern described in that page's comment. Add useful alternative text (`alt`) that describes the image for visitors who cannot see it. Do not upload private, unapproved, or copyrighted photos.

For a robot photo gallery, the detail page currently expects files named `photo-1.png` through `photo-6.png` under that robot's `photos` folder. If you add, remove, or rename a photo, update the `galleryImages` list in the matching robot page as well. The robot hero, game logo, CAD images, and related links are also referenced in that page.

The site's logo and browser-tab icons are in `public/` and `public/images/`. If replacing one, keep its existing filename so the site continues to find it, or ask a developer to update every reference too.

When editing a link to another page or image on this site, copy the nearby link pattern instead of typing a new root-relative path. Some deployments use a base path, and the existing helpers account for it; a link that works on your computer may otherwise break after publishing.

### Update names, awards, sponsors, or other repeated information

Repeated cards and table rows are usually generated from a list near the top of the page file. Update that list rather than copying and rearranging the HTML below it. For people, confirm that the matching image exists in `public/images/people/`; for sponsors, confirm the logo exists in `public/images/sponsors/`.

### Change a site-wide feature

- **Navigation labels and destinations:** edit `src/components/Header.astro`. Keep the paths consistent with the page file names.
- **Footer text, social links, or footer destinations:** edit `src/components/Footer.astro`.
- **Announcement banner or popup:** edit `src/config/campaigns.ts`. Change the `enabled` setting to turn a placement on/off, update its text and destination, and use a new unique `id` for each new campaign so people who dismissed the old one can see it. Replace example destinations with an approved link and double-check the destination and dates before enabling. The display behavior is in `src/components/CampaignPromotions.astro`.
- **Shared page title, browser description, header, or footer:** these are provided by `src/layouts/` and `src/components/`. Most page content changes do not require editing a layout.
- **Colors, fonts, and shared styling:** styles are mainly in `src/styles/global.css`. Ask for help if changing CSS is unfamiliar; a shared style can affect many pages.
- **Donation button:** it is reused from `src/components/PayPalDonate.astro`. Do not change payment account details without approval from the account owner.
- **Calendar events:** edit the connected Google Calendar, not the page markup.

## Add a page

Adding a page is more than adding a file:

1. Ask a developer to help if this is your first time creating an Astro page.
2. Add a `.astro` file under `src/pages/`. Its file name determines its URL (for example, `new-page.astro` becomes `/new-page/`).
3. Use an existing page as a starting point and its matching layout from `src/layouts/`.
4. Add a short comment at the top explaining what content belongs on the page and where its repeated data or images come from.
5. Add a link in `src/components/Header.astro` and/or `src/components/Footer.astro` if visitors should navigate to it.
6. Check the page and its links in the local preview, then run `npm run build`.

Do not rename a page casually: its URL may already be linked elsewhere or shared publicly. If a URL must change, update navigation and every link to it, and arrange a redirect if needed.

## Before sharing your changes

- Check spelling, dates, names, award details, prices, contact information, and external links with someone who knows the facts.
- Check that any new image loads and has helpful alternative text.
- Open the changed page locally and click the links you changed.
- Run `npm run build` and confirm it finishes successfully.
- Ask a teammate to review the change before it is merged or published.

## Where to get help

The website uses Astro. The shared templates are in `src/layouts/`, reusable pieces are in `src/components/`, and global styling is in `src/styles/global.css`. Astro's beginner documentation is available at [docs.astro.build](https://docs.astro.build/). If the requested edit involves code you do not understand, ask a team developer to review it rather than deleting unfamiliar lines.
