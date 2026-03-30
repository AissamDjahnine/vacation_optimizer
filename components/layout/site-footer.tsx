import Link from "next/link";
import { ProtectedEmailLink } from "@/components/layout/protected-email-link";
import type { GermanyLocale } from "@/lib/domain/types";
import { withGermanyLocale } from "@/lib/germany/i18n";
import { AppLanguage, prefixForLanguage } from "@/lib/i18n";
import { deRoutes, toGermanyExternalPath } from "@/lib/germany/routes";
import { routes } from "@/lib/routes";

type SiteFooterProps = {
  language: AppLanguage;
  germanyHost?: boolean;
  germanyLocale?: GermanyLocale;
  showTrustStrip?: boolean;
};

export function SiteFooter({
  language,
  germanyHost = false,
  germanyLocale = "de",
  showTrustStrip = true,
}: SiteFooterProps) {
  const germanyPath = (path: string) => withGermanyLocale(toGermanyExternalPath(path), germanyLocale);
  const copy =
    germanyHost && germanyLocale === "en"
      ? {
          title: "Ponts Malins Germany",
          summary: "Bridge days, public holidays and school holidays in Germany with clear official sources.",
          product: "Germany home",
          privacy: "No account and no stored personal planning data.",
          guides: "Useful entries",
          trust: "Sources and legal",
          sources: "Official sources",
          legal: "Legal notice",
          privacyPage: "Privacy",
          note: "Built for clean state-by-state orientation, with direct links to KMK and state portals.",
          links: [
            { href: deRoutes.countryBridgesYear(2026), label: "Bridge days Germany 2026" },
            { href: deRoutes.countryHolidaysYear(2026), label: "Public holidays Germany 2026" },
            { href: deRoutes.countrySchoolHolidaysYear(2026), label: "School holidays Germany 2026" },
          ],
        }
      : germanyHost
      ? {
          title: "Ponts Malins Deutschland",
          summary: "Brückentage, Feiertage und Schulferien für Deutschland mit Fokus auf offizielle Quellen.",
          product: "Deutschland-Startseite",
          privacy: "Kein Konto, keine gespeicherten Personendaten.",
          guides: "Wichtige Einstiege",
          trust: "Quellen und Rechtliches",
          sources: "Offizielle Quellen",
          legal: "Impressum",
          privacyPage: "Datenschutz",
          note: "Gebaut für saubere Orientierung nach Bundesland, mit klaren Verweisen auf KMK und Landesportale.",
          links: [
            { href: deRoutes.countryBridgesYear(2026), label: "Brückentage Deutschland 2026" },
            { href: deRoutes.countryHolidaysYear(2026), label: "Feiertage Deutschland 2026" },
            { href: deRoutes.countrySchoolHolidaysYear(2026), label: "Schulferien Deutschland 2026" },
          ],
        }
      : language === "en"
      ? {
          title: "Ponts Malins",
          summary: "Bridge planning, public holidays and school holidays for France.",
          product: "Planner",
          international: "Germany in English",
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
          international: "Allemagne",
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

  return (
    <footer className="mt-24 border-t border-line/70 bg-white py-14 text-ink">
      <div className="container-shell space-y-8">
        {showTrustStrip ? (
          <div className="grid gap-4 rounded-[1.75rem] border border-line/70 bg-slate-50/80 p-4 md:grid-cols-3">
            <div className="rounded-[1.25rem] border border-line/70 bg-white p-4">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-ink/46">
                {germanyHost
                  ? germanyLocale === "en"
                    ? "Public data"
                    : "Öffentliche Daten"
                  : language === "en"
                    ? "Public data"
                    : "Données publiques"}
              </p>
              <p className="mt-3 text-sm leading-6 text-ink/68">
                {germanyHost
                  ? germanyLocale === "en"
                    ? "Public-holiday and school-holiday references are surfaced with clear official sourcing."
                    : "Feiertage und Schulferien werden als nutzbare Orientierung mit klaren offiziellen Quellen aufbereitet."
                  : language === "de"
                    ? "Feiertage und Schulferien werden als nutzbare Orientierung mit klaren offiziellen Quellen aufbereitet."
                    : language === "en"
                      ? "Public holidays and school-calendar references are surfaced with product guidance, not hidden behind generic copy."
                      : "Les jours fériés et le calendrier scolaire sont reliés à des repères produit utiles, pas noyés dans un texte générique."}
              </p>
            </div>
            <div className="rounded-[1.25rem] border border-line/70 bg-white p-4">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-ink/46">
                {germanyHost
                  ? germanyLocale === "en"
                    ? "No account"
                    : "Ohne Konto"
                  : language === "en"
                    ? "No account"
                    : "Sans compte"}
              </p>
              <p className="mt-3 text-sm leading-6 text-ink/68">{copy.privacy}</p>
            </div>
            <div className="rounded-[1.25rem] border border-line/70 bg-white p-4">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-ink/46">
                {germanyHost
                  ? germanyLocale === "en"
                    ? "Editorial framing"
                    : "Offizielle Einordnung"
                  : language === "en"
                    ? "Calendar export"
                    : "Export agenda"}
              </p>
              <p className="mt-3 text-sm leading-6 text-ink/68">
                {germanyHost
                  ? germanyLocale === "en"
                    ? "The Germany pages are editorial first: context and official sources first, then the next pages for each state."
                    : "Die Deutschland-Seiten sind bewusst editorial aufgebaut: erst Einordnung und Quellen, dann die sinnvollen nächsten Seiten je Bundesland."
                  : language === "de"
                    ? "Die Deutschland-Seiten sind bewusst editorial aufgebaut: erst Einordnung und Quellen, dann die sinnvollen nächsten Seiten je Bundesland."
                    : language === "en"
                      ? "Useful suggestions can be exported as .ics or sent to Google Calendar directly from the planner."
                      : "Les suggestions utiles peuvent être exportées en .ics ou envoyées vers Google Calendar depuis le simulateur."}
              </p>
            </div>
          </div>
        ) : null}

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-[1.4fr,1fr,1fr,1fr,1fr]">
          <div className="space-y-4">
            <p className="site-badge w-fit">{copy.product}</p>
            <h2 className="text-2xl font-black tracking-tight text-ink">{copy.title}</h2>
            <p className="max-w-sm text-sm leading-6 text-ink/68">{copy.summary}</p>
            <p className="max-w-sm text-sm leading-6 text-ink/52">{copy.note}</p>
          </div>
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-[0.24em] text-ink/46">
              {germanyHost ? (germanyLocale === "en" ? "Product" : "Produkt") : language === "en" ? "Product" : "Produit"}
            </h3>
            <Link
              href={germanyHost ? germanyPath(deRoutes.home) : prefixForLanguage(routes.home, language)}
              className="block text-ink/74 transition hover:text-ink"
            >
              {copy.product}
            </Link>
            {!germanyHost ? (
              <Link
                href={language === "en" ? "https://de.pontsmalins.com/en" : "https://de.pontsmalins.com/"}
                target="_blank"
                rel="noreferrer"
                className="block text-ink/74 transition hover:text-ink"
              >
                {copy.international}
              </Link>
            ) : null}
            <p className="text-ink/58">{copy.privacy}</p>
          </div>
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-[0.24em] text-ink/46">{copy.guides}</h3>
            {copy.links.map((link) => (
              <Link
                key={link.href}
                href={germanyHost ? germanyPath(link.href) : prefixForLanguage(link.href, language)}
                className="block text-ink/74 transition hover:text-ink"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-[0.24em] text-ink/46">{copy.trust}</h3>
            <Link
              href={germanyHost ? germanyPath(deRoutes.sources) : prefixForLanguage(routes.sources, language)}
              className="block text-ink/74 transition hover:text-ink"
            >
              {copy.sources}
            </Link>
            <Link
              href={germanyHost ? germanyPath(deRoutes.legal) : prefixForLanguage(routes.legal, language)}
              className="block text-ink/74 transition hover:text-ink"
            >
              {copy.legal}
            </Link>
            <Link
              href={germanyHost ? germanyPath(deRoutes.privacy) : prefixForLanguage(routes.privacy, language)}
              className="block text-ink/74 transition hover:text-ink"
            >
              {copy.privacyPage}
            </Link>
          </div>
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-[0.24em] text-ink/46">Contact</h3>
            <ProtectedEmailLink
              user="contact"
              domain="pontsmalins.com"
              className="text-ink/74 transition hover:text-ink"
            />
          </div>
        </div>
      </div>
    </footer>
  );
}
