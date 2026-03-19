import type { GermanOfficialSource, GermanStateCode } from "@/lib/domain/types";

export type GermanStateMeta = {
  code: GermanStateCode;
  name: string;
  slug: string;
  region: "south" | "west" | "east" | "north" | "city";
  holidaySource: GermanOfficialSource;
  schoolSource: GermanOfficialSource;
  nuance: string;
};

const kmkSource: GermanOfficialSource = {
  title: "Kultusministerkonferenz – Ferienregelung",
  url: "https://www.kmk.org/service/ferienregelung/ferienkalender.html",
};

export const germanStates: GermanStateMeta[] = [
  {
    code: "bw",
    name: "Baden-Württemberg",
    slug: "baden-wuerttemberg",
    region: "south",
    holidaySource: { title: "service-bw Landesportal", url: "https://www.service-bw.de/" },
    schoolSource: kmkSource,
    nuance: "Viele Feiertage, dazu Fronleichnam als landesweiter Hebel für späte Frühlingsbrücken.",
  },
  {
    code: "by",
    name: "Bayern",
    slug: "bayern",
    region: "south",
    holidaySource: { title: "Bayern.de", url: "https://www.bayern.de/" },
    schoolSource: kmkSource,
    nuance: "Besonders feiertagsstark; Mariä Himmelfahrt und Fronleichnam machen Bayern kalenderisch eigenständig.",
  },
  {
    code: "be",
    name: "Berlin",
    slug: "berlin",
    region: "city",
    holidaySource: { title: "Berlin.de", url: "https://www.berlin.de/" },
    schoolSource: kmkSource,
    nuance: "Internationaler Frauentag ist zusätzlich relevant, dafür weniger konfessionelle Feiertage als im Süden.",
  },
  {
    code: "bb",
    name: "Brandenburg",
    slug: "brandenburg",
    region: "east",
    holidaySource: { title: "Brandenburg.de", url: "https://www.brandenburg.de/" },
    schoolSource: kmkSource,
    nuance: "Reformationstag ist landesweit frei und macht den Herbst im Vergleich zu Berlin anders.",
  },
  {
    code: "hb",
    name: "Bremen",
    slug: "bremen",
    region: "city",
    holidaySource: { title: "Bremen.de", url: "https://www.bremen.de/" },
    schoolSource: kmkSource,
    nuance: "Kompakter Kalender mit starkem Fokus auf Reformationstag und sommernahe Brückentage.",
  },
  {
    code: "hh",
    name: "Hamburg",
    slug: "hamburg",
    region: "city",
    holidaySource: { title: "Hamburg.de", url: "https://www.hamburg.de/" },
    schoolSource: kmkSource,
    nuance: "Stadtstaat mit Reformationstag und oft gut lesbaren Feiertags-Clustern im Frühjahr.",
  },
  {
    code: "he",
    name: "Hessen",
    slug: "hessen",
    region: "west",
    holidaySource: { title: "Hessen.de", url: "https://www.hessen.de/" },
    schoolSource: kmkSource,
    nuance: "Fronleichnam ist relevant, die Schulferien sind aber meist kompakter als in Bayern oder Baden-Württemberg.",
  },
  {
    code: "mv",
    name: "Mecklenburg-Vorpommern",
    slug: "mecklenburg-vorpommern",
    region: "north",
    holidaySource: { title: "Regierung MV", url: "https://www.regierung-mv.de/" },
    schoolSource: kmkSource,
    nuance: "Internationaler Frauentag plus Reformationstag verändern den Rhythmus im Vergleich zu vielen West-Ländern.",
  },
  {
    code: "ni",
    name: "Niedersachsen",
    slug: "niedersachsen",
    region: "north",
    holidaySource: { title: "Niedersachsen.de", url: "https://www.niedersachsen.de/" },
    schoolSource: kmkSource,
    nuance: "Norddeutscher Kalender mit Reformationstag und klaren Herbst- und Frühjahrsfenstern.",
  },
  {
    code: "nw",
    name: "Nordrhein-Westfalen",
    slug: "nordrhein-westfalen",
    region: "west",
    holidaySource: { title: "Land.NRW", url: "https://www.land.nrw/" },
    schoolSource: kmkSource,
    nuance: "Allerheiligen und Fronleichnam machen NRW im Herbst und späten Frühjahr deutlich stärker als viele Nord-Länder.",
  },
  {
    code: "rp",
    name: "Rheinland-Pfalz",
    slug: "rheinland-pfalz",
    region: "west",
    holidaySource: { title: "RLP.de", url: "https://www.rlp.de/" },
    schoolSource: kmkSource,
    nuance: "Allerheiligen und Fronleichnam sorgen für zusätzliche Optionen, obwohl der Sommerblock eher kompakt bleibt.",
  },
  {
    code: "sl",
    name: "Saarland",
    slug: "saarland",
    region: "west",
    holidaySource: { title: "Saarland.de", url: "https://www.saarland.de/" },
    schoolSource: kmkSource,
    nuance: "Kleines Land mit ungewöhnlich vielen kirchlich geprägten Feiertagen und entsprechend starkem Brückentag-Potenzial.",
  },
  {
    code: "sn",
    name: "Sachsen",
    slug: "sachsen",
    region: "east",
    holidaySource: { title: "Sachsen.de", url: "https://www.sachsen.de/" },
    schoolSource: kmkSource,
    nuance: "Buß- und Bettag ist der große Unterschied im November; Fronleichnam gilt nicht landesweit.",
  },
  {
    code: "st",
    name: "Sachsen-Anhalt",
    slug: "sachsen-anhalt",
    region: "east",
    holidaySource: { title: "Sachsen-Anhalt.de", url: "https://www.sachsen-anhalt.de/" },
    schoolSource: kmkSource,
    nuance: "Epiphanias und Reformationstag machen Sachsen-Anhalt im Januar und Herbst auffällig.",
  },
  {
    code: "sh",
    name: "Schleswig-Holstein",
    slug: "schleswig-holstein",
    region: "north",
    holidaySource: { title: "Schleswig-Holstein.de", url: "https://www.schleswig-holstein.de/" },
    schoolSource: kmkSource,
    nuance: "Reformationstag ist der wichtigste zusätzliche Feiertag; Schulferien spielen oft die größere Rolle als Extra-Feiertage.",
  },
  {
    code: "th",
    name: "Thüringen",
    slug: "thueringen",
    region: "east",
    holidaySource: { title: "Thueringen.de", url: "https://www.thueringen.de/" },
    schoolSource: kmkSource,
    nuance: "Reformationstag ist landesweit frei, Fronleichnam dagegen nur regional und deshalb nicht für das ganze Land planbar.",
  },
];

export const germanStateMap = Object.fromEntries(
  germanStates.map((state) => [state.code, state]),
) as Record<GermanStateCode, GermanStateMeta>;

export function getGermanStateBySlug(slug: string) {
  return germanStates.find((state) => state.slug === slug) ?? null;
}
