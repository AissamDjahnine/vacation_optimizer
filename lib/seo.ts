import type { Metadata } from "next";

const defaultOpenGraphImage = "/opengraph-image";

export function buildMetadata({
  title,
  description,
  path,
  enPath,
  locale = "fr",
}: {
  title: string;
  description: string;
  path: string;
  enPath?: string;
  locale?: "fr" | "en";
}): Metadata {
  const canonicalPath = locale === "en" && enPath ? enPath : path;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalPath,
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
      url: canonicalPath,
      siteName: "Ponts Malins",
      type: "article",
      images: [defaultOpenGraphImage],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [defaultOpenGraphImage],
    },
  };
}

export function buildNotFoundMetadata(language: "fr" | "en" = "fr"): Metadata {
  const title = language === "en" ? "Page not found" : "Page introuvable";
  const description =
    language === "en"
      ? "The requested page does not exist or is no longer available on Ponts Malins."
      : "La page demandée n’existe pas ou n’est plus disponible sur Ponts Malins.";

  return {
    title,
    description,
    robots: {
      index: false,
      follow: false,
      googleBot: {
        index: false,
        follow: false,
      },
    },
    openGraph: {
      title,
      description,
      siteName: "Ponts Malins",
      type: "website",
      images: [defaultOpenGraphImage],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [defaultOpenGraphImage],
    },
  };
}

export function buildArticleSchema({
  headline,
  description,
  path,
  language,
}: {
  headline: string;
  description: string;
  path: string;
  language: "fr" | "en";
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    description,
    inLanguage: language === "fr" ? "fr-FR" : "en-US",
    mainEntityOfPage: `https://pontsmalins.com${path}`,
    url: `https://pontsmalins.com${path}`,
    image: ["https://pontsmalins.com/opengraph-image"],
    author: {
      "@type": "Organization",
      name: "Ponts Malins",
      url: "https://pontsmalins.com",
    },
    publisher: {
      "@type": "Organization",
      name: "Ponts Malins",
    },
    datePublished: "2026-03-15T17:20:14.401Z",
    dateModified: "2026-03-15T18:45:00.000Z",
  };
}

export function buildWebApplicationSchema({
  name,
  description,
  path,
  language,
}: {
  name: string;
  description: string;
  path: string;
  language: "fr" | "en";
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name,
    description,
    url: `https://pontsmalins.com${path}`,
    applicationCategory: "TravelApplication",
    operatingSystem: "Web",
    inLanguage: language === "fr" ? "fr-FR" : "en-US",
    image: "https://pontsmalins.com/opengraph-image",
    publisher: {
      "@type": "Organization",
      name: "Ponts Malins",
      url: "https://pontsmalins.com",
    },
  };
}
