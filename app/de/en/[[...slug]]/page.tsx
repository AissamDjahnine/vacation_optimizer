import Link from "next/link";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/content/page-shell";
import {
  GermanyCountryYearPage,
  GermanyGuidePage,
  GermanyHomePage,
  GermanyStateBridgesPage,
  GermanyStateHolidaysPage,
  GermanyStateSchoolHolidaysPage,
} from "@/components/pages/germany-pages";
import { germanGuidePagesEn, germanNationalSources } from "@/lib/germany/content";
import { germanYears, isGermanYear } from "@/lib/germany/constants";
import { getGermanBridgeOpportunities, getGermanHolidaysForState } from "@/lib/germany/holidays";
import { buildGermanMetadata } from "@/lib/germany/seo";
import { getGermanSchoolHolidaysForState } from "@/lib/germany/school-holidays";
import { getGermanStateBySlug, germanStates } from "@/lib/germany/states";

type SlugParams = { slug?: string[] };

export function generateStaticParams() {
  return [
    { slug: [] },
    { slug: ["offizielle-quellen"] },
    { slug: ["impressum"] },
    { slug: ["datenschutz"] },
    ...germanYears.flatMap((year) => [
      { slug: ["brueckentage-deutschland", String(year)] },
      { slug: ["feiertage-deutschland", String(year)] },
      { slug: ["schulferien-deutschland", String(year)] },
    ]),
    ...Object.keys(germanGuidePagesEn).map((slug) => ({ slug: ["ratgeber", slug] })),
    ...germanStates.flatMap((state) =>
      germanYears.flatMap((year) => [
        { slug: ["brueckentage", state.slug, String(year)] },
        { slug: ["feiertage", state.slug, String(year)] },
        { slug: ["schulferien", state.slug, String(year)] },
      ]),
    ),
  ];
}

export async function generateMetadata({ params }: { params: Promise<SlugParams> }) {
  const { slug } = await params;

  if (!slug || slug.length === 0) {
    return buildGermanMetadata({
      title: "Germany",
      description: "Bridge days, public holidays and school holidays in Germany, organized by state and backed by official sources.",
      externalPath: "/en",
    });
  }

  const [section, a, b] = slug;

  if (section === "offizielle-quellen") {
    return buildGermanMetadata({
      title: "Official sources for Germany",
      description: "The official sources behind the Germany product: KMK, state portals and nationwide references.",
      externalPath: "/en/offizielle-quellen",
    });
  }

  if (section === "impressum") {
    return {
      ...buildGermanMetadata({
        title: "Legal notice",
        description: "Legal notice for Ponts Malins Germany.",
        externalPath: "/en/impressum",
      }),
      robots: {
        index: false,
        follow: false,
        googleBot: { index: false, follow: false },
      },
    };
  }

  if (section === "datenschutz") {
    return {
      ...buildGermanMetadata({
        title: "Privacy",
        description: "Privacy information for Ponts Malins Germany.",
        externalPath: "/en/datenschutz",
      }),
      robots: {
        index: false,
        follow: false,
        googleBot: { index: false, follow: false },
      },
    };
  }

  if (section === "ratgeber" && a) {
    const page = germanGuidePagesEn[a];
    if (!page) {
      notFound();
    }
    return buildGermanMetadata({
      title: page.title,
      description: page.description,
      externalPath: `/en/ratgeber/${a}`,
    });
  }

  const year = Number.parseInt(b ?? a ?? "", 10);
  if (!isGermanYear(year)) {
    notFound();
  }

  if (section === "brueckentage-deutschland") {
    return buildGermanMetadata({
      title: `Bridge days Germany ${year}`,
      description: `The federal overview of the strongest bridge-day opportunities in Germany for ${year}.`,
      externalPath: `/en/brueckentage-deutschland/${year}`,
    });
  }

  if (section === "feiertage-deutschland") {
    return buildGermanMetadata({
      title: `Public holidays Germany ${year}`,
      description: `The federal overview of German public holidays in ${year} and the main differences between states.`,
      externalPath: `/en/feiertage-deutschland/${year}`,
    });
  }

  if (section === "schulferien-deutschland") {
    return buildGermanMetadata({
      title: `School holidays Germany ${year}`,
      description: `The Germany-wide overview of school holidays in ${year}, read through the KMK and organized by state.`,
      externalPath: `/en/schulferien-deutschland/${year}`,
    });
  }

  const state = getGermanStateBySlug(a ?? "");
  if (!state) {
    notFound();
  }

  if (section === "brueckentage") {
    return buildGermanMetadata({
      title: `Bridge days ${state.englishName} ${year}`,
      description: `The strongest bridge-day opportunities in ${state.englishName} for ${year}, grounded in official public-holiday data.`,
      externalPath: `/en/brueckentage/${state.slug}/${year}`,
    });
  }

  if (section === "feiertage") {
    return buildGermanMetadata({
      title: `Public holidays ${state.englishName} ${year}`,
      description: `The public holidays in ${state.englishName} for ${year}, with official context.`,
      externalPath: `/en/feiertage/${state.slug}/${year}`,
    });
  }

  if (section === "schulferien") {
    return buildGermanMetadata({
      title: `School holidays ${state.englishName} ${year}`,
      description: `The school holidays in ${state.englishName} for ${year}, backed by visible KMK sourcing.`,
      externalPath: `/en/schulferien/${state.slug}/${year}`,
    });
  }

  notFound();
}

