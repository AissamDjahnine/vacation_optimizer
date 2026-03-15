import Link from "next/link";
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
          contact: "contact@pontsmalins.com",
          guides: "Useful guides",
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
          contact: "contact@pontsmalins.com",
          guides: "Guides utiles",
          links: [
            { href: routes.leaveGuide2026, label: "Guide congés 2026" },
            { href: routes.schoolHolidaysFamily2026, label: "Vacances scolaires 2026" },
            { href: routes.holidaysAndBridges2027, label: "Jours fériés 2027" },
          ],
        };

  const localized = (href: string) => (language === "en" ? `/en${href === "/" ? "" : href}` : href);

  return (
    <footer className="mt-24 border-t border-white/40 bg-[#171f31] py-14 text-white">
      <div className="container-shell grid gap-10 md:grid-cols-[1.4fr,1fr,1fr,1fr]">
        <div className="space-y-4">
          <h2 className="text-2xl font-black">{copy.title}</h2>
          <p className="max-w-sm text-sm leading-7 text-white/74">{copy.summary}</p>
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
          <h3 className="text-sm font-bold uppercase tracking-[0.24em] text-white/64">Contact</h3>
          <a href={`mailto:${copy.contact}`} className="text-white/84 transition hover:text-white">
            {copy.contact}
          </a>
        </div>
      </div>
    </footer>
  );
}
