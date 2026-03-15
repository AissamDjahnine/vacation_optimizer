import type { Metadata } from "next";
import Script from "next/script";
import { HomePage } from "@/components/pages/home-page";
import { buildWebApplicationSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "French leave planner and bridge ideas",
  description:
    "Plan French public-holiday bridges, compare leave ideas, find the right school zone and build your 2026 leave plan.",
  alternates: {
    canonical: "/en",
    languages: {
      "fr-FR": "/",
      "en-US": "/en",
    },
  },
  openGraph: {
    title: "French leave planner and bridge ideas",
    description:
      "Plan French public-holiday bridges, compare leave ideas and build your 2026 leave plan.",
    url: "/en",
    siteName: "Ponts Malins",
    type: "website",
    images: ["/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    title: "French leave planner and bridge ideas",
    description:
      "Plan French public-holiday bridges, compare leave ideas and build your 2026 leave plan.",
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

export default function Page() {
  return (
    <>
      <Script
        id="home-webapplication-schema-en"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <h1 className="sr-only">French leave planner and bridge ideas</h1>
      <HomePage language="en" />
    </>
  );
}
