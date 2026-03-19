import type { GermanEditorialPage, GermanOfficialSource, GermanStateCode, GermanyLocale } from "@/lib/domain/types";
import { germanStateMap } from "@/lib/germany/states";

export const germanNationalSources: GermanOfficialSource[] = [
  {
    title: "KMK – Ferienregelung",
    url: "https://www.kmk.org/service/ferienregelung/ferienkalender.html",
    label: "KMK",
  },
  {
    title: "Bundesagentur für Arbeit – Brückentag",
    url: "https://www.arbeitsagentur.de/vor-ort/greifswald/presse/2025-20-arbeitsagentur-bleibt-am-bruckentag-geschlossen",
    label: "Bundesagentur",
  },
  {
    title: "Bundesregierung – Tag der Deutschen Einheit",
    url: "https://www.bundesregierung.de/breg-de/mediathek/tag-der-deutschen-einheit-2387018",
    label: "Bundesregierung",
  },
];

export const germanGuidePages: Record<string, GermanEditorialPage & { sources: GermanOfficialSource[] }> = {
  "was-ist-ein-brueckentag": {
    title: "Was ist ein Brückentag?",
    description: "Wie Brückentage in Deutschland funktionieren, warum sie kein bundeseinheitliches Produkt sind und welche Feiertage zuerst zählen.",
    intro:
      "In Deutschland ist ein Brückentag kein eigenes offizielles System wie ein nationaler Service. Der Begriff ist etabliert, die konkrete Chance hängt aber von Feiertag, Wochentag und Bundesland ab.",
    highlights: [
      "Der stärkste klassische Fall ist ein Feiertag am Donnerstag mit freiem Freitag dazwischen.",
      "Auch Dienstag und Mittwoch können relevant sein, brauchen aber mehr echte Urlaubstage.",
      "Entscheidend ist immer das Bundesland, weil nicht alle Feiertage bundesweit gelten.",
    ],
    sources: germanNationalSources,
  },
  "feiertage-nach-bundesland": {
    title: "Feiertage nach Bundesland erklärt",
    description: "Welche Feiertage bundesweit gelten, welche nur in einzelnen Ländern greifen und warum dadurch andere SEO- und Produktseiten nötig sind.",
    intro:
      "Deutschland funktioniert bei Feiertagen föderal. Genau deshalb braucht ein gutes Produkt keine einzelne Liste, sondern Land-seitige Antworten mit offiziellem Kontext.",
    highlights: [
      "Neujahr, Karfreitag, Ostermontag, Tag der Arbeit, Christi Himmelfahrt, Pfingstmontag, Tag der Deutschen Einheit und Weihnachten gelten überall.",
      "Fronleichnam, Allerheiligen, Reformationstag oder Buß- und Bettag ändern den Kalender aber stark je Land.",
      "Regionale Sonderfälle innerhalb eines Landes werden im v1 markiert, aber nicht als eigenes Sub-Land-Modell aufgezogen.",
    ],
    sources: germanNationalSources,
  },
  "schulferien-deutschland": {
    title: "Schulferien in Deutschland erklärt",
    description: "Warum Schulferien in Deutschland über die KMK koordiniert werden, aber trotzdem klar nach Bundesland gelesen werden müssen.",
    intro:
      "Die Kultusministerkonferenz koordiniert die Ferienübersicht, aber die eigentlichen Ferientermine werden von den Ländern gemeldet und veröffentlicht. Für Familien heißt das: immer Bundesland zuerst.",
    highlights: [
      "Sommerferien werden langfristig abgestimmt, andere Ferienarten bleiben Land-Sache.",
      "Brückentag-Potenzial für Familien entsteht oft dort, wo Schulferien und Feiertage sinnvoll aneinanderstoßen.",
      "Die Deutschland-Seiten nutzen deshalb durchgehend Land-spezifische Ferieneinträge mit offizieller KMK-Quelle.",
    ],
    sources: germanNationalSources,
  },
};

export const germanGuidePagesEn: Record<string, GermanEditorialPage & { sources: GermanOfficialSource[] }> = {
  "was-ist-ein-brueckentag": {
    title: "What is a bridge day?",
    description: "How bridge days work in Germany, why they are not a single national product and which holidays matter first.",
    intro:
      "In Germany, a bridge day is a widely used planning idea, not a centralized official system. The concrete opportunity depends on the holiday, the weekday and the state.",
    highlights: [
      "The strongest classic case is a Thursday holiday with Friday sitting between the holiday and the weekend.",
      "Tuesday and Wednesday cases also matter, but they usually require more real leave days.",
      "The state always matters first, because not all public holidays apply nationwide.",
    ],
    sources: germanNationalSources,
  },
  "feiertage-nach-bundesland": {
    title: "Public holidays by state explained",
    description: "Which holidays apply nationwide, which exist only in some states and why Germany needs state-level product pages.",
    intro:
      "Germany handles public holidays federally. That is exactly why a strong product should not stop at one list: it needs state-specific answers with visible official context.",
    highlights: [
      "New Year's Day, Good Friday, Easter Monday, Labour Day, Ascension Day, Whit Monday, German Unity Day and Christmas apply everywhere.",
      "Corpus Christi, All Saints' Day, Reformation Day and the Day of Repentance and Prayer change the calendar sharply from one state to another.",
      "Regional exceptions inside a state are flagged in v1, but not expanded into a separate sub-state model.",
    ],
    sources: germanNationalSources,
  },
  "schulferien-deutschland": {
    title: "School holidays in Germany explained",
    description: "Why German school holidays are coordinated through the KMK but still need to be read state by state.",
    intro:
      "The Standing Conference of the Ministers of Education coordinates the overview, but the actual school-holiday dates are reported and published by the states. For families, that means: state first.",
    highlights: [
      "Summer holidays are coordinated long in advance, while the other holiday periods remain state-managed.",
      "For families, bridge-day value often appears where school holidays and public holidays align cleanly.",
      "The Germany pages therefore use state-specific holiday windows throughout, backed by visible KMK sourcing.",
    ],
    sources: germanNationalSources,
  },
};

export function getStatePageHighlights(state: GermanStateCode, locale: GermanyLocale = "de") {
  const stateMeta = germanStateMap[state];

  if (locale === "en") {
    return [
      `${stateMeta.englishName} has its own holiday mix and therefore different bridge-day favorites than the national average.`,
      stateMeta.englishNuance,
      "The right reading order is always the same: check public holidays, place school holidays beside them, then prioritize the obvious bridge opportunities.",
    ];
  }

  return [
    `${stateMeta.name} hat einen eigenen Feiertagsmix und deshalb andere Brückentag-Favoriten als der Bundesschnitt.`,
    stateMeta.nuance,
    "Die beste Leserichtung ist immer: Feiertage prüfen, Schulferien danebenlegen, dann die naheliegenden Brückentage priorisieren.",
  ];
}
