import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/content/page-shell";
import { routes } from "@/lib/routes";
import { buildNotFoundMetadata } from "@/lib/seo";

export const metadata: Metadata = buildNotFoundMetadata("fr");

export default function NotFoundPage() {
  return (
    <PageShell>
      <section className="editorial-panel space-y-5 text-center">
        <p className="editorial-kicker">Erreur 404</p>
        <h1 className="section-title">Cette page n’existe pas ou n’est plus disponible</h1>
        <p className="mx-auto max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
          Revenez au simulateur, au plan annuel ou à une page guide utile pour continuer votre
          recherche sans repartir de zéro.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            href={routes.home}
            className="rounded-full bg-ink px-5 py-3 text-sm font-bold text-white transition hover:bg-ink/92"
          >
            Ouvrir le simulateur
          </Link>
          <Link
            href={routes.annualPlannerYear(2026)}
            className="rounded-full border border-line bg-white px-5 py-3 text-sm font-bold text-ink transition hover:border-coral hover:text-coral"
          >
            Voir le plan annuel
          </Link>
        </div>
      </section>
    </PageShell>
  );
}
