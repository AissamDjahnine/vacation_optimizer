import { describe, expect, test } from "vitest";
import { NextRequest } from "next/server";
import robots from "@/app/robots";
import sitemap from "@/app/sitemap";
import { prefixForLanguage, resolveLanguage } from "@/lib/i18n";
import { buildBreadcrumbSchema, buildMetadata } from "@/lib/seo";
import { middleware } from "@/middleware";

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

  test("resolves app language from subdomain host before pathname", () => {
    expect(resolveLanguage("/", "de.pontsmalins.com")).toBe("de");
    expect(resolveLanguage("/", "en.pontsmalins.com")).toBe("en");
    expect(resolveLanguage("/", "pontsmalins.com")).toBe("fr");
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

  test("forces canonical https host on www URLs", () => {
    const request = new NextRequest("https://www.pontsmalins.com/ponts/2026", {
      headers: {
        host: "www.pontsmalins.com",
        "x-forwarded-proto": "https",
      },
    });

    const response = middleware(request);
    expect(response.status).toBe(308);
    expect(response.headers.get("location")).toBe("https://pontsmalins.com/ponts/2026");
  });

  test("forces https on apex host", () => {
    const request = new NextRequest("http://pontsmalins.com/planifier-annee/2026", {
      headers: {
        host: "pontsmalins.com",
        "x-forwarded-proto": "http",
      },
    });

    const response = middleware(request);
    expect(response.status).toBe(308);
    expect(response.headers.get("location")).toBe("https://pontsmalins.com/planifier-annee/2026");
  });

  test("redirects /de prefixed URLs on the main host to the Germany host", () => {
    const request = new NextRequest("https://pontsmalins.com/de/feiertage/bayern/2026", {
      headers: {
        host: "pontsmalins.com",
        "x-forwarded-proto": "https",
      },
    });

    const response = middleware(request);
    expect(response.status).toBe(308);
    expect(response.headers.get("location")).toBe("https://de.pontsmalins.com/feiertage/bayern/2026");
  });

  test("always publishes absolute breadcrumb item URLs", () => {
    const schema = buildBreadcrumbSchema([
      { name: "Accueil", url: "/" },
      { name: "Ponts 2026", url: "/ponts/2026" },
    ]);

    expect(schema.itemListElement[0]?.item).toBe("https://pontsmalins.com/");
    expect(schema.itemListElement[1]?.item).toBe("https://pontsmalins.com/ponts/2026");
  });
});
