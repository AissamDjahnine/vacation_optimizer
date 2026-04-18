type FaqItem = {
  question: string;
  answer: string;
};

export function FaqListSection({
  kicker,
  title,
  items,
}: {
  kicker: string;
  title: string;
  items: FaqItem[];
}) {
  return (
    <section className="editorial-panel">
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
