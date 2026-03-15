import type { Metadata } from "next";
import { SimpleEditorialPage } from "@/components/pages/simple-editorial-page";

export const metadata: Metadata = {
  title: "Mentions légales",
  description:
    "Mentions légales de Ponts Malins : éditeur du site, contact et périmètre d'information.",
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function LegalPage() {
  return (
    <SimpleEditorialPage
      language="fr"
      kicker="Cadre du site"
      title="Mentions légales"
      subtitle="Les informations utiles pour identifier le site, comprendre son périmètre et savoir comment nous contacter."
      sections={[
        {
          title: "Éditeur",
          body: [
            "Ponts Malins est un site éditorial et un simulateur dédié à la planification des congés en France. Un contact de référence est disponible à l’adresse indiquée sur le site.",
            "Le site vise à aider les utilisateurs à comparer des scénarios de ponts, de jours fériés et de vacances scolaires. Il ne remplace ni une source officielle, ni les règles propres à un employeur, une convention collective ou une administration.",
          ],
        },
        {
          title: "Périmètre d'information",
          body: [
            "Ponts Malins résume des données publiques sur les jours fériés et les vacances scolaires, puis propose des simulations utiles pour poser ses congés. Les contenus du site doivent toujours être relus avec le contexte réel de l'utilisateur : employeur, convention, service public, établissement scolaire ou zone géographique.",
            "Quand une règle ou un cas officiel a une incidence particulière, le site renvoie vers les pages sources pour permettre une vérification rapide.",
          ],
        },
      ]}
    />
  );
}
