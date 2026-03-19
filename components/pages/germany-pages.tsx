import Link from "next/link";
import Script from "next/script";
import { ContentHero } from "@/components/content/content-hero";
import { PageShell } from "@/components/content/page-shell";
import { Reveal } from "@/components/motion/reveal";
import type {
  GermanBridgeOpportunity,
} from "@/lib/germany/holidays";
import type {
  GermanHoliday,
  GermanOfficialSource,
  GermanSchoolHolidayPeriod,
  GermanStateCode,
} from "@/lib/domain/types";
import { germanNationalSources, getStatePageHighlights } from "@/lib/germany/content";
import { deRoutes, toGermanyExternalPath } from "@/lib/germany/routes";
import { germanyBaseUrl } from "@/lib/germany/seo";
import { germanStateMap, germanStates } from "@/lib/germany/states";
import { formatFullDate, formatShortRange } from "@/lib/formatting";

function OfficialSourcesBlock({
  title = "Offizielle Quellen",
  sources,
}: {
  title?: string;
  sources: GermanOfficialSource[];
}) {
  return (
    <Reveal>
      <section className="editorial-panel">
        <p className="editorial-kicker">Offizielle Quellen</p>
        <h2 className="mt-3 text-3xl font-black tracking-tight text-ink">{title}</h2>
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
                {source.label ?? "Offiziell"}
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
  title,
  links,
}: {
  title: string;
  links: { href: string; label: string; body: string }[];
}) {
  return (
    <Reveal>
      <section className="editorial-panel">
        <p className="editorial-kicker">Nächste sinnvolle Seiten</p>
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

function GermanyArticleSchema({ headline, description, path }: { headline: string; description: string; path: string }) {
  const externalPath = toGermanyExternalPath(path);
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    description,
    inLanguage: "de-DE",
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
      id={`de-schema-${path}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function GermanyHomePage() {
  const links = germanStates.flatMap((state) => [
    {
      href: deRoutes.stateBridgesYear(2026, state.code),
      label: `Brückentage ${state.name} 2026`,
      body: `Die wichtigsten Brückentage im ${state.name}-Kalender 2026 mit offiziellem Quellenblock.`,
    },
  ]);

  return (
    <PageShell>
      <GermanyArticleSchema
        headline="Brückentage, Feiertage und Schulferien in Deutschland"
        description="Der Deutschland-Einstieg für Brückentage, Feiertage und Schulferien nach Bundesland."
        path="/de"
      />
      <ContentHero
        badge={{ fr: "Deutschland", en: "Germany" }}
        title={{ fr: "Deutschland", en: "Deutschland" }}
        subtitle={{
          fr: "Brückentage, Feiertage und Schulferien nach Bundesland mit Fokus auf offizielle Quellen.",
          en: "Brückentage, Feiertage und Schulferien nach Bundesland mit Fokus auf offizielle Quellen.",
        }}
        language="de"
      />
      <Reveal>
        <section className="editorial-panel space-y-5">
          <p className="editorial-kicker">Deutschland-Produkt</p>
          <h1 className="text-4xl font-black tracking-tight text-ink">Brückentage, Feiertage und Schulferien nach Bundesland</h1>
          <p className="editorial-lead">
            Deutschland braucht kein übersetztes Frankreich-Produkt, sondern ein eigenes Modell. Feiertage und Schulferien laufen föderal, deshalb ist jedes Bundesland ein eigener Einstieg.
          </p>
          <div className="editorial-grid">
            <article className="editorial-panel-muted">
              <p className="editorial-kicker">Bundesländer</p>
              <p className="mt-3 text-4xl font-black tracking-tight text-ink">16</p>
              <p className="mt-2 text-sm leading-7 text-ink/72">Alle Länder sind im v1 als eigene SEO-Oberfläche abgedeckt.</p>
            </article>
            <article className="editorial-panel-muted">
              <p className="editorial-kicker">Jahre</p>
              <p className="mt-3 text-4xl font-black tracking-tight text-ink">2026–2027</p>
              <p className="mt-2 text-sm leading-7 text-ink/72">Der erste Rollout deckt beide Jahre vollständig ab.</p>
            </article>
            <article className="editorial-panel-muted">
              <p className="editorial-kicker">Quellenpolitik</p>
              <p className="mt-3 text-2xl font-black tracking-tight text-ink">Official only</p>
              <p className="mt-2 text-sm leading-7 text-ink/72">KMK und Landesportale stehen sichtbar auf jeder Seite.</p>
            </article>
          </div>
        </section>
      </Reveal>
      <LinkGrid title="Mit diesen Einstiegen beginnt der Deutschland-Silo" links={[
        { href: deRoutes.countryBridgesYear(2026), label: "Brückentage Deutschland 2026", body: "Die föderale Übersicht mit den stärksten Länder-Unterschieden." },
        { href: deRoutes.countryHolidaysYear(2026), label: "Feiertage Deutschland 2026", body: "Welche Feiertage überall gelten und wo Länder abweichen." },
        { href: deRoutes.countrySchoolHolidaysYear(2026), label: "Schulferien Deutschland 2026", body: "Die KMK-Lesart für Familien und Ferienfenster." },
        { href: deRoutes.guide("was-ist-ein-brueckentag"), label: "Was ist ein Brückentag?", body: "Der Grundbegriff und warum er in Deutschland Land-Sache bleibt." },
        { href: deRoutes.guide("feiertage-nach-bundesland"), label: "Feiertage nach Bundesland erklärt", body: "Die wichtigsten Unterschiede zwischen Nord, Süd, Ost und West." },
        { href: deRoutes.guide("schulferien-deutschland"), label: "Schulferien in Deutschland erklärt", body: "Wie die KMK-Übersicht zu lesen ist und was Familien zuerst prüfen sollten." },
      ]} />
      <LinkGrid title="Direkt in ein Bundesland springen" links={links} />
      <OfficialSourcesBlock sources={germanNationalSources} />
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
}: {
  path: string;
  title: string;
  description: string;
  intro: string;
  highlights: string[];
  sources: GermanOfficialSource[];
}) {
  return (
    <PageShell>
      <GermanyArticleSchema headline={title} description={description} path={path} />
      <ContentHero
        badge={{ fr: "Ratgeber", en: "Guide" }}
        title={{ fr: title, en: title }}
        subtitle={{ fr: description, en: description }}
        language="de"
      />
      <Reveal>
        <section className="editorial-panel">
          <p className="editorial-kicker">Einordnung</p>
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
      <OfficialSourcesBlock sources={sources} />
      <LinkGrid
        title="Sinnvolle nächste Seiten"
        links={[
          { href: deRoutes.countryBridgesYear(2026), label: "Brückentage Deutschland 2026", body: "Vom Begriff direkt in konkrete Länder- und Jahresseiten springen." },
          { href: deRoutes.countryHolidaysYear(2026), label: "Feiertage Deutschland 2026", body: "Erst die gesetzlichen Marker lesen, dann Länder vergleichen." },
          { href: deRoutes.countrySchoolHolidaysYear(2026), label: "Schulferien Deutschland 2026", body: "Für Familien und Ferienfenster direkt die KMK-Lesart öffnen." },
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
}: {
  kind: "bridges" | "holidays" | "school-holidays";
  year: number;
  summary: string;
  sources: GermanOfficialSource[];
}) {
  const titleMap = {
    bridges: `Brückentage Deutschland ${year}`,
    holidays: `Feiertage Deutschland ${year}`,
    "school-holidays": `Schulferien Deutschland ${year}`,
  } as const;

  const pathMap = {
    bridges: deRoutes.countryBridgesYear(year),
    holidays: deRoutes.countryHolidaysYear(year),
    "school-holidays": deRoutes.countrySchoolHolidaysYear(year),
  } as const;

  const related = germanStates.map((state) => ({
    href:
      kind === "bridges"
        ? deRoutes.stateBridgesYear(year, state.code)
        : kind === "holidays"
          ? deRoutes.stateHolidaysYear(year, state.code)
          : deRoutes.stateSchoolHolidaysYear(year, state.code),
    label: `${titleMap[kind].split(" ")[0]} ${state.name} ${year}`,
    body: state.nuance,
  }));

  return (
    <PageShell>
      <GermanyArticleSchema headline={titleMap[kind]} description={summary} path={pathMap[kind]} />
      <ContentHero
        badge={{ fr: "Deutschland", en: "Germany" }}
        title={{ fr: titleMap[kind], en: titleMap[kind] }}
        subtitle={{ fr: summary, en: summary }}
        language="de"
      />
      <Reveal>
        <section className="editorial-panel">
          <p className="editorial-kicker">Was Sie zuerst prüfen sollten</p>
          <div className="mt-4 editorial-grid">
            <article className="editorial-panel-muted">
              <p className="text-base leading-7 text-ink/74">
                Deutschland braucht {kind === "school-holidays" ? "immer den Blick über die KMK plus Bundesland." : "immer erst den Blick auf das Bundesland."}
              </p>
            </article>
            <article className="editorial-panel-muted">
              <p className="text-base leading-7 text-ink/74">
                {kind === "bridges"
                  ? "Die stärksten Chancen entstehen dort, wo Landes-Feiertage und Wochenenden sauber aufeinandertreffen."
                  : kind === "holidays"
                    ? "Nicht die Zahl der Feiertage zählt zuerst, sondern welche davon im jeweiligen Land zusätzliche Freitage oder Montage erzeugen."
                    : "Schulferien sind für Familien das zweite Raster neben Feiertagen, nicht bloß Begleitinformation."}
              </p>
            </article>
            <article className="editorial-panel-muted">
              <p className="text-base leading-7 text-ink/74">
                Jede Länderseite verlinkt direkt auf ihre Schwesterseiten, damit kein Nutzer in einer Sackgasse landet.
              </p>
            </article>
          </div>
        </section>
      </Reveal>
      <LinkGrid title="Alle Bundesländer für dieses Jahr" links={related} />
      <OfficialSourcesBlock sources={sources} />
    </PageShell>
  );
}

export function GermanyStateHolidaysPage({
  state,
  year,
  holidays,
}: {
  state: GermanStateCode;
  year: number;
  holidays: GermanHoliday[];
}) {
  const meta = germanStateMap[state];
  const path = deRoutes.stateHolidaysYear(year, state);
  const nationwideCount = holidays.filter((holiday) => holiday.nationwide).length;

  return (
    <PageShell>
      <GermanyArticleSchema
        headline={`Feiertage ${meta.name} ${year}`}
        description={`Alle landesweit relevanten Feiertage in ${meta.name} ${year} mit offiziellem Kontext und sauberem Vergleich zu den Schwesterseiten.`}
        path={path}
      />
      <ContentHero
        badge={{ fr: "Feiertage", en: "Holidays" }}
        title={{ fr: `Feiertage ${meta.name} ${year}`, en: `Feiertage ${meta.name} ${year}` }}
        subtitle={{
          fr: `Die Feiertagslage in ${meta.name} ${year}, inklusive Land-Besonderheiten und offizieller Einordnung.`,
          en: `Die Feiertagslage in ${meta.name} ${year}, inklusive Land-Besonderheiten und offizieller Einordnung.`,
        }}
        language="de"
      />
      <Reveal>
        <section className="editorial-panel space-y-5">
          <p className="editorial-kicker">Warum dieses Bundesland anders ist</p>
          <p className="editorial-lead">{meta.nuance}</p>
          <div className="editorial-grid">
            <article className="editorial-panel-muted">
              <p className="editorial-kicker">Gesamtzahl</p>
              <p className="mt-3 text-4xl font-black tracking-tight text-ink">{holidays.length}</p>
            </article>
            <article className="editorial-panel-muted">
              <p className="editorial-kicker">Bundeseinheitlich</p>
              <p className="mt-3 text-4xl font-black tracking-tight text-ink">{nationwideCount}</p>
            </article>
            <article className="editorial-panel-muted">
              <p className="editorial-kicker">Landesspezifisch</p>
              <p className="mt-3 text-4xl font-black tracking-tight text-ink">{holidays.length - nationwideCount}</p>
            </article>
          </div>
        </section>
      </Reveal>
      <Reveal>
        <section className="editorial-panel">
          <h2 className="text-3xl font-black tracking-tight text-ink">Alle landesweit relevanten Feiertage</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {holidays.map((holiday) => (
              <article key={`${holiday.id}-${holiday.date.toISOString()}`} className="rounded-4xl border border-line bg-paper p-5">
                <p className="editorial-kicker">{holiday.nationwide ? "Bundesweit" : "Landesspezifisch"}</p>
                <h3 className="mt-3 text-2xl font-black tracking-tight text-ink">{holiday.name}</h3>
                <p className="mt-3 text-base leading-7 text-ink/74">{formatFullDate(holiday.date, "de")}</p>
              </article>
            ))}
          </div>
        </section>
      </Reveal>
      <OfficialSourcesBlock sources={[meta.holidaySource]} />
      <LinkGrid
        title="Nächste sinnvolle Seiten"
        links={[
          {
            href: deRoutes.stateBridgesYear(year, state),
            label: `Brückentage ${meta.name} ${year}`,
            body: "Die gleiche Feiertagsbasis als konkrete Brückentag-Lesart.",
          },
          {
            href: deRoutes.stateSchoolHolidaysYear(year, state),
            label: `Schulferien ${meta.name} ${year}`,
            body: "Die KMK- und Ferienlogik für Familien direkt danebenlegen.",
          },
          {
            href: deRoutes.stateHolidaysYear(year === 2026 ? 2027 : 2026, state),
            label: `Feiertage ${meta.name} ${year === 2026 ? 2027 : 2026}`,
            body: "Das Folgejahr direkt mit derselben Länderlogik vergleichen.",
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
}: {
  state: GermanStateCode;
  year: number;
  opportunities: GermanBridgeOpportunity[];
}) {
  const meta = germanStateMap[state];
  const highlights = getStatePageHighlights(state);

  return (
    <PageShell>
      <GermanyArticleSchema
        headline={`Brückentage ${meta.name} ${year}`}
        description={`Die stärksten Brückentage in ${meta.name} ${year} mit Fokus auf offizielle Feiertagsgrundlage und saubere interne Navigation.`}
        path={deRoutes.stateBridgesYear(year, state)}
      />
      <ContentHero
        badge={{ fr: "Brückentage", en: "Bridges" }}
        title={{ fr: `Brückentage ${meta.name} ${year}`, en: `Brückentage ${meta.name} ${year}` }}
        subtitle={{
          fr: `Welche Feiertage in ${meta.name} ${year} echte Brückentag-Chancen eröffnen und wo sich der Kalender vom Bundesschnitt löst.`,
          en: `Welche Feiertage in ${meta.name} ${year} echte Brückentag-Chancen eröffnen und wo sich der Kalender vom Bundesschnitt löst.`,
        }}
        language="de"
      />
      <Reveal>
        <section className="editorial-panel">
          <p className="editorial-kicker">Was Sie zuerst prüfen sollten</p>
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
          <h2 className="text-3xl font-black tracking-tight text-ink">Die stärksten Brückentage zuerst</h2>
          <div className="mt-6 space-y-4">
            {opportunities.slice(0, 8).map((opportunity) => (
              <article key={`${opportunity.holiday.id}-${opportunity.holiday.date.toISOString()}`} className="rounded-4xl border border-line bg-paper p-6">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="editorial-kicker">{opportunity.label}</p>
                    <h3 className="mt-3 text-2xl font-black tracking-tight text-ink">{opportunity.holiday.name}</h3>
                    <p className="mt-3 text-base leading-7 text-ink/74">{formatFullDate(opportunity.holiday.date, "de")}</p>
                  </div>
                  <div className="rounded-3xl bg-white px-4 py-3 shadow-card">
                    <p className="text-sm font-bold uppercase tracking-[0.18em] text-coral">Ergebnis</p>
                    <p className="mt-2 text-3xl font-black tracking-tight text-ink">{opportunity.totalDaysOff}</p>
                    <p className="text-sm text-ink/64">Tage frei</p>
                  </div>
                </div>
                <p className="mt-4 text-sm leading-7 text-ink/72">
                  {opportunity.vacationDaysNeeded === 0
                    ? "Kein zusätzlicher Urlaubstag nötig."
                    : `${opportunity.vacationDaysNeeded} Urlaubstag${opportunity.vacationDaysNeeded > 1 ? "e" : ""} empfohlen: ${opportunity.recommendedLeaveDates.map((date) => formatFullDate(date, "de")).join(", ")}.`}
                </p>
              </article>
            ))}
          </div>
        </section>
      </Reveal>
      <OfficialSourcesBlock sources={[meta.holidaySource]} />
      <LinkGrid
        title="Nächste sinnvolle Seiten"
        links={[
          {
            href: deRoutes.stateHolidaysYear(year, state),
            label: `Feiertage ${meta.name} ${year}`,
            body: "Die gesetzliche Basis hinter den Brückentagen im Vollbild sehen.",
          },
          {
            href: deRoutes.stateSchoolHolidaysYear(year, state),
            label: `Schulferien ${meta.name} ${year}`,
            body: "Prüfen, ob Ferienfenster Familien-Brücken verstärken oder relativieren.",
          },
          {
            href: deRoutes.stateBridgesYear(year === 2026 ? 2027 : 2026, state),
            label: `Brückentage ${meta.name} ${year === 2026 ? 2027 : 2026}`,
            body: "Das Folgejahr direkt mit derselben Länderlogik vergleichen.",
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
}: {
  state: GermanStateCode;
  year: number;
  periods: GermanSchoolHolidayPeriod[];
}) {
  const meta = germanStateMap[state];

  return (
    <PageShell>
      <GermanyArticleSchema
        headline={`Schulferien ${meta.name} ${year}`}
        description={`Die schulischen Ferienfenster in ${meta.name} ${year} mit KMK-Quelle und klarer Einordnung für Familien.`}
        path={deRoutes.stateSchoolHolidaysYear(year, state)}
      />
      <ContentHero
        badge={{ fr: "Schulferien", en: "School holidays" }}
        title={{ fr: `Schulferien ${meta.name} ${year}`, en: `Schulferien ${meta.name} ${year}` }}
        subtitle={{
          fr: `Die sichtbaren Ferienfenster in ${meta.name} ${year}, direkt aus der KMK-Logik gelesen.`,
          en: `Die sichtbaren Ferienfenster in ${meta.name} ${year}, direkt aus der KMK-Logik gelesen.`,
        }}
        language="de"
      />
      <Reveal>
        <section className="editorial-panel">
          <p className="editorial-kicker">Warum dieses Bundesland anders ist</p>
          <p className="mt-4 editorial-lead">
            Schulferien müssen in Deutschland immer nach Bundesland gelesen werden. {meta.nuance}
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <article className="editorial-panel-muted">
              <p className="editorial-kicker">Zeiträume sichtbar</p>
              <p className="mt-3 text-4xl font-black tracking-tight text-ink">{periods.length}</p>
            </article>
            <article className="editorial-panel-muted">
              <p className="editorial-kicker">Quelle</p>
              <p className="mt-3 text-2xl font-black tracking-tight text-ink">KMK</p>
            </article>
            <article className="editorial-panel-muted">
              <p className="editorial-kicker">Familienfokus</p>
              <p className="mt-3 text-sm leading-7 text-ink/72">Ferienfenster sind hier bewusst als Entscheidungsraster und nicht als bloße Tabelle aufbereitet.</p>
            </article>
          </div>
        </section>
      </Reveal>
      <Reveal>
        <section className="editorial-panel">
          <h2 className="text-3xl font-black tracking-tight text-ink">Alle sichtbaren Ferienfenster</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {periods.map((period) => (
              <article key={`${period.label}-${period.startDate.toISOString()}`} className="rounded-4xl border border-line bg-paper p-5">
                <p className="editorial-kicker">{period.schoolYear}</p>
                <h3 className="mt-3 text-2xl font-black tracking-tight text-ink">{period.label}</h3>
                <p className="mt-3 text-base leading-7 text-ink/74">{formatShortRange(period.startDate, period.endDate, "de")}</p>
              </article>
            ))}
          </div>
        </section>
      </Reveal>
      <OfficialSourcesBlock sources={[meta.schoolSource]} />
      <LinkGrid
        title="Nächste sinnvolle Seiten"
        links={[
          {
            href: deRoutes.stateBridgesYear(year, state),
            label: `Brückentage ${meta.name} ${year}`,
            body: "Prüfen, welche Brückentage sich mit Ferienfenstern sauber kombinieren lassen.",
          },
          {
            href: deRoutes.stateHolidaysYear(year, state),
            label: `Feiertage ${meta.name} ${year}`,
            body: "Die gesetzlichen Marker hinter den Familienfenstern direkt daneben lesen.",
          },
          {
            href: deRoutes.stateSchoolHolidaysYear(year === 2026 ? 2027 : 2026, state),
            label: `Schulferien ${meta.name} ${year === 2026 ? 2027 : 2026}`,
            body: "Das Folgejahr ohne Produktwechsel vergleichen.",
          },
        ]}
      />
    </PageShell>
  );
}
