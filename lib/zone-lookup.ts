import mapping from "@/data/zones/france-zone-mapping.json";
import type {
  AcademyZoneEntry,
  DepartmentZoneEntry,
  LocalizedText,
  ZoneLookupResult,
} from "@/lib/domain/types";
import type { AppLanguage } from "@/lib/i18n";

const departments = mapping.departments as DepartmentZoneEntry[];
const academies = mapping.academies as AcademyZoneEntry[];
const unsupportedLabels = mapping.unsupported.map((entry) => entry.label);

export function lookupSchoolZone(input: string, language: AppLanguage): ZoneLookupResult {
  const trimmed = input.trim();
  const normalized = normalizeLookup(trimmed);

  if (!normalized) {
    return {
      matched: false,
      inputLabel: trimmed,
      reason: "not-found",
      message: {
        fr: "Saisissez un département, son numéro ou une académie pour trouver la bonne zone.",
        en: "Enter a department, its code, or an academy to find the right zone.",
      },
    };
  }

  const unsupported = unsupportedLabels.find((label) => normalizeLookup(label) === normalized);
  if (unsupported) {
    return {
      matched: false,
      inputLabel: trimmed,
      reason: "out-of-scope",
      message: {
        fr: `${unsupported} n’est pas encore couvert dans le simulateur. Ponts Malins reste centré sur la France métropolitaine pour l’instant.`,
        en: `${unsupported} is not covered by the planner yet. Ponts Malins currently focuses on mainland France.`,
      },
    };
  }

  const normalizedCode = /^\d{1,2}$/.test(trimmed) ? trimmed.padStart(2, "0") : trimmed.toUpperCase();

  const department = departments.find((entry) => {
    const departmentName = normalizeLookup(entry.name);
    return (
      entry.code === normalizedCode ||
      departmentName === normalized ||
      normalizeLookup(`${entry.code} ${entry.name}`) === normalized ||
      normalizeLookup(`departement ${entry.name}`) === normalized ||
      normalizeLookup(`département ${entry.name}`) === normalized
    );
  });

  if (department) {
    return buildSupportedResult({
      inputLabel: trimmed,
      label: `${department.name} (${department.code})`,
      zone: department.zone,
      language,
    });
  }

  const academy = academies.find((entry) => {
    const academyName = normalizeLookup(entry.name);
    return (
      academyName === normalized ||
      normalizeLookup(`academie ${entry.name}`) === normalized ||
      normalizeLookup(`académie ${entry.name}`) === normalized ||
      normalizeLookup(`academie de ${entry.name}`) === normalized ||
      normalizeLookup(`académie de ${entry.name}`) === normalized
    );
  });

  if (academy) {
    return buildSupportedResult({
      inputLabel: trimmed,
      label: `${language === "en" ? "Academy" : "Académie"} ${academy.name}`,
      zone: academy.zone,
      language,
    });
  }

  return {
    matched: false,
    inputLabel: trimmed,
    reason: "not-found",
    message: {
      fr: "Aucune correspondance trouvée. Essayez un numéro de département, un nom de département ou une académie.",
      en: "No match found. Try a department code, a department name, or an academy.",
    },
  };
}

function buildSupportedResult({
  inputLabel,
  label,
  zone,
  language,
}: {
  inputLabel: string;
  label: string;
  zone: "A" | "B" | "C";
  language: AppLanguage;
}): ZoneLookupResult {
  return {
    matched: true,
    inputLabel,
    matchLabel: label,
    zone,
    reason: "supported",
    message: {
      fr: `${label} relève de la zone ${zone}. Vous pouvez garder ce réglage ou ajuster manuellement ensuite.`,
      en: `${label} belongs to zone ${zone}. You can keep this setting or adjust it manually afterwards.`,
    },
  };
}

function normalizeLookup(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/['’]/g, " ")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

export const zoneLookupSourceNote: LocalizedText = {
  fr: "Repère local basé sur les zones académiques métropolitaines publiées par l’Éducation nationale.",
  en: "Local helper based on mainland French academy zones published by the Ministry of Education.",
};
