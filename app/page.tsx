import type { Metadata } from "next";
import { HomePage } from "@/components/pages/home-page";

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

export default function Page() {
  return <HomePage language="fr" />;
}