function EnglishSourcesPage() {
  return (
    <PageShell>
      <section className="editorial-panel space-y-5">
        <p className="editorial-kicker">Sources and method</p>
        <h1 className="section-title max-w-4xl">Official sources for Germany</h1>
        <p className="editorial-lead">
          The Germany product is intentionally built on official references. For school holidays, the KMK is the visible primary source. For public holidays, each state page points to its state portal.
        </p>
      </section>

      <section className="grid gap-4 lg:grid-cols-[1.1fr,0.9fr]">
        <div className="space-y-4">
          {germanNationalSources.map((source) => (
            <article key={source.url} className="editorial-panel space-y-3">
              <h2 className="text-2xl font-black tracking-tight text-ink">{source.title}</h2>
              <p className="text-base leading-7 text-slate-600">
                This reference is linked directly inside the Germany product instead of being hidden behind generic copy.
              </p>
              <Link
                href={source.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex rounded-full border border-line bg-white px-4 py-2 text-sm font-bold text-ink transition hover:border-coral hover:text-coral"
              >
                Open source
              </Link>
            </article>
          ))}
        </div>

        <aside className="space-y-4">
          <div className="editorial-panel-muted space-y-3">
            <p className="editorial-kicker">Public holidays by state</p>
            <p className="text-sm leading-7 text-slate-600">
              Each state page also points to its own state portal. That keeps the federal structure of German public holidays visible.
            </p>
          </div>
          <div className="editorial-panel-muted space-y-3">
            <p className="editorial-kicker">16 states in the product</p>
            <p className="text-sm leading-7 text-slate-600">
              All 16 states are covered in v1. Official holiday sources remain visible on the relevant state pages.
            </p>
          </div>
          <div className="editorial-panel-muted space-y-3">
            <p className="editorial-kicker">Direct entries</p>
            <div className="space-y-2 text-sm">
              {germanStates.slice(0, 5).map((state) => (
                <Link key={state.code} href={`/en/feiertage/${state.slug}/2026`} className="block text-ink transition hover:text-coral">
                  Public holidays {state.englishName} 2026
                </Link>
              ))}
            </div>
          </div>
        </aside>
      </section>
    </PageShell>
  );
}

function EnglishLegalPage() {
  return (
    <PageShell>
      <section className="editorial-panel space-y-5">
        <p className="editorial-kicker">Legal frame</p>
        <h1 className="section-title max-w-4xl">Legal notice</h1>
        <p className="editorial-lead">
          Ponts Malins Germany is an editorial product for interpreting bridge days, public holidays and school holidays by state. It does not replace official publications or case-specific legal review.
        </p>
      </section>
      <section className="grid gap-4 lg:grid-cols-2">
        <article className="editorial-panel space-y-4">
          <h2 className="text-2xl font-black tracking-tight text-ink">Operator and contact</h2>
          <div className="content-copy space-y-4">
            <p>Ponts Malins operates the Germany product as an editorial and data-backed service.</p>
            <p>Contact: contact@pontsmalins.com</p>
          </div>
        </article>
        <article className="editorial-panel space-y-4">
          <h2 className="text-2xl font-black tracking-tight text-ink">Product boundary</h2>
          <div className="content-copy space-y-4">
            <p>The pages interpret official sources and link them visibly. They are not a legally binding publication.</p>
            <p>Employer rules, collective agreements, local exceptions and special regional cases must still be checked against the primary source.</p>
          </div>
        </article>
      </section>
    </PageShell>
  );
}

function EnglishPrivacyPage() {
  return (
    <PageShell>
      <section className="editorial-panel space-y-5">
        <p className="editorial-kicker">Privacy</p>
        <h1 className="section-title max-w-4xl">Privacy</h1>
        <p className="editorial-lead">
          The Germany product is intentionally lightweight: no user account, no personal area and no stored planning profile.
        </p>
      </section>
      <section className="grid gap-4 lg:grid-cols-2">
        <article className="editorial-panel space-y-4">
          <h2 className="text-2xl font-black tracking-tight text-ink">No account required</h2>
          <div className="content-copy space-y-4">
            <p>The Germany pages can be used without registration.</p>
            <p>The visible content is served as page content and is not bound to a personal account.</p>
          </div>
        </article>
        <article className="editorial-panel space-y-4">
          <h2 className="text-2xl font-black tracking-tight text-ink">Technical usage data</h2>
          <div className="content-copy space-y-4">
            <p>Minimal technical data may be processed for service stability, analytics and delivery.</p>
            <p>If the scope of the service changes materially, this page will be updated accordingly.</p>
          </div>
        </article>
      </section>
    </PageShell>
  );
}

export default async function Page({ params }: { params: Promise<SlugParams> }) {
  const { slug } = await params;

  if (!slug || slug.length === 0) {
    return <GermanyHomePage locale="en" />;
  }

  const [section, a, b] = slug;

  if (section === "offizielle-quellen") {
    return <EnglishSourcesPage />;
  }

  if (section === "impressum") {
    return <EnglishLegalPage />;
  }

  if (section === "datenschutz") {
    return <EnglishPrivacyPage />;
  }

  if (section === "ratgeber" && a) {
    const page = germanGuidePagesEn[a];
    if (!page) {
      notFound();
    }
    return (
      <GermanyGuidePage
        path={`/de/ratgeber/${a}`}
        title={page.title}
        description={page.description}
        intro={page.intro}
        highlights={page.highlights}
        sources={page.sources}
        locale="en"
      />
    );
  }

  const year = Number.parseInt(b ?? a ?? "", 10);
  if (!isGermanYear(year)) {
    notFound();
  }

  if (section === "brueckentage-deutschland") {
    return (
      <GermanyCountryYearPage
        kind="bridges"
        year={year}
        summary={`The federal overview of the strongest bridge-day opportunities in Germany for ${year}, clearly broken down by state.`}
        sources={germanNationalSources}
        locale="en"
      />
    );
  }

  if (section === "feiertage-deutschland") {
    return (
      <GermanyCountryYearPage
        kind="holidays"
        year={year}
        summary={`The public-holiday overview for Germany in ${year}, with a clear focus on differences between states.`}
        sources={germanNationalSources}
        locale="en"
      />
    );
  }

  if (section === "schulferien-deutschland") {
    return (
      <GermanyCountryYearPage
        kind="school-holidays"
        year={year}
        summary={`The Germany-wide view of school holidays in ${year}, read through the KMK and focused on the states.`}
        sources={germanNationalSources}
        locale="en"
      />
    );
  }

  const state = getGermanStateBySlug(a ?? "");
  if (!state) {
    notFound();
  }

  if (section === "brueckentage") {
    const holidays = getGermanHolidaysForState(year, state.code);
    return (
      <GermanyStateBridgesPage
        state={state.code}
        year={year}
        opportunities={getGermanBridgeOpportunities(holidays)}
        locale="en"
      />
    );
  }

  if (section === "feiertage") {
    return (
      <GermanyStateHolidaysPage
        state={state.code}
        year={year}
        holidays={getGermanHolidaysForState(year, state.code)}
        locale="en"
      />
    );
  }

  if (section === "schulferien") {
    return (
      <GermanyStateSchoolHolidaysPage
        state={state.code}
        year={year}
        periods={getGermanSchoolHolidaysForState(year, state.code)}
        locale="en"
      />
    );
  }

  notFound();
}
