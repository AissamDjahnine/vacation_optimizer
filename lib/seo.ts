import type { Metadata } from "next";

const defaultOpenGraphImage = "/opengraph-image";

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
