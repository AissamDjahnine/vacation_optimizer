import { Breadcrumbs } from "@/components/content/breadcrumbs";
import Link from "next/link";
import Script from "next/script";
import { ContentHero } from "@/components/content/content-hero";
import { PageShell } from "@/components/content/page-shell";
import { Reveal } from "@/components/motion/reveal";
import type { GermanBridgeOpportunity } from "@/lib/germany/holidays";
import type {
  GermanHoliday,
  GermanOfficialSource,
  GermanSchoolHolidayPeriod,
  GermanStateCode,
  GermanyLocale,
} from "@/lib/domain/types";
import {
  germanNationalSources,
  getStatePageHighlights,
} from "@/lib/germany/content";
import { deRoutes, toGermanyExternalPath } from "@/lib/germany/routes";
import { germanyBaseUrl } from "@/lib/germany/seo";
import { germanStateMap, germanStates } from "@/lib/germany/states";
import { formatFullDate, formatShortRange } from "@/lib/formatting";

function localizePath(path: string, locale: GermanyLocale) {
  const externalPath = toGermanyExternalPath(path);
  if (locale === "de") {
    return externalPath;
  }
  return externalPath === "/" ? "/en" : `/en${externalPath}`;
}

function stateName(state: GermanStateCode, locale: GermanyLocale) {
  const meta = germanStateMap[state];
  return locale === "en" ? meta.englishName : meta.name;
}

function cycleYear(year: number) {
  return year === 2026 ? 2027 : 2026;
}

function germanyHomeLabel(locale: GermanyLocale) {
  return locale === "en" ? "Germany" : "Deutschland";
}

function OfficialSourcesBlock({
  locale,
  title,
  sources,
}: {
  locale: GermanyLocale;
  title?: string;
  sources: GermanOfficialSource[];
}) {
  const kicker = locale === "en" ? "Official sources" : "Offizielle Quellen";
  return (
    <Reveal>
      <section className="editorial-panel">
        <p className="editorial-kicker">{kicker}</p>
        <h2 className="mt-3 text-3xl font-black tracking-tight text-ink">{title ?? kicker}</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {sources.map((source) => (
            <a
              key={`${source.title}-${source.url}`}
              href={source.url}
              target="_blank"
              rel="noreferrer"
              className="rounded-4xl border border-line bg-paper p-5 shadow-card transition hover:-translate-y-0.5 hover:shadow-soft"
            >
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-coral">
                {source.label ?? (locale === "en" ? "Official" : "Offiziell")}
              </p>
              <h3 className="mt-3 text-xl font-black tracking-tight text-ink">{source.title}</h3>
              <p className="mt-3 text-sm leading-7 text-ink/72">{source.url}</p>
            </a>
          ))}
        </div>
      </section>
    </Reveal>
  );
}

function LinkGrid({
  locale,
  title,
  links,
}: {
  locale: GermanyLocale;
  title: string;
  links: { href: string; label: string; body: string }[];
}) {
  return (
    <Reveal>
      <section className="editorial-panel">
        <p className="editorial-kicker">
          {locale === "en" ? "Useful next pages" : "Nächste sinnvolle Seiten"}
        </p>
        <h2 className="mt-3 text-3xl font-black tracking-tight text-ink">{title}</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-4xl border border-line bg-paper p-5 shadow-card transition hover:-translate-y-1 hover:border-coral hover:shadow-soft"
            >
              <h3 className="text-2xl font-black tracking-tight text-ink">{link.label}</h3>
              <p className="mt-3 text-sm leading-7 text-ink/72">{link.body}</p>
            </Link>
          ))}
        </div>
      </section>
    </Reveal>
  );
}

