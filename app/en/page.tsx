import type { Metadata } from "next";
import { HomePage } from "@/components/pages/home-page";

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

export default function Page() {
  return <HomePage language="en" />;
}
