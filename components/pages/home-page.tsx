import dynamic from "next/dynamic";
import Link from "next/link";
import { GuidesSection } from "@/components/pages/guides-section";
import { HomeTrustStrip } from "@/components/pages/home-trust-strip";
import { prefixForLanguage, type AppLanguage } from "@/lib/i18n";
import { routes } from "@/lib/routes";

const Planner = dynamic(
  () => import("@/components/planner/planner").then((module) => module.Planner),
  {
    loading: () => <PlannerLoadingState />,
  },
);

export function HomePage({
  language,
}: {
  language: AppLanguage;
}) {
  const popularLinks = [
    { href: routes.annualPlannerYear(2026), fr: "Plan annuel 2026", en: "Annual plan 2026" },
    { href: routes.bridgesYear(2026), fr: "Ponts 2026", en: "Bridge ideas 2026" },
    { href: routes.holidaysYear(2026), fr: "Jours fériés 2026", en: "Public holidays 2026" },
    {
      href: routes.schoolHolidaysBridgesYear(2026),
      fr: "Vacances scolaires et ponts 2026",
      en: "School holidays and bridges 2026",
    },
    { href: routes.holidaysAndBridges2027, fr: "Jours fériés et ponts 2027", en: "Public holidays and bridges 2027" },
    { href: routes.leaveGuide2026, fr: "Guide congés 2026", en: "Leave guide 2026" },
    { href: routes.schoolHolidaysFamily2026, fr: "Guide familles 2026", en: "Family guide 2026" },
    { href: routes.faq, fr: "FAQ ponts et jours fériés", en: "Bridge and public holiday FAQ" },
  ] as const;

  return (
    <div className="container-shell space-y-8 py-12 sm:py-16">
      <Planner language={language} />
      <section className="editorial-panel">
        <p className="editorial-kicker">{language === "en" ? "Popular pages" : "Pages populaires"}</p>
        <h2 className="mt-3 text-3xl font-black tracking-tight text-ink">
          {language === "en" ? "Start with high-value pages" : "Commencer par les pages les plus utiles"}
        </h2>
        <div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {popularLinks.map((item) => (
            <Link
              key={item.href}
              href={prefixForLanguage(item.href, language)}
              className="rounded-3xl border border-line bg-white px-4 py-3 text-sm font-semibold text-ink transition hover:border-coral hover:text-coral"
            >
              {language === "en" ? item.en : item.fr}
            </Link>
          ))}
        </div>
      </section>
      <HomeTrustStrip language={language} />
      <GuidesSection language={language} />
    </div>
  );
}

function PlannerLoadingState() {
  return (
    <div className="space-y-8">
      <section className="space-y-4 text-center">
        <div className="mx-auto h-12 w-64 animate-pulse rounded-2xl bg-white/70" />
        <div className="mx-auto h-6 w-full max-w-3xl animate-pulse rounded-2xl bg-white/60" />
      </section>
      <section className="grid gap-4 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="h-52 animate-pulse rounded-4xl border border-line bg-white/70 shadow-card"
          />
        ))}
      </section>
      <section className="h-[28rem] animate-pulse rounded-[2.2rem] border border-line bg-white/70 shadow-card" />
    </div>
  );
}
