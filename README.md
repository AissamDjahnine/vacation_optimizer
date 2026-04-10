# Ponts Malins

Ponts Malins is a Next.js web product focused on leave planning around public holidays and school holidays.

## Production domains

- [pontsmalins.com](https://pontsmalins.com) (France + EN pages)
- [de.pontsmalins.com](https://de.pontsmalins.com) (Germany product, DE + EN)

## What the product does

- Monthly planner (`Gros pont` / `Plusieurs ponts`) with RTT support
- Annual planner mode
- Public holiday and school-holiday pages
- Zone lookup (`A/B/C`) for France
- `.ics` export and Google Calendar links
- Editorial pages for SEO intent capture

## Main route surfaces

### France / international host (`pontsmalins.com`)

- `/`
- `/planifier-annee/:year`
- `/ponts/:year`
- `/jours-feries/:year`
- `/vacances-scolaires-ponts/:year`
- `/guide-poser-conges-2026`
- `/vacances-scolaires-2026-ponts`
- `/jours-feries-2027-ponts`
- `/faq-ponts-jours-feries`
- `/sources-officielles`
- `/en/...` equivalents for public pages

### Germany host (`de.pontsmalins.com`)

- `/`
- `/brueckentage-deutschland/:year`
- `/feiertage-deutschland/:year`
- `/schulferien-deutschland/:year`
- `/brueckentage/:state/:year`
- `/feiertage/:state/:year`
- `/schulferien/:state/:year`
- `/offizielle-quellen`
- `/en/...` equivalents

## SEO and canonical behavior

- Canonical host/protocol normalization is enforced in middleware.
- `www` variants redirect to canonical hosts.
- Main-host `/de/...` routes redirect to `de.pontsmalins.com` equivalents.
- Sitemaps:
  - `https://pontsmalins.com/sitemap.xml`
  - `https://de.pontsmalins.com/sitemap.xml`
- Robots:
  - `https://pontsmalins.com/robots.txt`
  - `https://de.pontsmalins.com/robots.txt`

## Tech stack

- Next.js (App Router)
- React 19
- TypeScript
- Tailwind CSS
- Vitest

## Scripts

```sh
npm run dev
npm run build
npm run start
npm run lint
npm test
npm run smoke:deploy -- https://your-domain
```

## Local development

```sh
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Validation checklist (quick)

1. `npm test`
2. Verify:
- `/`
- `/planifier-annee/2026`
- `/ponts/2026`
- `/jours-feries/2026`
- `/vacances-scolaires-ponts/2026`
- `/en`
- `https://de.pontsmalins.com/`
3. Run smoke:

```sh
npm run smoke:deploy -- https://pontsmalins.com
```

## Data sources

- [Service-Public.fr](https://www.service-public.fr/)
- [Ministère de l'Éducation nationale](https://www.education.gouv.fr/calendrier-scolaire-100148)
- [data.gouv.fr](https://www.data.gouv.fr/)
- [Nager.Date](https://date.nager.at/)
- [KMK (Germany school holidays)](https://www.kmk.org/service/ferienregelung/ferienkalender.html)

## Project structure

- [app](/Users/aissam/Documents/vacation_optimizer/app)
- [components](/Users/aissam/Documents/vacation_optimizer/components)
- [content](/Users/aissam/Documents/vacation_optimizer/content)
- [data](/Users/aissam/Documents/vacation_optimizer/data)
- [lib](/Users/aissam/Documents/vacation_optimizer/lib)
- [scripts](/Users/aissam/Documents/vacation_optimizer/scripts)
- [tests](/Users/aissam/Documents/vacation_optimizer/tests)
