import type { Metadata, MetadataRoute } from "next";
import { buildAbsoluteMetadata } from "@/lib/seo";

export const germanyBaseUrl = "https://de.pontsmalins.com";

export function buildGermanMetadata({
  title,
  description,
  externalPath,
}: {
  title: string;
  description: string;
  externalPath: string;
}): Metadata {
  const germanPath =
    externalPath === "/en" ? "/" : externalPath.startsWith("/en/") ? externalPath.replace(/^\/en/, "") || "/" : externalPath;
  const englishPath =
    externalPath.startsWith("/en") ? externalPath : externalPath === "/" ? "/en" : `/en${externalPath}`;

  return buildAbsoluteMetadata({
    title,
    description,
    canonical: `${germanyBaseUrl}${externalPath}`,
    languages: {
      "de-DE": `${germanyBaseUrl}${germanPath}`,
      "en-US": `${germanyBaseUrl}${englishPath}`,
    },
  });
}

export function buildGermanSitemapEntry(
  externalPath: string,
  priority: number,
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"],
  lastModified = new Date("2026-03-19T12:00:00.000Z"),
): MetadataRoute.Sitemap[number] {
  return {
    url: `${germanyBaseUrl}${externalPath}`,
    lastModified,
    priority,
    changeFrequency,
  };
}
