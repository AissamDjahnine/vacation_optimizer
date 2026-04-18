import type { Metadata } from "next";

const defaultOpenGraphImage = "/opengraph-image";
const siteUrl = "https://pontsmalins.com";

function toAbsoluteUrl(url: string): string {
  try {
    return new URL(url, siteUrl).toString();
  } catch {
    return siteUrl;
  }
}

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
  locale?: "fr" | "en" | "de";
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

export function buildNotFoundMetadata(language: "fr" | "en" | "de" = "fr"): Metadata {
  const title =
    language === "en" ? "Page not found" : language === "de" ? "Seite nicht gefunden" : "Page introuvable";
  const description =
    language === "en"
      ? "The requested page does not exist or is no longer available on Ponts Malins."
      : language === "de"
        ? "Die angeforderte Seite existiert nicht oder ist auf Ponts Malins nicht mehr verfügbar."
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

export function buildAbsoluteMetadata({
  title,
  description,
  canonical,
  languages,
}: {
  title: string;
  description: string;
  canonical: string;
  languages?: Record<string, string>;
}): Metadata {
  return {
    title,
    description,
    alternates: {
      canonical,
      languages,
    },
    openGraph: {
      title,
      description,
      url: canonical,
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

export function buildArticleSchema({
  headline,
  description,
  path,
  language,
}: {
  headline: string;
  description: string;
  path: string;
  language: "fr" | "en" | "de";
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    description,
    inLanguage: language === "fr" ? "fr-FR" : language === "en" ? "en-US" : "de-DE",
    mainEntityOfPage: `${siteUrl}${path}`,
    url: `${siteUrl}${path}`,
    image: [`${siteUrl}/opengraph-image`],
    author: {
      "@type": "Organization",
      name: "Ponts Malins",
      url: siteUrl,
    },
    publisher: {
      "@type": "Organization",
      name: "Ponts Malins",
    },
    datePublished: "2026-03-15T17:20:14.401Z",
    dateModified: "2026-03-30T12:00:00.000Z",
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
  language: "fr" | "en" | "de";
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name,
    description,
    url: `${siteUrl}${path}`,
    applicationCategory: "TravelApplication",
    operatingSystem: "Web",
    inLanguage: language === "fr" ? "fr-FR" : language === "en" ? "en-US" : "de-DE",
    image: `${siteUrl}/opengraph-image`,
    publisher: {
      "@type": "Organization",
      name: "Ponts Malins",
      url: siteUrl,
    },
  };
}

export type BreadcrumbItem = {
  name: string;
  url: string;
};

export function buildBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: toAbsoluteUrl(item.url),
    })),
  };
}

export type FaqSchemaItem = {
  question: string;
  answer: string;
};

export function buildFaqPageSchema(items: FaqSchemaItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function buildItemListSchema({
  name,
  items,
}: {
  name: string;
  items: Array<{ name: string; url: string; description?: string }>;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      url: toAbsoluteUrl(item.url),
      description: item.description,
    })),
  };
}
