import Script from "next/script";
import { buildFaqPageSchema, type FaqSchemaItem } from "@/lib/seo";

type FaqItem = {
  question: string;
  answer: string;
};

export function FaqListSection({
  kicker,
  title,
  items,
  schemaId,
}: {
  kicker: string;
  title: string;
  items: FaqItem[];
  schemaId?: string;
}) {
  const schema = schemaId ? buildFaqPageSchema(items as FaqSchemaItem[]) : null;

  return (
    <section className="editorial-panel">
      {schema ? (
        <Script
          id={schemaId}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ) : null}
      <p className="editorial-kicker">{kicker}</p>
      <h2 className="mt-3 text-3xl font-black tracking-tight text-ink">{title}</h2>
      <div className="mt-6 grid gap-4">
        {items.map((item) => (
          <article key={item.question} className="rounded-4xl border border-line bg-paper p-5">
            <h3 className="text-xl font-black tracking-tight text-ink">{item.question}</h3>
            <p className="mt-3 text-base leading-7 text-ink/74">{item.answer}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
