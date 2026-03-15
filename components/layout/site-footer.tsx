import Link from "next/link";
import { ProtectedEmailLink } from "@/components/layout/protected-email-link";
import { AppLanguage } from "@/lib/i18n";
import { routes } from "@/lib/routes";

type SiteFooterProps = {
  language: AppLanguage;
};

export function SiteFooter({ language }: SiteFooterProps) {
  const copy =
    language === "en"
      ? {
          title: "Ponts Malins",
          summary: "Bridge planning, public holidays and school holidays for France.",
          product: "Planner",
          privacy: "No account, no saved data.",
          guides: "Useful guides",
          trust: "Trust and legal",
          sources: "Official sources",
          legal: "Legal notice",
          privacyPage: "Privacy",
          note: "Built to make French leave planning clearer, then let you verify the final case with the right source.",
          links: [
            { href: routes.leaveGuide2026, label: "Leave guide 2026" },
            { href: routes.schoolHolidaysFamily2026, label: "School holidays 2026" },
            { href: routes.holidaysAndBridges2027, label: "Public holidays 2027" },
          ],
        }
      : {
          title: "Ponts Malins",
          summary: "Ponts, jours fériés et vacances scolaires pour mieux poser vos congés en France.",
          product: "Simulateur",
          privacy: "Pas de compte, pas de données enregistrées.",
          guides: "Guides utiles",
          trust: "Confiance et cadre",
          sources: "Sources officielles",
          legal: "Mentions légales",
          privacyPage: "Confidentialité",
          note: "Conçu pour rendre la planification plus claire, puis vous laisser vérifier le cas final avec la bonne source.",
          links: [
            { href: routes.leaveGuide2026, label: "Guide congés 2026" },
            { href: routes.schoolHolidaysFamily2026, label: "Vacances scolaires 2026" },
            { href: routes.holidaysAndBridges2027, label: "Jours fériés 2027" },
          ],
        };

  const localized = (href: string) => (language === "en" ? `/en${href === "/" ? "" : href}` : href);

  return (
    <footer className="mt-24 border-t border-white/40 bg-[#171f31] py-14 text-white">
      <div className="container-shell space-y-10">
        <div className="grid gap-4 rounded-[2rem] border border-white/10 bg-white/5 p-5 md:grid-cols-3">
          <div className="rounded-[1.5rem] border border-white/8 bg-white/5 p-5">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-white/58">
              {language === "en" ? "Public data" : "Données publiques"}
            </p>
            <p className="mt-3 text-sm leading-7 text-white/74">
              {language === "en"
                ? "Public holidays and school-calendar references are surfaced with product guidance, not hidden behind generic copy."
                : "Les jours fériés et le calendrier scolaire sont reliés à des repères produit utiles, pas noyés dans un texte générique."}
            </p>
          </div>
          <div className="rounded-[1.5rem] border border-white/8 bg-white/5 p-5">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-white/58">
              {language === "en" ? "No account" : "Sans compte"}
            </p>
            <p className="mt-3 text-sm leading-7 text-white/74">{copy.privacy}</p>
          </div>
          <div className="rounded-[1.5rem] border border-white/8 bg-white/5 p-5">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-white/58">
              {language === "en" ? "Calendar export" : "Export agenda"}
            </p>
            <p className="mt-3 text-sm leading-7 text-white/74">
              {language === "en"
                ? "Useful suggestions can be exported as .ics or sent to Google Calendar directly from the planner."
                : "Les suggestions utiles peuvent être exportées en .ics ou envoyées vers Google Calendar depuis le simulateur."}
            </p>
          </div>
        </div>

        <div className="grid gap-10 md:grid-cols-2 xl:grid-cols-[1.4fr,1fr,1fr,1fr,1fr]">
        <div className="space-y-4">
          <h2 className="text-2xl font-black">{copy.title}</h2>
          <p className="max-w-sm text-sm leading-7 text-white/74">{copy.summary}</p>
          <p className="max-w-sm text-sm leading-7 text-white/58">{copy.note}</p>
        </div>
        <div className="space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-[0.24em] text-white/64">
            Produit
          </h3>
          <Link href={localized(routes.home)} className="block text-white/84 transition hover:text-white">
            {copy.product}
          </Link>
          <p className="text-white/64">{copy.privacy}</p>
        </div>
        <div className="space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-[0.24em] text-white/64">
            {copy.guides}
          </h3>
          {copy.links.map((link) => (
            <Link
              key={link.href}
              href={localized(link.href)}
              className="block text-white/84 transition hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </div>
        <div className="space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-[0.24em] text-white/64">
            {copy.trust}
          </h3>
          <Link
            href={localized(routes.sources)}
            className="block text-white/84 transition hover:text-white"
          >
            {copy.sources}
          </Link>
          <Link href={localized(routes.legal)} className="block text-white/84 transition hover:text-white">
            {copy.legal}
          </Link>
          <Link
            href={localized(routes.privacy)}
            className="block text-white/84 transition hover:text-white"
          >
            {copy.privacyPage}
          </Link>
        </div>
        <div className="space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-[0.24em] text-white/64">Contact</h3>
          <ProtectedEmailLink
            user="contact"
            domain="pontsmalins.com"
            className="text-white/84 transition hover:text-white"
          />
        </div>
      </div>
      </div>
    </footer>
  );
}
