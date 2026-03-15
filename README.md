# Ponts Malins

Ponts Malins is a web-first product built for one specific use case: helping people in France plan smarter leave, bridge days, public-holiday breaks, and school-holiday-friendly periods.

The public production domain is intended to be:

- [pontsmalins.com](https://pontsmalins.com)

The app is deployed on Vercel and the custom domain can be attached there when DNS is ready.

## Product overview

Ponts Malins combines:

- a monthly planner for `gros pont` and `plusieurs ponts`
- an annual planning mode to distribute a leave budget across the year
- public holidays for France
- school-holiday overlays with zones `A / B / C`
- a department / academy to school-zone lookup
- `.ics` export and Google Calendar links on useful results
- French and English public pages
- editorial guide pages designed to rank on search intent and convert readers back to the planner

The product is intentionally focused:

- France first
- practical leave scenarios, not generic calendar browsing
- editorial content that stays useful and source-backed

## Main features

### Planner

- monthly planning by year and month
- planning modes:
  - `Gros pont`
  - `Plusieurs ponts`
- RTT support
- school-holiday behavior:
  - `Neutre`
  - `Favoriser`
  - `Éviter`
- overlap toggle when school holidays are relevant
- clear result cards with day-by-day timeline
- export options:
  - `.ics`
  - Google Calendar

### Annual planning

- annual leave-budget planner
- strategies:
  - `Rendement max`
  - `Équilibré`
  - `Famille`
- total budget used / remaining
- total days off summary
- exportable annual plan

### Editorial / SEO

- yearly bridge pages
- yearly public-holiday pages
- school-holiday pages
- family-focused guides
- FAQ and rules/exceptions content
- intent pages such as:
  - Ascension bridge
  - May bridges
  - leave with 5 days
  - leave with 10 days
  - zone-specific school holiday pages

### Trust / product readiness

- legal notice page
- privacy page
- official sources page
- sitemap and robots
- post-deploy smoke test script

## Tech stack

- Next.js App Router
- React 19
- TypeScript
- Tailwind CSS
- Zod
- Vitest

This repository no longer uses Flutter in production. The active product path is the React / Next.js web application only.

## Main routes

### Core product

- `/`
- `/planifier-annee/2026`
- `/ponts/2026`
- `/jours-feries/2026`
- `/vacances-scolaires-ponts/2026`

### Main guides

- `/guide-poser-conges-2026`
- `/vacances-scolaires-2026-ponts`
- `/jours-feries-2027-ponts`
- `/faq-ponts-jours-feries`

### Intent pages

- `/pont-ascension-2026`
- `/ponts-mai-2026`
- `/pont-11-novembre-2026`
- `/pont-noel-fin-annee-2026`
- `/vacances-scolaires-2026-zone-a`
- `/vacances-scolaires-2026-zone-b`
- `/vacances-scolaires-2026-zone-c`
- `/jours-feries-2026-semaine`
- `/poser-5-jours-conges-2026`
- `/poser-10-jours-conges-2026`

### Trust pages

- `/mentions-legales`
- `/confidentialite`
- `/sources-officielles`

English pages are available under `/en/...`.

## Local development

Install dependencies:

```sh
PATH=/opt/homebrew/bin:$PATH /opt/homebrew/bin/npm install
```

Run the development server:

```sh
PATH=/opt/homebrew/bin:$PATH /opt/homebrew/bin/npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Run a production build locally:

```sh
PATH=/opt/homebrew/bin:$PATH /opt/homebrew/bin/npm run build
PATH=/opt/homebrew/bin:$PATH /opt/homebrew/bin/npm run start
```

## Quality checks

Run tests:

```sh
PATH=/opt/homebrew/bin:$PATH /opt/homebrew/bin/npm test
```

Build for production:

```sh
PATH=/opt/homebrew/bin:$PATH /opt/homebrew/bin/npm run build
```

Run the post-deploy smoke test against a live URL:

```sh
PATH=/opt/homebrew/bin:$PATH /opt/homebrew/bin/npm run smoke:deploy -- https://your-project.vercel.app
```

## Deployment

Recommended platform: **Vercel**

Why Vercel is the default choice here:

- best fit for Next.js App Router
- simple production deploys from GitHub
- clean support for static, SSG, and route-handler mixes
- easy preview URLs for content and UI reviews

### First deployment

1. Import the GitHub repository in Vercel.
2. Keep the root directory at the repository root.
3. Framework preset: `Next.js`
4. Install command: `npm install`
5. Build command: `npm run build`
6. No required environment variables for the current project state.

### Production branch

Use:

- `main`

### Custom domain

When DNS is ready, attach:

- `pontsmalins.com`

Recommended canonical setup:

- primary domain: `pontsmalins.com`
- redirect `www.pontsmalins.com` to the primary domain

After connecting the domain, rerun the smoke test against the final URL.

## Post-deploy checklist

Open and verify:

1. `/`
2. `/planifier-annee/2026`
3. `/ponts/2026`
4. `/jours-feries/2026`
5. `/vacances-scolaires-ponts/2026`
6. `/guide-poser-conges-2026`
7. `/faq-ponts-jours-feries`
8. `/en`
9. `/en/plan-year/2026`

Then run:

```sh
PATH=/opt/homebrew/bin:$PATH /opt/homebrew/bin/npm run smoke:deploy -- https://pontsmalins.com
```

## Data and sources

The app uses a mix of curated local snapshots and official/public references.

Main references:

- [Service-Public.fr](https://www.service-public.fr/)
- [Ministère de l'Éducation nationale](https://www.education.gouv.fr/calendrier-scolaire-100148)
- [data.gouv.fr](https://www.data.gouv.fr/)
- [Nager.Date](https://date.nager.at/)

The dedicated source page in the app is:

- `/sources-officielles`

## Project structure

- [app](/Users/aissam/Documents/vacation_optimizer/app)
- [components](/Users/aissam/Documents/vacation_optimizer/components)
- [content](/Users/aissam/Documents/vacation_optimizer/content)
- [data](/Users/aissam/Documents/vacation_optimizer/data)
- [lib](/Users/aissam/Documents/vacation_optimizer/lib)
- [scripts](/Users/aissam/Documents/vacation_optimizer/scripts)
- [tests](/Users/aissam/Documents/vacation_optimizer/tests)

## Roadmap notes

Ponts Malins is deployable and production-ready, but still designed to evolve.

Typical next improvements:

- deeper SEO intent coverage
- analytics and conversion tracking
- careful ad integration on content pages only
- additional official edge cases
- more yearly school-calendar snapshots

The planner should remain the core product surface. Content, SEO, and monetization layers should support it without making the main experience heavier or noisier.
