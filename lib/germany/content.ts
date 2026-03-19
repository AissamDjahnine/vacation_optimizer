import type { GermanEditorialPage, GermanOfficialSource, GermanStateCode } from "@/lib/domain/types";
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

export function getStatePageHighlights(state: GermanStateCode) {
  const stateMeta = germanStateMap[state];

  return [
    `${stateMeta.name} hat einen eigenen Feiertagsmix und deshalb andere Brückentag-Favoriten als der Bundesschnitt.`,
    stateMeta.nuance,
    "Die beste Leserichtung ist immer: Feiertage prüfen, Schulferien danebenlegen, dann die naheliegenden Brückentage priorisieren.",
  ];
}
