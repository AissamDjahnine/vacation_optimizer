import type { Metadata } from "next";
import Script from "next/script";
import { HomePage } from "@/components/pages/home-page";
import { buildWebApplicationSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Simulateur de ponts et congés 2026 | Ponts Malins",
  description:
    "Simulez vos ponts 2026, comparez les meilleurs mois, trouvez votre zone scolaire et planifiez vos congés en France. Exportez ensuite votre plan.",
  alternates: {
    canonical: "/",
    languages: {
      "fr-FR": "/",
      "en-US": "/en",
    },
  },
  openGraph: {
    title: "Simulateur de ponts et congés 2026 | Ponts Malins",
    description:
      "Simulez vos ponts 2026, comparez les meilleurs mois, trouvez votre zone scolaire et exportez votre plan.",
    url: "/",
    siteName: "Ponts Malins",
    type: "website",
    images: ["/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Simulateur de ponts et congés 2026 | Ponts Malins",
    description:
      "Simulez vos ponts 2026, comparez les meilleurs mois, trouvez votre zone scolaire et exportez votre plan.",
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

export default function Page() {
  return (
    <>
      <Script
        id="home-webapplication-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <h1 className="sr-only">Simulateur de ponts et congés 2026</h1>
      <HomePage language="fr" />
    </>
  );
}
