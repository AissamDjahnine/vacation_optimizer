# Ponts Malins

Ponts Malins is a **Next.js + React + Tailwind + TypeScript** web application focused on one use case: helping people in France find the smartest bridge-day and leave combinations.

The product includes:

- a planner for `gros pont` and `plusieurs ponts`
- support for monthly RTT rules
- school holiday overlays and zone `A / B / C`
- annual planning mode with `rendement / équilibré / famille`
- `.ics` export and Google Calendar links on results
- bilingual public pages in French and English
- editorial guide pages around leave planning, public holidays, and school holidays

## Stack

- Next.js App Router
- React 19
- Tailwind CSS
- TypeScript
- Zod
- Vitest

## Main routes

- `/`
- `/ponts/2026`
- `/jours-feries/2026`
- `/vacances-scolaires-ponts/2026`
- `/guide-poser-conges-2026`
- `/vacances-scolaires-2026-ponts`
- `/jours-feries-2027-ponts`
- `/faq-ponts-jours-feries`

English pages are available under `/en/...`.

## Local development

Install dependencies:

```sh
PATH=/opt/homebrew/bin:$PATH /opt/homebrew/bin/npm install
```

Run the dev server:

```sh
PATH=/opt/homebrew/bin:$PATH /opt/homebrew/bin/npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Checks

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
PATH=/opt/homebrew/bin:$PATH /opt/homebrew/bin/npm run smoke:deploy -- https://your-site.vercel.app
```

## Deployment

Recommended target: **Vercel**.

Why Vercel over Netlify for this project:

- better default fit for Next.js App Router
- fewer edge cases for route handlers and SSG pages
- simpler previews and production deploy flow

Typical production flow:

```sh
PATH=/opt/homebrew/bin:$PATH /opt/homebrew/bin/npm install
PATH=/opt/homebrew/bin:$PATH /opt/homebrew/bin/npm run build
PATH=/opt/homebrew/bin:$PATH /opt/homebrew/bin/npm test
git push origin main
```

Then in Vercel:

- import the GitHub repository
- framework preset: `Next.js`
- build command: `npm run build`
- output setting: default Next.js output
- no required environment variables for the current app state

Post-deploy checklist:

1. Open `/`
2. Open `/ponts/2026`
3. Open `/jours-feries/2026`
4. Open `/vacances-scolaires-ponts/2026`
5. Open `/planifier-annee/2026`
6. Open `/en`
7. Run `npm run smoke:deploy -- https://your-site.vercel.app`

## Data sources

- Public holidays: [Nager.Date](https://date.nager.at)
- School holidays: [data.education.gouv.fr](https://data.education.gouv.fr/) and [education.gouv.fr](https://www.education.gouv.fr/calendrier-scolaire-100148)

## Project structure

- [app](/Users/aissam/Documents/vacation_optimizer/app)
- [components](/Users/aissam/Documents/vacation_optimizer/components)
- [content](/Users/aissam/Documents/vacation_optimizer/content)
- [lib/domain](/Users/aissam/Documents/vacation_optimizer/lib/domain)
- [lib/api](/Users/aissam/Documents/vacation_optimizer/lib/api)
- [tests](/Users/aissam/Documents/vacation_optimizer/tests)

Flutter has been removed from the product path. This repository now targets the web-first React application only.
