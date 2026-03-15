import dynamic from "next/dynamic";
import { GuidesSection } from "@/components/pages/guides-section";
import type { AppLanguage } from "@/lib/i18n";

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
  return (
    <div className="container-shell space-y-8 py-12 sm:py-16">
      <Planner language={language} />
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
