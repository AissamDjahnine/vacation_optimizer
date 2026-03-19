import { notFound } from "next/navigation";
import { GermanyGuidePage } from "@/components/pages/germany-pages";
import { germanGuidePages } from "@/lib/germany/content";
import { buildGermanMetadata } from "@/lib/germany/seo";

export function generateStaticParams() {
  return Object.keys(germanGuidePages).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = germanGuidePages[slug];

  if (!page) {
    notFound();
  }

  return buildGermanMetadata({
    title: page.title,
    description: page.description,
    externalPath: `/ratgeber/${slug}`,
  });
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = germanGuidePages[slug];

  if (!page) {
    notFound();
  }

  return (
    <GermanyGuidePage
      path={`/de/ratgeber/${slug}`}
      title={page.title}
      description={page.description}
      intro={page.intro}
      highlights={page.highlights}
      sources={page.sources}
    />
  );
}
