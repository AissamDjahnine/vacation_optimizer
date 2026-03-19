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
  return buildAbsoluteMetadata({
    title,
    description,
    canonical: `${germanyBaseUrl}${externalPath}`,
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
