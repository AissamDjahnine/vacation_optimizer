import type { Metadata } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Script from "next/script";
import "./globals.css";
import { SiteShell } from "@/components/layout/site-shell";

const googleAnalyticsId = "G-D9TND19B0J";

export const metadata: Metadata = {
  metadataBase: new URL("https://pontsmalins.com"),
  title: {
    default: "Ponts Malins",
    template: "%s | Ponts Malins",
  },
  description:
    "Simulateur de ponts, jours fériés et vacances scolaires pour optimiser vos congés en France.",
  openGraph: {
    title: "Ponts Malins",
    description:
      "Trouvez les meilleurs ponts, comparez vos options et planifiez vos congés plus intelligemment.",
    type: "website",
    siteName: "Ponts Malins",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ponts Malins",
    description:
      "Trouvez les meilleurs ponts, comparez vos options et planifiez vos congés plus intelligemment.",
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
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
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
