"use client";

import Link from "next/link";
import { trackEvent } from "@/lib/analytics";
import { prefixForLanguage, type AppLanguage } from "@/lib/i18n";
import { routes } from "@/lib/routes";

const popularLinks = [
  { href: routes.annualPlannerYear(2026), fr: "Plan annuel 2026", en: "Annual plan 2026" },
  { href: routes.rtt2027, fr: "RTT 2027", en: "RTT 2027" },
  { href: routes.schoolHolidaysFamily2026, fr: "Vacances scolaires 2026", en: "School holidays 2026" },
  { href: routes.leaveGuide2026, fr: "Guide congés 2026", en: "Leave guide 2026" },
] as const;

export function HomePromos({ language }: { language: AppLanguage }) {
  return (
    <>
      <section className="editorial-panel">
        <p className="editorial-kicker">{language === "en" ? "Quick links" : "Raccourcis"}</p>
        <h2 className="mt-3 text-3xl font-black tracking-tight text-ink">
          {language === "en"
            ? "Jump straight to the pages people search for"
            : "Aller directement aux pages les plus recherchées"}
        </h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {popularLinks.map((item) => (
            <Link
              key={item.href}
              href={prefixForLanguage(item.href, language)}
              onClick={() =>
                trackEvent("guide_click", {
                  language,
                  source: "home_quick_links",
                  destination: item.href,
                })
              }
              className="group flex min-h-36 flex-col justify-between rounded-[1.75rem] border border-line bg-slate-50/80 p-5 text-ink transition hover:-translate-y-0.5 hover:border-[#1f4471] hover:bg-white hover:text-[#1f4471]"
            >
              <span className="text-base font-bold tracking-tight">
                {language === "en" ? item.en : item.fr}
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="overflow-hidden rounded-[2.25rem] border border-line bg-gradient-to-br from-[#5f7f9b] via-[#6f91ae] to-[#1da1b8] p-6 text-white shadow-card sm:p-8">
        <div className="grid items-center gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="space-y-5">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-white/70">
              {language === "en" ? "Travel smarter in 2026" : "Planifiez plus vite en 2026"}
            </p>
            <h2 className="max-w-xl text-3xl font-black tracking-tight sm:text-4xl">
              {language === "en"
                ? "One fast planner for bridges, school holidays, and leave budgets."
                : "Un simulateur rapide pour les ponts, les vacances scolaires et votre budget de congés."}
            </h2>
            <p className="max-w-xl text-base leading-7 text-white/82 sm:text-lg">
              {language === "en"
                ? "Start from the month that matters, then use the full planner only when you need exact dates and exports."
                : "Commencez par le mois qui compte, puis ouvrez le simulateur complet seulement si vous avez besoin des dates exactes et des exports."}
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href={prefixForLanguage(routes.annualPlannerYear(2026), language)}
                onClick={() =>
                  trackEvent("annual_plan_click", {
                    language,
                    source: "home_banner",
                    year: 2026,
                  })
                }
                className="inline-flex items-center rounded-full bg-white px-6 py-3 text-sm font-bold text-[#335b80] transition hover:-translate-y-0.5"
              >
                {language === "en" ? "Open the annual planner" : "Ouvrir le plan annuel"}
              </Link>
              <Link
                href={prefixForLanguage(routes.bridgesYear(2026), language)}
                onClick={() =>
                  trackEvent("guide_click", {
                    language,
                    source: "home_banner",
                    destination: routes.bridgesYear(2026),
                  })
                }
                className="inline-flex items-center rounded-full border border-white/30 bg-white/10 px-6 py-3 text-sm font-bold text-white transition hover:border-white hover:bg-white/15"
              >
                {language === "en" ? "See bridge ideas" : "Voir les ponts"}
              </Link>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[1.9rem] border border-white/15 bg-[#dbe8ef]/10 p-4 shadow-[0_24px_80px_rgba(0,0,0,0.18)]">
            <BridgeIllustration language={language} />
          </div>
        </div>
      </section>
    </>
  );
}

function BridgeIllustration({ language }: { language: AppLanguage }) {
  return (
    <div className="relative aspect-[16/10] overflow-hidden rounded-[1.6rem] bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.32),_transparent_28%),linear-gradient(135deg,_rgba(36,66,98,0.95),_rgba(92,139,172,0.9)_58%,_rgba(24,144,160,0.88))]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_18%,rgba(255,255,255,0.16),transparent_18%),radial-gradient(circle_at_28%_74%,rgba(255,255,255,0.11),transparent_20%)]" />
      <svg viewBox="0 0 900 560" className="absolute inset-0 h-full w-full" aria-hidden="true">
        <defs>
          <linearGradient id="road" x1="0" x2="1">
            <stop offset="0%" stopColor="#f8f7f2" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#f8f7f2" stopOpacity="0.52" />
          </linearGradient>
          <linearGradient id="bridge" x1="0" x2="1">
            <stop offset="0%" stopColor="#f6b16a" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#f0dfb2" stopOpacity="0.95" />
          </linearGradient>
        </defs>
        <circle cx="160" cy="120" r="210" fill="rgba(255,255,255,0.06)" />
        <circle cx="760" cy="470" r="170" fill="rgba(255,255,255,0.04)" />
        <path d="M-20 410 C 180 340, 260 290, 380 230 S 650 130, 940 180" fill="none" stroke="url(#road)" strokeWidth="16" strokeLinecap="round" />
        <path d="M40 520 C 260 440, 320 350, 470 260 S 700 160, 920 120" fill="none" stroke="url(#road)" strokeWidth="10" strokeLinecap="round" />
        <path d="M170 430 C 250 360, 380 320, 520 300 S 740 270, 880 210" fill="none" stroke="url(#bridge)" strokeWidth="14" strokeLinecap="round" />
        <path d="M180 430 C 250 360, 380 320, 520 300 S 740 270, 880 210" fill="none" stroke="rgba(255,255,255,0.45)" strokeWidth="2" strokeLinecap="round" />
        <path d="M385 306 C 395 266, 430 238, 468 238 C 506 238, 541 266, 551 306" fill="none" stroke="rgba(255,255,255,0.72)" strokeWidth="8" strokeLinecap="round" />
        <path d="M560 292 C 570 252, 605 224, 643 224 C 681 224, 716 252, 726 292" fill="none" stroke="rgba(255,255,255,0.72)" strokeWidth="8" strokeLinecap="round" />
        <path d="M120 470 L 180 430 L 560 292 L 620 310" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="4" strokeLinecap="round" />
        <circle cx="268" cy="346" r="20" fill="rgba(255,255,255,0.15)" />
        <circle cx="628" cy="246" r="18" fill="rgba(255,255,255,0.18)" />
        <circle cx="762" cy="202" r="16" fill="rgba(255,255,255,0.14)" />
      </svg>
      <div className="absolute left-5 top-5 rounded-full border border-white/20 bg-white/12 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-white/80">
        {language === "en" ? "Bridge map" : "Carte des ponts"}
      </div>
      <div className="absolute bottom-5 left-5 max-w-[15rem] rounded-3xl border border-white/15 bg-slate-950/20 p-4 backdrop-blur-sm">
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-white/70">
          {language === "en" ? "Quick result" : "Résultat rapide"}
        </p>
        <p className="mt-2 text-4xl font-black tracking-tight text-white">
          {language === "en" ? "24 days" : "24 jours"}
        </p>
        <p className="mt-2 text-sm leading-6 text-white/78">
          {language === "en"
            ? "Preview the best bridge windows before you open the full planner."
            : "Aperçu des meilleures fenêtres de pont avant d’ouvrir le simulateur complet."}
        </p>
      </div>
    </div>
  );
}
