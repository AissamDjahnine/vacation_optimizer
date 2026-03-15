import type { Metadata } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Script from "next/script";
import "./globals.css";
import { SiteShell } from "@/components/layout/site-shell";

const googleAnalyticsId = "G-D9TND19B0J";

export const metadata: Metadata = {
  metadataBase: new URL("https://pontsmalins.com"),
  title: {
    default: "Simulateur de ponts et congés 2026",
    template: "%s | Ponts Malins",
  },
  description:
    "Simulateur de ponts, jours fériés et vacances scolaires pour optimiser vos congés en France et exporter votre plan.",
  icons: {
    icon: [{ url: "/icon", type: "image/png" }, { url: "/favicon.ico", type: "image/x-icon" }],
    shortcut: ["/favicon.ico"],
    apple: [{ url: "/apple-icon", type: "image/png" }],
  },
  openGraph: {
    title: "Simulateur de ponts et congés 2026",
    description:
      "Trouvez les meilleurs ponts, comparez vos options et planifiez vos congés plus intelligemment.",
    type: "website",
    siteName: "Ponts Malins",
    images: ["/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Simulateur de ponts et congés 2026",
    description:
      "Trouvez les meilleurs ponts, comparez vos options et planifiez vos congés plus intelligemment.",
    images: ["/opengraph-image"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className="min-h-screen text-ink">
        <SiteShell>{children}</SiteShell>
        <SpeedInsights />
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`}
          strategy="lazyOnload"
        />
        <Script id="google-analytics" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${googleAnalyticsId}');
          `}
        </Script>
      </body>
    </html>
  );
}
