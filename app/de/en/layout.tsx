import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Bridge days, public holidays and school holidays in Germany",
    template: "%s | Ponts Malins Germany",
  },
  description:
    "Bridge days, public holidays and school holidays by German state, with visible official sources.",
};

export default function GermanyEnglishLayout({ children }: { children: React.ReactNode }) {
  return children;
}
