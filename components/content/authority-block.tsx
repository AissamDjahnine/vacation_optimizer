import Link from "next/link";
import type { PageAuthorityBlock } from "@/lib/domain/types";
import type { AppLanguage } from "@/lib/i18n";
import { prefixForLanguage, t } from "@/lib/i18n";

export function AuthorityBlock({
  block,
  language,
}: {
  block: PageAuthorityBlock;
  language: AppLanguage;
}) {
  return (
    <section className="editorial-panel border-violet-200 bg-gradient-to-br from-white to-[#faf5ff]">
      <div className="space-y-3">
        <p className="editorial-kicker">
          {language === "en" ? "Official references" : "Repères officiels"}
        </p>
        <h2 className="text-3xl font-black tracking-tight text-ink">
          {t(block.title, language)}
        </h2>
        <p className="editorial-lead">{t(block.intro, language)}</p>
      </div>
      <div className="mt-6 grid gap-4">
        {block.notes.map((note) => (
          <article
            key={`${t(note.title, language)}-${note.source.href}`}
            className="rounded-4xl border border-line bg-white p-6"
          >
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-lavender px-4 py-2 text-sm font-bold text-indigo-700">
                {t(note.badge, language)}
              </span>
              <h3 className="text-xl font-black tracking-tight text-ink">
                {t(note.title, language)}
              </h3>
            </div>
            <p className="mt-4 text-base leading-7 text-ink/74">
              {t(note.summary, language)}
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-4">
              <a
                href={note.source.href}
                target="_blank"
                rel="noreferrer"
                className="text-sm font-bold text-coral"
              >
                {t(note.source.label, language)}
              </a>
              {note.href ? (
                <Link
                  href={localizeHref(note.href, language)}
                  className="text-sm font-bold text-ink/70 transition hover:text-ink"
                >
                  {language === "en" ? "Test this in the planner" : "Tester dans le simulateur"}
                </Link>
              ) : null}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function localizeHref(href: string, language: AppLanguage) {
  const [path, search = ""] = href.split("?");
  const localizedPath = prefixForLanguage(path || "/", language);
  return search ? `${localizedPath}?${search}` : localizedPath;
}
