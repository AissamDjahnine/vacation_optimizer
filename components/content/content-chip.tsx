import type { LocalizedText } from "@/lib/domain/types";
import type { AppLanguage } from "@/lib/i18n";
import { t } from "@/lib/i18n";

export function ContentChip({
  value,
  language,
}: {
  value: LocalizedText;
  language: AppLanguage;
}) {
  return <span className="chip">{t(value, language)}</span>;
}
