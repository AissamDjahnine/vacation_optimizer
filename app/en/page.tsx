import type { Metadata } from "next";
import Script from "next/script";
import { HomePage } from "@/components/pages/home-page";
import { prefixForLanguage } from "@/lib/i18n";
import { routes } from "@/lib/routes";
import { buildItemListSchema, buildWebApplicationSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "French leave planner and bridge ideas | Find your best break days",
  description:
    "Find the best French bridge days fast, compare the strongest leave ideas, check the right school zone and build your 2026 plan.",
  alternates: {
    canonical: "/en",
    languages: {
      "fr-FR": "/",
      "en-US": "/en",
    },
  },
  openGraph: {
    title: "French leave planner and bridge ideas | Find your best break days",
    description:
      "Find the best French bridge days fast, compare the strongest leave ideas and build your 2026 leave plan.",
    url: "/en",
    siteName: "Ponts Malins",
    type: "website",
    images: ["/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    title: "French leave planner and bridge ideas | Find your best break days",
    description:
      "Find the best French bridge days fast, compare the strongest leave ideas and build your 2026 leave plan.",
    images: ["/opengraph-image"],
  },
};

const schema = buildWebApplicationSchema({
  name: "Ponts Malins",
  description:
    "Plan French public-holiday bridges, compare leave ideas, find the right school zone and build your 2026 leave plan.",
  path: "/en",
  language: "en",
});

const planningHubSchema = buildItemListSchema({
  name: "2026 leave planning hubs",
  items: [
    {
      name: "Annual planner 2026",
      url: prefixForLanguage(routes.annualPlannerYear(2026), "en"),
      description: "The annual planning hub for comparing months and spreading leave budget across the year.",
    },
    {
      name: "Bridge ideas 2026",
      url: prefixForLanguage(routes.bridgesYear(2026), "en"),
      description: "The fastest page for finding high-value French bridge days and long weekends in 2026.",
    },
    {
      name: "Public holidays 2026",
      url: prefixForLanguage(routes.holidaysYear(2026), "en"),
      description: "The official holiday base that explains which months deserve a closer look.",
    },
    {
      name: "School holidays and bridges 2026",
      url: prefixForLanguage(routes.schoolHolidaysBridgesYear(2026), "en"),
      description: "The family-planning hub that combines school zones, public holidays, and practical tradeoffs.",
    },
  ],
});

const guideHubSchema = buildItemListSchema({
  name: "Priority 2026 leave guides",
  items: [
    {
      name: "Leave guide 2026",
      url: prefixForLanguage(routes.leaveGuide2026, "en"),
      description: "The main editorial entry point for turning broad intent into an actual leave plan.",
    },
    {
      name: "May bridge days 2026",
      url: prefixForLanguage(routes.mayBridges2026, "en"),
      description: "The strongest seasonal cluster for high-intent bridge-day queries.",
    },
    {
      name: "School holidays 2026 and bridge days",
      url: prefixForLanguage(routes.schoolHolidaysFamily2026, "en"),
      description: "The family editorial page for comparing school holidays, bridge days, and practical choices.",
    },
    {
      name: "Public holidays and bridge days 2027",
      url: prefixForLanguage(routes.holidaysAndBridges2027, "en"),
      description: "The forward-looking hub for planning beyond 2026.",
    },
  ],
});

export default function Page() {
  return (
    <>
      <Script
        id="home-webapplication-schema-en"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <Script
        id="home-planning-hub-schema-en"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(planningHubSchema) }}
      />
      <Script
        id="home-guide-hub-schema-en"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(guideHubSchema) }}
      />
      <h1 className="sr-only">French leave planner and bridge ideas</h1>
      <HomePage language="en" />
    </>
  );
}