function GermanyArticleSchema({
  headline,
  description,
  path,
  locale,
}: {
  headline: string;
  description: string;
  path: string;
  locale: GermanyLocale;
}) {
  const externalPath = localizePath(path, locale);
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    description,
    inLanguage: locale === "en" ? "en" : "de-DE",
    mainEntityOfPage: `${germanyBaseUrl}${externalPath}`,
    url: `${germanyBaseUrl}${externalPath}`,
    image: [`${germanyBaseUrl}/opengraph-image`],
    author: {
      "@type": "Organization",
      name: "Ponts Malins",
      url: germanyBaseUrl,
    },
    publisher: {
      "@type": "Organization",
      name: "Ponts Malins",
      url: germanyBaseUrl,
    },
  };

  return (
    <Script
      id={`de-schema-${locale}-${path}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function GermanyHomePage({ locale = "de" }: { locale?: GermanyLocale }) {
  const links = germanStates.map((state) => ({
    href: localizePath(deRoutes.stateBridgesYear(2026, state.code), locale),
    label:
      locale === "en"
        ? `Bridge days ${state.englishName} 2026`
        : `Brückentage ${state.name} 2026`,
    body:
      locale === "en"
        ? `The strongest bridge opportunities in ${state.englishName} for 2026, with an explicit official-source block.`
        : `Die wichtigsten Brückentage im ${state.name}-Kalender 2026 mit offiziellem Quellenblock.`,
  }));

  return (
    <PageShell>
      <Breadcrumbs
        items={[
          {
            name: germanyHomeLabel(locale),
            url: localizePath(deRoutes.home, locale),
          },
        ]}
      />
      <GermanyArticleSchema
        headline={
          locale === "en"
            ? "Bridge days, public holidays and school holidays in Germany"
            : "Brückentage, Feiertage und Schulferien in Deutschland"
        }
        description={
          locale === "en"
            ? "The Germany entry point for bridge days, public holidays and school holidays by state."
            : "Der Deutschland-Einstieg für Brückentage, Feiertage und Schulferien nach Bundesland."
        }
        path="/de"
        locale={locale}
      />
      <ContentHero
        badge={{ fr: locale === "en" ? "Germany" : "Deutschland", en: locale === "en" ? "Germany" : "Deutschland" }}
        title={{
          fr: locale === "en" ? "Germany" : "Deutschland",
          en: locale === "en" ? "Germany" : "Deutschland",
        }}
        subtitle={{
          fr:
            locale === "en"
              ? "Bridge days, public holidays and school holidays by German state, with official sources visible."
              : "Brückentage, Feiertage und Schulferien nach Bundesland mit Fokus auf offizielle Quellen.",
          en:
            locale === "en"
              ? "Bridge days, public holidays and school holidays by German state, with official sources visible."
              : "Brückentage, Feiertage und Schulferien nach Bundesland mit Fokus auf offizielle Quellen.",
        }}
        language={locale}
      />
      <Reveal>
        <section className="editorial-panel space-y-5">
          <p className="editorial-kicker">
            {locale === "en" ? "Germany product" : "Deutschland-Produkt"}
          </p>
          <h1 className="text-4xl font-black tracking-tight text-ink">
            {locale === "en"
              ? "Bridge days, public holidays and school holidays by state"
              : "Brückentage, Feiertage und Schulferien nach Bundesland"}
          </h1>
          <p className="editorial-lead">
            {locale === "en"
              ? "Germany needs its own product model, not a translated France product. Public holidays and school holidays are federal, so each state needs its own entry point."
              : "Deutschland braucht kein übersetztes Frankreich-Produkt, sondern ein eigenes Modell. Feiertage und Schulferien laufen föderal, deshalb ist jedes Bundesland ein eigener Einstieg."}
          </p>
          <div className="editorial-grid">
            <article className="editorial-panel-muted">
              <p className="editorial-kicker">{locale === "en" ? "States" : "Bundesländer"}</p>
              <p className="mt-3 text-4xl font-black tracking-tight text-ink">16</p>
              <p className="mt-2 text-sm leading-7 text-ink/72">
                {locale === "en"
                  ? "All states are covered in v1 as their own SEO surface."
                  : "Alle Länder sind im v1 als eigene SEO-Oberfläche abgedeckt."}
              </p>
            </article>
            <article className="editorial-panel-muted">
              <p className="editorial-kicker">{locale === "en" ? "Years" : "Jahre"}</p>
              <p className="mt-3 text-4xl font-black tracking-tight text-ink">2026-2027</p>
              <p className="mt-2 text-sm leading-7 text-ink/72">
                {locale === "en"
                  ? "The first rollout fully covers both years."
                  : "Der erste Rollout deckt beide Jahre vollständig ab."}
              </p>
            </article>
            <article className="editorial-panel-muted">
              <p className="editorial-kicker">
                {locale === "en" ? "Source policy" : "Quellenpolitik"}
              </p>
              <p className="mt-3 text-2xl font-black tracking-tight text-ink">Official only</p>
              <p className="mt-2 text-sm leading-7 text-ink/72">
                {locale === "en"
                  ? "KMK and state portals are visible on every page."
                  : "KMK und Landesportale stehen sichtbar auf jeder Seite."}
              </p>
            </article>
          </div>
        </section>
      </Reveal>
      <LinkGrid
        locale={locale}
        title={
          locale === "en"
            ? "Start the Germany product with these entries"
            : "Mit diesen Einstiegen beginnt der Deutschland-Silo"
        }
        links={[
          {
            href: localizePath(deRoutes.countryBridgesYear(2026), locale),
            label: locale === "en" ? "Bridge days Germany 2026" : "Brückentage Deutschland 2026",
            body:
              locale === "en"
                ? "The federal overview, with the strongest state-level differences surfaced first."
                : "Die föderale Übersicht mit den stärksten Länder-Unterschieden.",
          },
          {
            href: localizePath(deRoutes.countryHolidaysYear(2026), locale),
            label: locale === "en" ? "Public holidays Germany 2026" : "Feiertage Deutschland 2026",
            body:
              locale === "en"
                ? "Which holidays apply everywhere, and where states diverge."
                : "Welche Feiertage überall gelten und wo Länder abweichen.",
          },
          {
            href: localizePath(deRoutes.countrySchoolHolidaysYear(2026), locale),
            label: locale === "en" ? "School holidays Germany 2026" : "Schulferien Deutschland 2026",
            body:
              locale === "en"
                ? "The KMK reading for families and school-holiday windows."
                : "Die KMK-Lesart für Familien und Ferienfenster.",
          },
          {
            href: localizePath(deRoutes.guide("was-ist-ein-brueckentag"), locale),
            label: locale === "en" ? "What is a bridge day?" : "Was ist ein Brückentag?",
            body:
              locale === "en"
                ? "The core concept, and why in Germany it always remains state-based."
                : "Der Grundbegriff und warum er in Deutschland Land-Sache bleibt.",
          },
          {
            href: localizePath(deRoutes.guide("feiertage-nach-bundesland"), locale),
            label:
              locale === "en"
                ? "Public holidays by state explained"
                : "Feiertage nach Bundesland erklärt",
            body:
              locale === "en"
                ? "The main differences between north, south, east and west."
                : "Die wichtigsten Unterschiede zwischen Nord, Süd, Ost und West.",
          },
          {
            href: localizePath(deRoutes.guide("schulferien-deutschland"), locale),
            label:
              locale === "en"
                ? "School holidays in Germany explained"
                : "Schulferien in Deutschland erklärt",
            body:
              locale === "en"
                ? "How to read the KMK overview and what families should check first."
                : "Wie die KMK-Übersicht zu lesen ist und was Familien zuerst prüfen sollten.",
          },
        ]}
      />
      <LinkGrid
        locale={locale}
        title={
          locale === "en"
            ? "Jump directly to a state"
            : "Direkt in ein Bundesland springen"
        }
        links={links}
      />
      <OfficialSourcesBlock locale={locale} sources={germanNationalSources} />
    </PageShell>
  );
}

export function GermanyGuidePage({
  path,
  title,
  description,
  intro,
  highlights,
  sources,
  locale = "de",
}: {
  path: string;
  title: string;
  description: string;
  intro: string;
  highlights: string[];
  sources: GermanOfficialSource[];
  locale?: GermanyLocale;
}) {
  return (
    <PageShell>
      <Breadcrumbs
        items={[
          {
            name: germanyHomeLabel(locale),
            url: localizePath(deRoutes.home, locale),
          },
          {
            name: title,
            url: localizePath(path, locale),
          },
        ]}
      />
      <GermanyArticleSchema headline={title} description={description} path={path} locale={locale} />
      <ContentHero
        badge={{
          fr: locale === "en" ? "Guide" : "Ratgeber",
          en: locale === "en" ? "Guide" : "Ratgeber",
        }}
        title={{ fr: title, en: title }}
        subtitle={{ fr: description, en: description }}
        language={locale}
      />
      <Reveal>
        <section className="editorial-panel">
          <p className="editorial-kicker">{locale === "en" ? "Context" : "Einordnung"}</p>
          <p className="mt-4 editorial-lead">{intro}</p>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {highlights.map((highlight) => (
              <article key={highlight} className="rounded-4xl border border-line bg-paper p-5">
                <p className="text-base leading-7 text-ink/74">{highlight}</p>
              </article>
            ))}
          </div>
        </section>
      </Reveal>
      <OfficialSourcesBlock locale={locale} sources={sources} />
      <LinkGrid
        locale={locale}
        title={locale === "en" ? "Useful next pages" : "Sinnvolle nächste Seiten"}
        links={[
          {
            href: localizePath(deRoutes.countryBridgesYear(2026), locale),
            label: locale === "en" ? "Bridge days Germany 2026" : "Brückentage Deutschland 2026",
            body:
              locale === "en"
                ? "Move from the concept straight into concrete state and year pages."
                : "Vom Begriff direkt in konkrete Länder- und Jahresseiten springen.",
          },
          {
            href: localizePath(deRoutes.countryHolidaysYear(2026), locale),
            label: locale === "en" ? "Public holidays Germany 2026" : "Feiertage Deutschland 2026",
            body:
              locale === "en"
                ? "Read the legal markers first, then compare states."
                : "Erst die gesetzlichen Marker lesen, dann Länder vergleichen.",
          },
          {
            href: localizePath(deRoutes.countrySchoolHolidaysYear(2026), locale),
            label: locale === "en" ? "School holidays Germany 2026" : "Schulferien Deutschland 2026",
            body:
              locale === "en"
                ? "Open the KMK reading directly for family planning and holiday windows."
                : "Für Familien und Ferienfenster direkt die KMK-Lesart öffnen.",
          },
        ]}
      />
    </PageShell>
  );
}

export function GermanyCountryYearPage({
  kind,
  year,
  summary,
  sources,
  locale = "de",
}: {
  kind: "bridges" | "holidays" | "school-holidays";
  year: number;
  summary: string;
  sources: GermanOfficialSource[];
  locale?: GermanyLocale;
}) {
  const titleMap =
    locale === "en"
      ? {
          bridges: `Bridge days Germany ${year}`,
          holidays: `Public holidays Germany ${year}`,
          "school-holidays": `School holidays Germany ${year}`,
        }
      : {
          bridges: `Brückentage Deutschland ${year}`,
          holidays: `Feiertage Deutschland ${year}`,
          "school-holidays": `Schulferien Deutschland ${year}`,
        };

  const pathMap = {
    bridges: deRoutes.countryBridgesYear(year),
    holidays: deRoutes.countryHolidaysYear(year),
    "school-holidays": deRoutes.countrySchoolHolidaysYear(year),
  } as const;

  const related = germanStates.map((state) => ({
    href:
      kind === "bridges"
        ? localizePath(deRoutes.stateBridgesYear(year, state.code), locale)
        : kind === "holidays"
          ? localizePath(deRoutes.stateHolidaysYear(year, state.code), locale)
          : localizePath(deRoutes.stateSchoolHolidaysYear(year, state.code), locale),
    label:
      kind === "bridges"
        ? locale === "en"
          ? `Bridge days ${state.englishName} ${year}`
          : `Brückentage ${state.name} ${year}`
        : kind === "holidays"
          ? locale === "en"
            ? `Public holidays ${state.englishName} ${year}`
            : `Feiertage ${state.name} ${year}`
          : locale === "en"
            ? `School holidays ${state.englishName} ${year}`
            : `Schulferien ${state.name} ${year}`,
    body: locale === "en" ? state.englishNuance : state.nuance,
  }));

  return (
    <PageShell>
      <Breadcrumbs
        items={[
          {
            name: germanyHomeLabel(locale),
            url: localizePath(deRoutes.home, locale),
          },
          {
            name: titleMap[kind],
            url: localizePath(pathMap[kind], locale),
          },
        ]}
      />
      <GermanyArticleSchema headline={titleMap[kind]} description={summary} path={pathMap[kind]} locale={locale} />
      <ContentHero
        badge={{
          fr: locale === "en" ? "Germany" : "Deutschland",
          en: locale === "en" ? "Germany" : "Deutschland",
        }}
        title={{ fr: titleMap[kind], en: titleMap[kind] }}
        subtitle={{ fr: summary, en: summary }}
        language={locale}
      />
      <Reveal>
        <section className="editorial-panel">
          <p className="editorial-kicker">
            {locale === "en" ? "What to check first" : "Was Sie zuerst prüfen sollten"}
          </p>
          <div className="mt-4 editorial-grid">
            <article className="editorial-panel-muted">
              <p className="text-base leading-7 text-ink/74">
                {locale === "en"
                  ? kind === "school-holidays"
                    ? "In Germany, school holidays always need to be read through the KMK overview plus the state itself."
                    : "In Germany, planning always starts with the state first."
                  : kind === "school-holidays"
                    ? "Deutschland braucht immer den Blick über die KMK plus Bundesland."
                    : "Deutschland braucht immer erst den Blick auf das Bundesland."}
              </p>
            </article>
            <article className="editorial-panel-muted">
              <p className="text-base leading-7 text-ink/74">
                {locale === "en"
                  ? kind === "bridges"
                    ? "The strongest opportunities appear where state-level holidays and weekends align cleanly."
                    : kind === "holidays"
                      ? "The key question is not the number of holidays alone, but which ones create extra Fridays or Mondays in each state."
                      : "For families, school holidays are the second planning grid next to public holidays, not just background information."
                  : kind === "bridges"
                    ? "Die stärksten Chancen entstehen dort, wo Landes-Feiertage und Wochenenden sauber aufeinandertreffen."
                    : kind === "holidays"
                      ? "Nicht die Zahl der Feiertage zählt zuerst, sondern welche davon im jeweiligen Land zusätzliche Freitage oder Montage erzeugen."
                      : "Schulferien sind für Familien das zweite Raster neben Feiertagen, nicht bloß Begleitinformation."}
              </p>
            </article>
            <article className="editorial-panel-muted">
              <p className="text-base leading-7 text-ink/74">
                {locale === "en"
                  ? "Each state page links directly to its sibling pages so users never hit a dead end."
                  : "Jede Länderseite verlinkt direkt auf ihre Schwesterseiten, damit kein Nutzer in einer Sackgasse landet."}
              </p>
            </article>
          </div>
        </section>
      </Reveal>
      <LinkGrid
        locale={locale}
        title={locale === "en" ? "All states for this year" : "Alle Bundesländer für dieses Jahr"}
        links={related}
      />
      <OfficialSourcesBlock locale={locale} sources={sources} />
    </PageShell>
  );
}

export function GermanyStateHolidaysPage({
  state,
  year,
  holidays,
  locale = "de",
}: {
  state: GermanStateCode;
  year: number;
  holidays: GermanHoliday[];
  locale?: GermanyLocale;
}) {
  const meta = germanStateMap[state];
  const displayState = stateName(state, locale);
  const path = deRoutes.stateHolidaysYear(year, state);
  const nationwideCount = holidays.filter((holiday) => holiday.nationwide).length;

  return (
    <PageShell>
      <Breadcrumbs
        items={[
          {
            name: germanyHomeLabel(locale),
            url: localizePath(deRoutes.home, locale),
          },
          {
            name: locale === "en" ? `Public holidays Germany ${year}` : `Feiertage Deutschland ${year}`,
            url: localizePath(deRoutes.countryHolidaysYear(year), locale),
          },
          {
            name: locale === "en" ? `Public holidays ${displayState} ${year}` : `Feiertage ${displayState} ${year}`,
            url: localizePath(path, locale),
          },
        ]}
      />
      <GermanyArticleSchema
        headline={locale === "en" ? `Public holidays ${displayState} ${year}` : `Feiertage ${displayState} ${year}`}
        description={
          locale === "en"
            ? `All state-relevant public holidays in ${displayState} for ${year}, with official context and direct links to related pages.`
            : `Alle landesweit relevanten Feiertage in ${displayState} ${year} mit offiziellem Kontext und sauberem Vergleich zu den Schwesterseiten.`
        }
        path={path}
        locale={locale}
      />
      <ContentHero
        badge={{
          fr: locale === "en" ? "Public holidays" : "Feiertage",
          en: locale === "en" ? "Public holidays" : "Feiertage",
        }}
        title={{
          fr: locale === "en" ? `Public holidays ${displayState} ${year}` : `Feiertage ${displayState} ${year}`,
          en: locale === "en" ? `Public holidays ${displayState} ${year}` : `Feiertage ${displayState} ${year}`,
        }}
        subtitle={{
          fr:
            locale === "en"
              ? `The public-holiday calendar in ${displayState} for ${year}, including state-specific differences and official context.`
              : `Die Feiertagslage in ${displayState} ${year}, inklusive Land-Besonderheiten und offizieller Einordnung.`,
          en:
            locale === "en"
              ? `The public-holiday calendar in ${displayState} for ${year}, including state-specific differences and official context.`
              : `Die Feiertagslage in ${displayState} ${year}, inklusive Land-Besonderheiten und offizieller Einordnung.`,
        }}
        language={locale}
      />
      <Reveal>
        <section className="editorial-panel space-y-5">
          <p className="editorial-kicker">
            {locale === "en" ? "Why this state differs" : "Warum dieses Bundesland anders ist"}
          </p>
          <p className="editorial-lead">{locale === "en" ? meta.englishNuance : meta.nuance}</p>
          <div className="editorial-grid">
            <article className="editorial-panel-muted">
              <p className="editorial-kicker">{locale === "en" ? "Total" : "Gesamtzahl"}</p>
              <p className="mt-3 text-4xl font-black tracking-tight text-ink">{holidays.length}</p>
            </article>
            <article className="editorial-panel-muted">
              <p className="editorial-kicker">{locale === "en" ? "Nationwide" : "Bundeseinheitlich"}</p>
              <p className="mt-3 text-4xl font-black tracking-tight text-ink">{nationwideCount}</p>
            </article>
            <article className="editorial-panel-muted">
              <p className="editorial-kicker">{locale === "en" ? "State-specific" : "Landesspezifisch"}</p>
              <p className="mt-3 text-4xl font-black tracking-tight text-ink">{holidays.length - nationwideCount}</p>
            </article>
          </div>
        </section>
      </Reveal>
      <Reveal>
        <section className="editorial-panel">
          <h2 className="text-3xl font-black tracking-tight text-ink">
            {locale === "en" ? "All state-relevant public holidays" : "Alle landesweit relevanten Feiertage"}
          </h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {holidays.map((holiday) => (
              <article key={`${holiday.id}-${holiday.date.toISOString()}`} className="rounded-4xl border border-line bg-paper p-5">
                <p className="editorial-kicker">
                  {holiday.nationwide
                    ? locale === "en"
                      ? "Nationwide"
                      : "Bundesweit"
                    : locale === "en"
                      ? "State-specific"
                      : "Landesspezifisch"}
                </p>
                <h3 className="mt-3 text-2xl font-black tracking-tight text-ink">{holiday.name}</h3>
                <p className="mt-3 text-base leading-7 text-ink/74">{formatFullDate(holiday.date, locale)}</p>
              </article>
            ))}
          </div>
        </section>
      </Reveal>
      <OfficialSourcesBlock locale={locale} sources={[meta.holidaySource]} />
      <LinkGrid
        locale={locale}
        title={locale === "en" ? "Useful next pages" : "Nächste sinnvolle Seiten"}
        links={[
          {
            href: localizePath(deRoutes.stateBridgesYear(year, state), locale),
            label: locale === "en" ? `Bridge days ${displayState} ${year}` : `Brückentage ${displayState} ${year}`,
            body:
              locale === "en"
                ? "The same holiday base, reframed as concrete bridge opportunities."
                : "Die gleiche Feiertagsbasis als konkrete Brückentag-Lesart.",
          },
          {
            href: localizePath(deRoutes.stateSchoolHolidaysYear(year, state), locale),
            label: locale === "en" ? `School holidays ${displayState} ${year}` : `Schulferien ${displayState} ${year}`,
            body:
              locale === "en"
                ? "Place the KMK and family-planning reading right next to the public-holiday view."
                : "Die KMK- und Ferienlogik für Familien direkt danebenlegen.",
          },
          {
            href: localizePath(deRoutes.stateHolidaysYear(cycleYear(year), state), locale),
            label:
              locale === "en"
                ? `Public holidays ${displayState} ${cycleYear(year)}`
                : `Feiertage ${displayState} ${cycleYear(year)}`,
            body:
              locale === "en"
                ? "Compare the next year with the same state logic."
                : "Das Folgejahr direkt mit derselben Länderlogik vergleichen.",
          },
        ]}
      />
    </PageShell>
  );
}

export function GermanyStateBridgesPage({
  state,
  year,
  opportunities,
  locale = "de",
}: {
  state: GermanStateCode;
  year: number;
  opportunities: GermanBridgeOpportunity[];
  locale?: GermanyLocale;
}) {
  const meta = germanStateMap[state];
  const displayState = stateName(state, locale);
  const highlights = getStatePageHighlights(state, locale);

  return (
    <PageShell>
      <Breadcrumbs
        items={[
          {
            name: germanyHomeLabel(locale),
            url: localizePath(deRoutes.home, locale),
          },
          {
            name: locale === "en" ? `Bridge days Germany ${year}` : `Brückentage Deutschland ${year}`,
            url: localizePath(deRoutes.countryBridgesYear(year), locale),
          },
          {
            name: locale === "en" ? `Bridge days ${displayState} ${year}` : `Brückentage ${displayState} ${year}`,
            url: localizePath(deRoutes.stateBridgesYear(year, state), locale),
          },
        ]}
      />
      <GermanyArticleSchema
        headline={locale === "en" ? `Bridge days ${displayState} ${year}` : `Brückentage ${displayState} ${year}`}
        description={
          locale === "en"
            ? `The strongest bridge-day opportunities in ${displayState} for ${year}, grounded in official public-holiday data and linked to the right next pages.`
            : `Die stärksten Brückentage in ${displayState} ${year} mit Fokus auf offizielle Feiertagsgrundlage und saubere interne Navigation.`
        }
        path={deRoutes.stateBridgesYear(year, state)}
        locale={locale}
      />
      <ContentHero
        badge={{
          fr: locale === "en" ? "Bridge days" : "Brückentage",
          en: locale === "en" ? "Bridge days" : "Brückentage",
        }}
        title={{
          fr: locale === "en" ? `Bridge days ${displayState} ${year}` : `Brückentage ${displayState} ${year}`,
          en: locale === "en" ? `Bridge days ${displayState} ${year}` : `Brückentage ${displayState} ${year}`,
        }}
        subtitle={{
          fr:
            locale === "en"
              ? `Which holidays in ${displayState} for ${year} create real bridge-day opportunities, and where this state diverges from the national average.`
              : `Welche Feiertage in ${displayState} ${year} echte Brückentag-Chancen eröffnen und wo sich der Kalender vom Bundesschnitt löst.`,
          en:
            locale === "en"
              ? `Which holidays in ${displayState} for ${year} create real bridge-day opportunities, and where this state diverges from the national average.`
              : `Welche Feiertage in ${displayState} ${year} echte Brückentag-Chancen eröffnen und wo sich der Kalender vom Bundesschnitt löst.`,
        }}
        language={locale}
      />
      <Reveal>
        <section className="editorial-panel">
          <p className="editorial-kicker">
            {locale === "en" ? "What to check first" : "Was Sie zuerst prüfen sollten"}
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {highlights.map((highlight) => (
              <article key={highlight} className="rounded-4xl border border-line bg-paper p-5">
                <p className="text-base leading-7 text-ink/74">{highlight}</p>
              </article>
            ))}
          </div>
        </section>
      </Reveal>
      <Reveal>
        <section className="editorial-panel">
          <h2 className="text-3xl font-black tracking-tight text-ink">
            {locale === "en" ? "Strongest bridge opportunities first" : "Die stärksten Brückentage zuerst"}
          </h2>
          <div className="mt-6 space-y-4">
            {opportunities.slice(0, 8).map((opportunity) => (
              <article key={`${opportunity.holiday.id}-${opportunity.holiday.date.toISOString()}`} className="rounded-4xl border border-line bg-paper p-6">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="editorial-kicker">{opportunity.label}</p>
                    <h3 className="mt-3 text-2xl font-black tracking-tight text-ink">{opportunity.holiday.name}</h3>
                    <p className="mt-3 text-base leading-7 text-ink/74">{formatFullDate(opportunity.holiday.date, locale)}</p>
                  </div>
                  <div className="rounded-3xl bg-white px-4 py-3 shadow-card">
                    <p className="text-sm font-bold uppercase tracking-[0.18em] text-coral">
                      {locale === "en" ? "Outcome" : "Ergebnis"}
                    </p>
                    <p className="mt-2 text-3xl font-black tracking-tight text-ink">{opportunity.totalDaysOff}</p>
                    <p className="text-sm text-ink/64">{locale === "en" ? "days off" : "Tage frei"}</p>
                  </div>
                </div>
                <p className="mt-4 text-sm leading-7 text-ink/72">
                  {opportunity.vacationDaysNeeded === 0
                    ? locale === "en"
                      ? "No additional leave day required."
                      : "Kein zusätzlicher Urlaubstag nötig."
                    : locale === "en"
                      ? `${opportunity.vacationDaysNeeded} leave day${opportunity.vacationDaysNeeded > 1 ? "s" : ""} recommended: ${opportunity.recommendedLeaveDates.map((date) => formatFullDate(date, locale)).join(", ")}.`
                      : `${opportunity.vacationDaysNeeded} Urlaubstag${opportunity.vacationDaysNeeded > 1 ? "e" : ""} empfohlen: ${opportunity.recommendedLeaveDates.map((date) => formatFullDate(date, locale)).join(", ")}.`}
                </p>
              </article>
            ))}
          </div>
        </section>
      </Reveal>
      <OfficialSourcesBlock locale={locale} sources={[meta.holidaySource]} />
      <LinkGrid
        locale={locale}
        title={locale === "en" ? "Useful next pages" : "Nächste sinnvolle Seiten"}
        links={[
          {
            href: localizePath(deRoutes.stateHolidaysYear(year, state), locale),
            label: locale === "en" ? `Public holidays ${displayState} ${year}` : `Feiertage ${displayState} ${year}`,
            body:
              locale === "en"
                ? "See the legal holiday base behind these bridge opportunities in full."
                : "Die gesetzliche Basis hinter den Brückentagen im Vollbild sehen.",
          },
          {
            href: localizePath(deRoutes.stateSchoolHolidaysYear(year, state), locale),
            label: locale === "en" ? `School holidays ${displayState} ${year}` : `Schulferien ${displayState} ${year}`,
            body:
              locale === "en"
                ? "Check whether school-holiday windows amplify or limit the bridge opportunities for families."
                : "Prüfen, ob Ferienfenster Familien-Brücken verstärken oder relativieren.",
          },
          {
            href: localizePath(deRoutes.stateBridgesYear(cycleYear(year), state), locale),
            label:
              locale === "en"
                ? `Bridge days ${displayState} ${cycleYear(year)}`
                : `Brückentage ${displayState} ${cycleYear(year)}`,
            body:
              locale === "en"
                ? "Compare the next year with the same state logic."
                : "Das Folgejahr direkt mit derselben Länderlogik vergleichen.",
          },
        ]}
      />
    </PageShell>
  );
}

export function GermanyStateSchoolHolidaysPage({
  state,
  year,
  periods,
  locale = "de",
}: {
  state: GermanStateCode;
  year: number;
  periods: GermanSchoolHolidayPeriod[];
  locale?: GermanyLocale;
}) {
  const meta = germanStateMap[state];
  const displayState = stateName(state, locale);

  return (
    <PageShell>
      <Breadcrumbs
        items={[
          {
            name: germanyHomeLabel(locale),
            url: localizePath(deRoutes.home, locale),
          },
          {
            name: locale === "en" ? `School holidays Germany ${year}` : `Schulferien Deutschland ${year}`,
            url: localizePath(deRoutes.countrySchoolHolidaysYear(year), locale),
          },
          {
            name: locale === "en" ? `School holidays ${displayState} ${year}` : `Schulferien ${displayState} ${year}`,
            url: localizePath(deRoutes.stateSchoolHolidaysYear(year, state), locale),
          },
        ]}
      />
      <GermanyArticleSchema
        headline={locale === "en" ? `School holidays ${displayState} ${year}` : `Schulferien ${displayState} ${year}`}
        description={
          locale === "en"
            ? `The visible school-holiday windows in ${displayState} for ${year}, with KMK sourcing and a clear family-planning reading.`
            : `Die schulischen Ferienfenster in ${displayState} ${year} mit KMK-Quelle und klarer Einordnung für Familien.`
        }
        path={deRoutes.stateSchoolHolidaysYear(year, state)}
        locale={locale}
      />
      <ContentHero
        badge={{
          fr: locale === "en" ? "School holidays" : "Schulferien",
          en: locale === "en" ? "School holidays" : "Schulferien",
        }}
        title={{
          fr: locale === "en" ? `School holidays ${displayState} ${year}` : `Schulferien ${displayState} ${year}`,
          en: locale === "en" ? `School holidays ${displayState} ${year}` : `Schulferien ${displayState} ${year}`,
        }}
        subtitle={{
          fr:
            locale === "en"
              ? `The visible school-holiday windows in ${displayState} for ${year}, read directly through the KMK logic.`
              : `Die sichtbaren Ferienfenster in ${displayState} ${year}, direkt aus der KMK-Logik gelesen.`,
          en:
            locale === "en"
              ? `The visible school-holiday windows in ${displayState} for ${year}, read directly through the KMK logic.`
              : `Die sichtbaren Ferienfenster in ${displayState} ${year}, direkt aus der KMK-Logik gelesen.`,
        }}
        language={locale}
      />
      <Reveal>
        <section className="editorial-panel">
          <p className="editorial-kicker">
            {locale === "en" ? "Why this state differs" : "Warum dieses Bundesland anders ist"}
          </p>
          <p className="mt-4 editorial-lead">
            {locale === "en"
              ? `In Germany, school holidays always have to be read state by state. ${meta.englishNuance}`
              : `Schulferien müssen in Deutschland immer nach Bundesland gelesen werden. ${meta.nuance}`}
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <article className="editorial-panel-muted">
              <p className="editorial-kicker">{locale === "en" ? "Visible periods" : "Zeiträume sichtbar"}</p>
              <p className="mt-3 text-4xl font-black tracking-tight text-ink">{periods.length}</p>
            </article>
            <article className="editorial-panel-muted">
              <p className="editorial-kicker">{locale === "en" ? "Source" : "Quelle"}</p>
              <p className="mt-3 text-2xl font-black tracking-tight text-ink">KMK</p>
            </article>
            <article className="editorial-panel-muted">
              <p className="editorial-kicker">{locale === "en" ? "Family focus" : "Familienfokus"}</p>
              <p className="mt-3 text-sm leading-7 text-ink/72">
                {locale === "en"
                  ? "Holiday windows are framed here as a planning grid, not just as a raw table."
                  : "Ferienfenster sind hier bewusst als Entscheidungsraster und nicht als bloße Tabelle aufbereitet."}
              </p>
            </article>
          </div>
        </section>
      </Reveal>
      <Reveal>
        <section className="editorial-panel">
          <h2 className="text-3xl font-black tracking-tight text-ink">
            {locale === "en" ? "All visible school-holiday windows" : "Alle sichtbaren Ferienfenster"}
          </h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {periods.map((period) => (
              <article key={`${period.label}-${period.startDate.toISOString()}`} className="rounded-4xl border border-line bg-paper p-5">
                <p className="editorial-kicker">{period.schoolYear}</p>
                <h3 className="mt-3 text-2xl font-black tracking-tight text-ink">{period.label}</h3>
                <p className="mt-3 text-base leading-7 text-ink/74">{formatShortRange(period.startDate, period.endDate, locale)}</p>
              </article>
            ))}
          </div>
        </section>
      </Reveal>
      <OfficialSourcesBlock locale={locale} sources={[meta.schoolSource]} />
      <LinkGrid
        locale={locale}
        title={locale === "en" ? "Useful next pages" : "Nächste sinnvolle Seiten"}
        links={[
          {
            href: localizePath(deRoutes.stateBridgesYear(year, state), locale),
            label: locale === "en" ? `Bridge days ${displayState} ${year}` : `Brückentage ${displayState} ${year}`,
            body:
              locale === "en"
                ? "Check which bridge opportunities combine cleanly with school-holiday windows."
                : "Prüfen, welche Brückentage sich mit Ferienfenstern sauber kombinieren lassen.",
          },
          {
            href: localizePath(deRoutes.stateHolidaysYear(year, state), locale),
            label: locale === "en" ? `Public holidays ${displayState} ${year}` : `Feiertage ${displayState} ${year}`,
            body:
              locale === "en"
                ? "Read the legal holiday markers behind the family-planning windows."
                : "Die gesetzlichen Marker hinter den Familienfenstern direkt daneben lesen.",
          },
          {
            href: localizePath(deRoutes.stateSchoolHolidaysYear(cycleYear(year), state), locale),
            label:
              locale === "en"
                ? `School holidays ${displayState} ${cycleYear(year)}`
                : `Schulferien ${displayState} ${cycleYear(year)}`,
            body:
              locale === "en"
                ? "Compare the next year without leaving the product context."
                : "Das Folgejahr ohne Produktwechsel vergleichen.",
          },
        ]}
      />
    </PageShell>
  );
}
