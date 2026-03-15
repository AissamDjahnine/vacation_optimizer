import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/content/page-shell";

export const metadata: Metadata = {
  title: "Sources officielles",
  description:
    "Liste des sources officielles utilisées par Ponts Malins pour les jours fériés, vacances scolaires et règles générales.",
};

const sources = [
  {
    title: "Service-Public.fr",
    body: "Pour les règles générales sur les jours fériés, les ponts, les obligations de l'employeur et certains cas pratiques côté salariés.",
    href: "https://www.service-public.fr/",
  },
  {
    title: "Ministère de l'Éducation nationale",
    body: "Pour le calendrier scolaire officiel, les zones A, B, C et les cas spécifiques comme les ponts scolaires de l'Ascension.",
    href: "https://www.education.gouv.fr/calendrier-scolaire-100148",
  },
  {
    title: "data.gouv.fr",
    body: "Pour les jeux de données publics lorsque des références complémentaires sont nécessaires ou qu'un croisement de source aide à stabiliser le calendrier.",
    href: "https://www.data.gouv.fr/",
  },
  {
    title: "Nager.Date",
    body: "Pour les listes techniques de jours fériés utilisées comme base de calcul rapide, puis vérifiées avec le contexte France traité par le site.",
    href: "https://date.nager.at/",
  },
];

export default function SourcesPage() {
  return (
    <PageShell>
      <section className="editorial-panel space-y-5">
        <p className="editorial-kicker">Sources et méthode</p>
        <h1 className="section-title max-w-4xl">Sources officielles et périmètre de calcul</h1>
        <p className="editorial-lead">
          Ponts Malins combine des données publiques, des pages officielles et une logique de
          simulation maison. Cette page résume les références qui comptent le plus et ce que le
          produit en fait réellement.
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
                Ouvrir la source
              </Link>
            </article>
          ))}
        </div>

        <aside className="space-y-4">
          <div className="editorial-panel-muted space-y-3">
            <p className="editorial-kicker">Ce que fait le site</p>
            <p className="text-sm leading-7 text-slate-600">
              Le simulateur classe des scénarios utiles à partir des jours fériés, des week-ends,
              du budget congés, des RTT et des vacances scolaires quand elles comptent dans le cas
              testé.
            </p>
          </div>
          <div className="editorial-panel-muted space-y-3">
            <p className="editorial-kicker">Ce que le site ne remplace pas</p>
            <p className="text-sm leading-7 text-slate-600">
              Les règles d'employeur, les conventions collectives, les accords locaux et les cas
              administratifs spécifiques restent à vérifier directement à la source.
            </p>
          </div>
        </aside>
      </section>
    </PageShell>
  );
}
