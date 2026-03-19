import { describe, expect, test } from "vitest";
import robots from "@/app/robots";
import sitemap from "@/app/sitemap";
import { prefixForLanguage } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";

describe("SEO routing", () => {
  test("uses the english path as canonical for english pages", () => {
    const metadata = buildMetadata({
      title: "Plan your 2026 leave across the full year",
      description: "Build a yearly leave and bridge plan for 2026.",
      path: "/planifier-annee/2026",
      enPath: "/en/plan-year/2026",
      locale: "en",
    });

    expect(metadata.alternates?.canonical).toBe("/en/plan-year/2026");
    expect(metadata.openGraph?.url).toBe("/en/plan-year/2026");
  });

  test("publishes the translated english planner URL in the sitemap", () => {
    const entries = sitemap();
    const entry = entries.find((item) => item.url === "https://pontsmalins.com/en/plan-year/2026");

    expect(entry).toBeDefined();
    expect(entry?.alternates?.languages?.fr).toBe("https://pontsmalins.com/planifier-annee/2026");
    expect(entry?.changeFrequency).toBe("monthly");
    expect(entry?.priority).toBe(0.9);
  });

  test("does not leak the legacy english planner URL into the sitemap", () => {
    const entries = sitemap();

    expect(entries.some((item) => item.url === "https://pontsmalins.com/en/planifier-annee/2026")).toBe(
      false,
    );
  });

  test("keeps localized route mapping stable for translated slugs", () => {
    expect(prefixForLanguage("/planifier-annee/2026", "en")).toBe("/en/plan-year/2026");
    expect(prefixForLanguage("/ponts/2026", "en")).toBe("/en/ponts/2026");
    expect(prefixForLanguage("/jours-feries/2026", "en")).toBe("/en/jours-feries/2026");
  });

  test("serves a crawlable robots policy with the production sitemap", () => {
    expect(robots()).toEqual({
      rules: {
        userAgent: "*",
        allow: "/",
      },
      sitemap: "https://pontsmalins.com/sitemap.xml",
    });
  });

  test("redirects legacy english annual planner URLs to the live route", async () => {
    const { default: nextConfig } = await import("../next.config.mjs");
    const redirects = await nextConfig.redirects?.();

    expect(redirects).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          source: "/en/planifier-annee/:year(\\d{4})",
          destination: "/en/plan-year/:year",
          permanent: true,
        }),
      ]),
    );
  });
});
