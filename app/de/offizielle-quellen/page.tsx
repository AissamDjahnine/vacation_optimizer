import Link from "next/link";
import { PageShell } from "@/components/content/page-shell";
import { germanNationalSources } from "@/lib/germany/content";
import { deRoutes } from "@/lib/germany/routes";
import { buildGermanMetadata } from "@/lib/germany/seo";
import { germanStates } from "@/lib/germany/states";

export const metadata = buildGermanMetadata({
  title: "Offizielle Quellen Deutschland",
  description: "Die offiziellen Quellen hinter dem Deutschland-Produkt: KMK, Landesportale und bundesweite Referenzen.",
  externalPath: "/offizielle-quellen",
});

export default function Page() {
  return (
    <PageShell>
      <section className="editorial-panel space-y-5">
        <p className="editorial-kicker">Quellen und Methode</p>
        <h1 className="section-title max-w-4xl">Offizielle Quellen für Deutschland</h1>
        <p className="editorial-lead">
          Das Deutschland-Produkt arbeitet bewusst mit offiziellen Referenzen. Für Schulferien ist die KMK die sichtbare Primärquelle, für Feiertage verweisen die Länderseiten auf ihre jeweiligen Landesportale.
        </p>
      </section>

      <section className="grid gap-4 lg:grid-cols-[1.1fr,0.9fr]">
        <div className="space-y-4">
          {germanNationalSources.map((source) => (
            <article key={source.url} className="editorial-panel space-y-3">
              <h2 className="text-2xl font-black tracking-tight text-ink">{source.title}</h2>
              <p className="text-base leading-7 text-slate-600">
                Diese Referenz wird im Deutschland-Silo direkt verlinkt und nicht hinter generischen Aussagen versteckt.
              </p>
              <Link
                href={source.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex rounded-full border border-line bg-white px-4 py-2 text-sm font-bold text-ink transition hover:border-coral hover:text-coral"
              >
                Quelle öffnen
              </Link>
            </article>
          ))}
        </div>

        <aside className="space-y-4">
          <div className="editorial-panel-muted space-y-3">
            <p className="editorial-kicker">Feiertage nach Bundesland</p>
            <p className="text-sm leading-7 text-slate-600">
              Jede Länderseite verweist zusätzlich auf das jeweilige Landesportal. Damit bleibt sichtbar, dass Feiertage in Deutschland föderal organisiert sind.
            </p>
          </div>
          <div className="editorial-panel-muted space-y-3">
            <p className="editorial-kicker">16 Länder im Produkt</p>
            <p className="text-sm leading-7 text-slate-600">
              Alle 16 Bundesländer sind im v1 abgedeckt. Die offiziellen Feiertagsquellen werden je Land auf den entsprechenden Länderseiten sichtbar gemacht.
            </p>
          </div>
          <div className="editorial-panel-muted space-y-3">
            <p className="editorial-kicker">Direkter Einstieg</p>
            <div className="space-y-2 text-sm">
              {germanStates.slice(0, 5).map((state) => (
                <Link key={state.code} href={deRoutes.stateHolidaysYear(2026, state.code)} className="block text-ink transition hover:text-coral">
                  Feiertage {state.name} 2026
                </Link>
              ))}
            </div>
          </div>
        </aside>
      </section>
    </PageShell>
  );
}
