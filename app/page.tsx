import type { Metadata } from "next";
import Script from "next/script";
import { HomePage } from "@/components/pages/home-page";
import { prefixForLanguage } from "@/lib/i18n";
import { routes } from "@/lib/routes";
import { buildItemListSchema, buildWebApplicationSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Simulateur de ponts et congés 2026 | Trouvez vos meilleurs jours de repos",
  description:
    "Trouvez rapidement les meilleurs ponts 2026, comparez les mois les plus utiles, vérifiez votre zone scolaire et exportez votre plan.",
  alternates: {
    canonical: "/",
    languages: {
      "fr-FR": "/",
      "en-US": "/en",
    },
  },
  openGraph: {
    title: "Simulateur de ponts et congés 2026 | Trouvez vos meilleurs jours de repos",
    description:
      "Trouvez rapidement les meilleurs ponts 2026, comparez les mois les plus utiles, vérifiez votre zone scolaire et exportez votre plan.",
    url: "/",
    siteName: "Ponts Malins",
    type: "website",
    images: ["/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Simulateur de ponts et congés 2026 | Trouvez vos meilleurs jours de repos",
    description:
      "Trouvez rapidement les meilleurs ponts 2026, comparez les mois les plus utiles, vérifiez votre zone scolaire et exportez votre plan.",
    images: ["/opengraph-image"],
  },
};

const schema = buildWebApplicationSchema({
  name: "Ponts Malins",
  description:
    "Simulateur de ponts, jours fériés et vacances scolaires pour optimiser vos congés en France et exporter votre plan.",
  path: "/",
  language: "fr",
});

const planningHubSchema = buildItemListSchema({
  name: "Hubs de planification 2026",
  items: [
    {
      name: "Plan annuel 2026",
      url: prefixForLanguage(routes.annualPlannerYear(2026), "fr"),
      description: "Le hub de planification annuel pour comparer les meilleurs mois et répartir son budget congés.",
    },
    {
      name: "Ponts 2026",
      url: prefixForLanguage(routes.bridgesYear(2026), "fr"),
      description: "La page la plus directe pour trouver les meilleurs ponts et week-ends prolongés de 2026.",
    },
    {
      name: "Jours fériés 2026",
      url: prefixForLanguage(routes.holidaysYear(2026), "fr"),
      description: "La base officielle des jours fériés 2026 pour comprendre quels mois méritent un test.",
    },
    {
      name: "Vacances scolaires et ponts 2026",
      url: prefixForLanguage(routes.schoolHolidaysBridgesYear(2026), "fr"),
      description: "Le hub famille qui combine zones scolaires, jours fériés et vrais arbitrages de congés.",
    },
  ],
});

const guideHubSchema = buildItemListSchema({
  name: "Guides SEO prioritaires 2026",
  items: [
    {
      name: "Guide poser ses congés 2026",
      url: prefixForLanguage(routes.leaveGuide2026, "fr"),
      description: "Le guide éditorial principal pour passer rapidement d'une idée à un vrai plan de congés.",
    },
    {
      name: "Ponts de mai 2026",
      url: prefixForLanguage(routes.mayBridges2026, "fr"),
      description: "Le cluster saisonnier le plus fort pour capter les requêtes à forte intention.",
    },
    {
      name: "Vacances scolaires 2026 et ponts",
      url: prefixForLanguage(routes.schoolHolidaysFamily2026, "fr"),
      description: "L'entrée éditoriale famille pour comparer vacances scolaires, ponts et arbitrages pratiques.",
    },
    {
      name: "Jours fériés et ponts 2027",
      url: prefixForLanguage(routes.holidaysAndBridges2027, "fr"),
      description: "Le hub de projection pour prolonger la planification au-delà de 2026.",
    },
  ],
});

export default function Page() {
  return (
    <>
      <Script
        id="home-webapplication-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <Script
        id="home-planning-hub-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(planningHubSchema) }}
      />
      <Script
        id="home-guide-hub-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(guideHubSchema) }}
      />
      <h1 className="sr-only">Simulateur de ponts et congés 2026</h1>
      <HomePage language="fr" />
    </>
  );
}
