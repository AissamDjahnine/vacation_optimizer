import Link from "next/link";
import Script from "next/script";
import { Reveal } from "@/components/motion/reveal";
import { buildBreadcrumbSchema, type BreadcrumbItem } from "@/lib/seo";

export function Breadcrumbs({
  items,
}: {
  items: BreadcrumbItem[];
}) {
  const schema = buildBreadcrumbSchema(items);

  return (
    <Reveal>
      <Script
        id={`breadcrumbs-${items.map((item) => item.url).join("|")}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <nav aria-label="Breadcrumb" className="site-card !py-4 px-5">
        <ol className="flex flex-wrap items-center gap-2 text-sm text-ink/60">
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            return (
              <li key={item.url} className="flex items-center gap-2">
                {isLast ? (
                  <span className="font-semibold text-ink">{item.name}</span>
                ) : (
                  <Link href={item.url} className="transition hover:text-ink">
                    {item.name}
                  </Link>
                )}
                {!isLast ? <span aria-hidden="true">/</span> : null}
              </li>
            );
          })}
        </ol>
      </nav>
    </Reveal>
  );
}
