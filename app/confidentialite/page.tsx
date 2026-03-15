import type { Metadata } from "next";
import { SimpleEditorialPage } from "@/components/pages/simple-editorial-page";

export const metadata: Metadata = {
  title: "Confidentialité",
  description:
    "Politique de confidentialité de Ponts Malins : usage du site, données non enregistrées et périmètre des exports.",
};

export default function PrivacyPage() {
  return (
    <SimpleEditorialPage
      language="fr"
      kicker="Vie privée"
      title="Confidentialité"
      subtitle="Le site a été conçu pour rester léger : pas de compte utilisateur, pas d'historique complexe à gérer pour tester un scénario."
      sections={[
        {
          title: "Pas de compte nécessaire",
          body: [
            "Ponts Malins peut être utilisé sans créer de compte. Les scénarios de simulation sont calculés côté client à partir des réglages saisis dans l'interface.",
          ],
        },
        {
          title: "Données de navigation",
          body: [
            "Le site peut collecter des données techniques minimales liées à l'hébergement ou à la mesure de fréquentation. Elles servent à maintenir le service, vérifier qu'il fonctionne bien et améliorer les pages les plus utiles.",
            "Les réglages testés dans le simulateur ne sont pas stockés comme un espace personnel. Les exports de calendrier sont générés à la demande pour être récupérés immédiatement par l'utilisateur.",
          ],
        },
        {
          title: "Avant l'ajout de publicités",
          body: [
            "Si des emplacements publicitaires ou des outils d'analyse supplémentaires sont ajoutés plus tard, cette page devra être mise à jour pour expliquer clairement les services concernés, leur finalité et les éventuels choix proposés à l'utilisateur.",
          ],
        },
      ]}
    />
  );
}
