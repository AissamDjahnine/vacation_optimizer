"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { cn } from "@/components/cn";
import type { AppLanguage } from "@/lib/i18n";
import { prefixForLanguage } from "@/lib/i18n";
import { lookupSchoolZone, zoneLookupSourceNote } from "@/lib/zone-lookup";

export function ZoneLookupPanel({
  language,
  onZoneResolved,
  title,
  subtitle,
  actionHrefTemplate,
  actionLabel,
  className,
  disabled = false,
}: {
  language: AppLanguage;
  onZoneResolved?: (zone: "A" | "B" | "C") => void;
  title?: string;
  subtitle?: string;
  actionHrefTemplate?: string;
  actionLabel?: string;
  className?: string;
  disabled?: boolean;
}) {
  const [query, setQuery] = useState("");
  const [submittedQuery, setSubmittedQuery] = useState("");
  const [emptyError, setEmptyError] = useState(false);

  const result = useMemo(
    () => lookupSchoolZone(submittedQuery, language),
    [language, submittedQuery],
  );

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (disabled) {
      return;
    }
    const nextQuery = query.trim();
    if (!nextQuery) {
      setSubmittedQuery("");
      setEmptyError(true);
      return;
    }
    setEmptyError(false);
    setSubmittedQuery(nextQuery);
    const nextResult = lookupSchoolZone(nextQuery, language);
    if (nextResult.matched && nextResult.zone && onZoneResolved) {
      onZoneResolved(nextResult.zone);
    }
  };

  return (
    <section
      className={cn(
        "rounded-4xl border border-line bg-white p-5 shadow-card",
        disabled && "opacity-60",
        className,
      )}
    >
      <div className="space-y-2">
        <p className="editorial-kicker">
          {language === "en" ? "Find my zone" : "Trouver ma zone"}
        </p>
        <h3 className="text-2xl font-black tracking-tight text-ink">
          {title ??
            (language === "en"
              ? "Department or academy lookup"
              : "Recherche par département ou académie")}
        </h3>
        <p className="text-base leading-7 text-ink/72">
          {subtitle ??
            (language === "en"
              ? "Enter a department code, a department name, or an academy if you do not know your school zone yet."
              : "Saisissez un numéro de département, un nom de département ou une académie si vous ne connaissez pas encore votre zone scolaire.")}
        </p>
      </div>

      <form className="mt-5 flex flex-col gap-3 sm:flex-row" onSubmit={handleSubmit}>
        <input
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            if (emptyError) {
              setEmptyError(false);
            }
          }}
          disabled={disabled}
          aria-invalid={emptyError}
          aria-describedby={emptyError ? "zone-lookup-error" : undefined}
          placeholder={
            language === "en"
              ? "Example: Paris, 75, Lyon, Versailles"
              : "Exemple : Paris, 75, Lyon, Versailles"
          }
          className="h-12 min-w-0 flex-1 rounded-2xl border border-line bg-paper px-4 font-medium text-ink placeholder:text-ink/35 disabled:cursor-not-allowed disabled:text-ink/45"
        />
        <button
          type="submit"
          disabled={disabled}
          className="inline-flex h-12 items-center justify-center rounded-2xl bg-ink px-5 font-bold text-white transition hover:bg-ink/92 disabled:cursor-not-allowed disabled:bg-ink/35"
        >
          {language === "en" ? "Find zone" : "Trouver la zone"}
        </button>
      </form>

      {emptyError ? (
        <p id="zone-lookup-error" className="mt-3 text-sm font-medium text-rose-700">
          {language === "en"
            ? "Please enter a department, city or academy."
            : "Veuillez saisir un département, une ville ou une académie."}
        </p>
      ) : null}

      {disabled ? (
        <p className="mt-4 text-sm leading-6 text-ink/58">
          {language === "en"
            ? "Zone selection is locked while the planner strictly avoids school holidays."
            : "Le choix de zone est verrouillé tant que le simulateur évite strictement les vacances scolaires."}
        </p>
      ) : null}

      {submittedQuery ? (
        <div
          className={cn(
            "mt-4 rounded-3xl border p-4",
            result.matched
              ? "border-emerald-200 bg-emerald-50"
              : result.reason === "out-of-scope"
                ? "border-amber-200 bg-amber-50"
                : "border-line bg-paper",
          )}
        >
          {result.matched && result.zone ? (
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-ink px-4 py-2 text-sm font-bold text-white">
                {language === "en" ? "Zone" : "Zone"} {result.zone}
              </span>
              <p className="text-sm leading-7 text-ink/78">{result.message[language]}</p>
            </div>
          ) : (
            <p className="text-sm leading-7 text-ink/78">{result.message[language]}</p>
          )}

          {result.matched && result.zone && actionHrefTemplate ? (
            <Link
              href={prefixForLanguage(actionHrefTemplate.replace("{zone}", result.zone), language)}
              className="mt-4 inline-flex text-sm font-bold text-coral"
            >
              {actionLabel ?? (language === "en" ? "Use this zone" : "Utiliser cette zone")}
            </Link>
          ) : null}
        </div>
      ) : null}

      <p className="mt-4 text-xs leading-6 text-ink/48">{zoneLookupSourceNote[language]}</p>
    </section>
  );
}
