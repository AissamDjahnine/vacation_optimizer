import { PageShell } from "@/components/content/page-shell";
import { buildGermanMetadata } from "@/lib/germany/seo";

export const metadata = {
  ...buildGermanMetadata({
    title: "Datenschutz",
    description: "Datenschutzhinweise für Ponts Malins Deutschland.",
    externalPath: "/datenschutz",
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
        <p className="editorial-kicker">Datenschutz</p>
        <h1 className="section-title max-w-4xl">Datenschutz</h1>
        <p className="editorial-lead">
          Das Deutschland-Produkt ist bewusst leichtgewichtig gebaut: kein Nutzerkonto, kein persönlicher Bereich und keine Speicherung individueller Planung als Profil.
        </p>
      </section>
      <section className="grid gap-4 lg:grid-cols-2">
        <article className="editorial-panel space-y-4">
          <h2 className="text-2xl font-black tracking-tight text-ink">Keine Kontopflicht</h2>
          <div className="content-copy space-y-4">
            <p>Die Deutschland-Seiten sind ohne Registrierung nutzbar.</p>
            <p>Die angezeigten Inhalte werden als Seiteninhalt ausgeliefert und nicht an ein persönliches Konto gebunden.</p>
          </div>
        </article>
        <article className="editorial-panel space-y-4">
          <h2 className="text-2xl font-black tracking-tight text-ink">Technische Nutzungsdaten</h2>
          <div className="content-copy space-y-4">
            <p>Es können minimale technische Daten zur Stabilität, Analyse und Bereitstellung des Dienstes verarbeitet werden.</p>
            <p>Wenn sich der Dienstumfang wesentlich ändert, wird diese Seite entsprechend aktualisiert.</p>
          </div>
        </article>
      </section>
    </PageShell>
  );
}
