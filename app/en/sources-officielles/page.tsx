import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/content/page-shell";

export const metadata: Metadata = {
  title: "Official sources",
  description:
    "Official source list used by Ponts Malins for French public holidays, school calendars and general rules.",
};

const sources = [
  {
    title: "Service-Public.fr",
    body: "For general rules about public holidays, bridge days, employer obligations and practical employee-side cases.",
    href: "https://www.service-public.fr/",
  },
  {
    title: "French Ministry of Education",
    body: "For the official school calendar, zones A, B, C and specific school bridge cases such as Ascension-related closures.",
    href: "https://www.education.gouv.fr/calendrier-scolaire-100148",
  },
  {
    title: "data.gouv.fr",
    body: "For public datasets when extra references are useful or when source cross-checking helps stabilize the calendar data.",
    href: "https://www.data.gouv.fr/",
  },
  {
    title: "Nager.Date",
    body: "For technical holiday lists used as a calculation base, then checked against the France-specific context handled by the site.",
    href: "https://date.nager.at/",
  },
];

export default function SourcesPage() {
  return (
    <PageShell>
      <section className="editorial-panel space-y-5">
        <p className="editorial-kicker">Sources and method</p>
        <h1 className="section-title max-w-4xl">Official sources and calculation scope</h1>
        <p className="editorial-lead">
          Ponts Malins combines public data, official pages and a custom planning layer. This page
          lists the references that matter most and explains how they are used.
        </p>
      </section>

      <section className="grid gap-4 lg:grid-cols-[1.1fr,0.9fr]">
        <div className="space-y-4">
          {sources.map((source) => (
            <article key={source.title} className="editorial-panel space-y-3">
              <h2 className="text-2xl font-black tracking-tight text-ink">{source.title}</h2>
              <p className="text-base leading-7 text-slate-600">{source.body}</p>
              <Link
                href={source.href}
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
            <p className="editorial-kicker">What the site does</p>
            <p className="text-sm leading-7 text-slate-600">
              The planner ranks useful scenarios based on public holidays, weekends, leave budget,
              RTT and school-holiday settings when they matter for the case being tested.
            </p>
          </div>
          <div className="editorial-panel-muted space-y-3">
            <p className="editorial-kicker">What it does not replace</p>
            <p className="text-sm leading-7 text-slate-600">
              Employer rules, collective agreements, local arrangements and administrative edge
              cases still need to be checked directly at the source.
            </p>
          </div>
        </aside>
      </section>
    </PageShell>
  );
}
