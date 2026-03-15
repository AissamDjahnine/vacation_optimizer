import type { Metadata } from "next";

export function buildMetadata({
  title,
  description,
  path,
  enPath,
}: {
  title: string;
  description: string;
  path: string;
  enPath?: string;
}): Metadata {
  return {
    title,
    description,
    alternates: {
      canonical: path,
      languages: enPath
        ? {
            "fr-FR": path,
            "en-US": enPath,
          }
        : undefined,
    },
    openGraph: {
      title,
      description,
      url: path,
      siteName: "Ponts Malins",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}
