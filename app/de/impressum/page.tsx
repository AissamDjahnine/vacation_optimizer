import { PageShell } from "@/components/content/page-shell";
import { buildGermanMetadata } from "@/lib/germany/seo";

export const metadata = {
  ...buildGermanMetadata({
    title: "Impressum",
    description: "Impressum von Ponts Malins Deutschland: Kontakt, Einordnung und Produktgrenzen.",
    externalPath: "/impressum",
  }),
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function Page() {
  return (
    <PageShell>
      <section className="editorial-panel space-y-5">
        <p className="editorial-kicker">Rechtlicher Rahmen</p>
        <h1 className="section-title max-w-4xl">Impressum</h1>
        <p className="editorial-lead">
          Ponts Malins Deutschland ist ein editoriales Produkt zur Einordnung von Brückentagen, Feiertagen und Schulferien nach Bundesland. Es ersetzt weder amtliche Bekanntmachungen noch arbeitsrechtliche Prüfung im Einzelfall.
        </p>
      </section>
      <section className="grid gap-4 lg:grid-cols-2">
        <article className="editorial-panel space-y-4">
          <h2 className="text-2xl font-black tracking-tight text-ink">Betreiber und Kontakt</h2>
          <div className="content-copy space-y-4">
            <p>Ponts Malins betreibt das Deutschland-Produkt als redaktionellen und datengetriebenen Service.</p>
            <p>Kontakt: contact@pontsmalins.com</p>
          </div>
        </article>
        <article className="editorial-panel space-y-4">
          <h2 className="text-2xl font-black tracking-tight text-ink">Produktgrenze</h2>
          <div className="content-copy space-y-4">
            <p>Die Seiten ordnen offizielle Quellen ein und verlinken sie sichtbar. Sie sind keine rechtsverbindliche Veröffentlichung.</p>
            <p>Für Arbeitgeberregeln, Tarifverträge, kommunale Sonderfälle oder regionale Ausnahmen bleibt die Primärquelle maßgeblich.</p>
          </div>
        </article>
      </section>
    </PageShell>
  );
}
