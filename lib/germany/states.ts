import type { GermanOfficialSource, GermanStateCode } from "@/lib/domain/types";

export type GermanStateMeta = {
  code: GermanStateCode;
  name: string;
  englishName: string;
  slug: string;
  region: "south" | "west" | "east" | "north" | "city";
  holidaySource: GermanOfficialSource;
  schoolSource: GermanOfficialSource;
  nuance: string;
  englishNuance: string;
};

const kmkSource: GermanOfficialSource = {
  title: "Kultusministerkonferenz – Ferienregelung",
  url: "https://www.kmk.org/service/ferienregelung/ferienkalender.html",
};

export const germanStates: GermanStateMeta[] = [
  {
    code: "bw",
    name: "Baden-Württemberg",
    englishName: "Baden-Wuerttemberg",
    slug: "baden-wuerttemberg",
    region: "south",
    holidaySource: { title: "service-bw Landesportal", url: "https://www.service-bw.de/" },
    schoolSource: kmkSource,
    nuance: "Viele Feiertage, dazu Fronleichnam als landesweiter Hebel für späte Frühlingsbrücken.",
    englishNuance: "Many public holidays, with Corpus Christi acting as a statewide lever for late-spring bridge opportunities.",
  },
  {
    code: "by",
    name: "Bayern",
    englishName: "Bavaria",
    slug: "bayern",
    region: "south",
    holidaySource: { title: "Bayern.de", url: "https://www.bayern.de/" },
    schoolSource: kmkSource,
    nuance: "Besonders feiertagsstark; Mariä Himmelfahrt und Fronleichnam machen Bayern kalenderisch eigenständig.",
    englishNuance: "Especially strong on public holidays; Assumption Day and Corpus Christi make Bavaria distinct in calendar planning.",
  },
  {
    code: "be",
    name: "Berlin",
    englishName: "Berlin",
    slug: "berlin",
    region: "city",
    holidaySource: { title: "Berlin.de", url: "https://www.berlin.de/" },
    schoolSource: kmkSource,
    nuance: "Internationaler Frauentag ist zusätzlich relevant, dafür weniger konfessionelle Feiertage als im Süden.",
    englishNuance: "International Women's Day matters here as an extra holiday, while confessional holidays are fewer than in southern states.",
  },
  {
    code: "bb",
    name: "Brandenburg",
    englishName: "Brandenburg",
    slug: "brandenburg",
    region: "east",
    holidaySource: { title: "Brandenburg.de", url: "https://www.brandenburg.de/" },
    schoolSource: kmkSource,
    nuance: "Reformationstag ist landesweit frei und macht den Herbst im Vergleich zu Berlin anders.",
    englishNuance: "Reformation Day is a statewide holiday and makes the autumn calendar meaningfully different from Berlin.",
  },
  {
    code: "hb",
    name: "Bremen",
    englishName: "Bremen",
    slug: "bremen",
    region: "city",
    holidaySource: { title: "Bremen.de", url: "https://www.bremen.de/" },
    schoolSource: kmkSource,
    nuance: "Kompakter Kalender mit starkem Fokus auf Reformationstag und sommernahe Brückentage.",
    englishNuance: "A compact calendar with a strong focus on Reformation Day and bridge opportunities near the summer period.",
  },
  {
    code: "hh",
    name: "Hamburg",
    englishName: "Hamburg",
    slug: "hamburg",
    region: "city",
    holidaySource: { title: "Hamburg.de", url: "https://www.hamburg.de/" },
    schoolSource: kmkSource,
    nuance: "Stadtstaat mit Reformationstag und oft gut lesbaren Feiertags-Clustern im Frühjahr.",
    englishNuance: "A city-state with Reformation Day and often cleanly readable holiday clusters in spring.",
  },
  {
    code: "he",
    name: "Hessen",
    englishName: "Hesse",
    slug: "hessen",
    region: "west",
    holidaySource: { title: "Hessen.de", url: "https://www.hessen.de/" },
    schoolSource: kmkSource,
    nuance: "Fronleichnam ist relevant, die Schulferien sind aber meist kompakter als in Bayern oder Baden-Württemberg.",
    englishNuance: "Corpus Christi is relevant here, while school-holiday windows are usually more compact than in Bavaria or Baden-Wuerttemberg.",
  },
  {
    code: "mv",
    name: "Mecklenburg-Vorpommern",
    englishName: "Mecklenburg-Western Pomerania",
    slug: "mecklenburg-vorpommern",
    region: "north",
    holidaySource: { title: "Regierung MV", url: "https://www.regierung-mv.de/" },
    schoolSource: kmkSource,
    nuance: "Internationaler Frauentag plus Reformationstag verändern den Rhythmus im Vergleich zu vielen West-Ländern.",
    englishNuance: "International Women's Day plus Reformation Day change the rhythm compared with many western states.",
  },
  {
    code: "ni",
    name: "Niedersachsen",
    englishName: "Lower Saxony",
    slug: "niedersachsen",
    region: "north",
    holidaySource: { title: "Niedersachsen.de", url: "https://www.niedersachsen.de/" },
    schoolSource: kmkSource,
    nuance: "Norddeutscher Kalender mit Reformationstag und klaren Herbst- und Frühjahrsfenstern.",
    englishNuance: "A northern German calendar with Reformation Day and clear autumn and spring windows.",
  },
  {
    code: "nw",
    name: "Nordrhein-Westfalen",
    englishName: "North Rhine-Westphalia",
    slug: "nordrhein-westfalen",
    region: "west",
    holidaySource: { title: "Land.NRW", url: "https://www.land.nrw/" },
    schoolSource: kmkSource,
    nuance: "Allerheiligen und Fronleichnam machen NRW im Herbst und späten Frühjahr deutlich stärker als viele Nord-Länder.",
    englishNuance: "All Saints' Day and Corpus Christi make North Rhine-Westphalia much stronger in autumn and late spring than many northern states.",
  },
  {
    code: "rp",
    name: "Rheinland-Pfalz",
    englishName: "Rhineland-Palatinate",
    slug: "rheinland-pfalz",
    region: "west",
    holidaySource: { title: "RLP.de", url: "https://www.rlp.de/" },
    schoolSource: kmkSource,
    nuance: "Allerheiligen und Fronleichnam sorgen für zusätzliche Optionen, obwohl der Sommerblock eher kompakt bleibt.",
    englishNuance: "All Saints' Day and Corpus Christi create extra options even though the summer block stays relatively compact.",
  },
  {
    code: "sl",
    name: "Saarland",
    englishName: "Saarland",
    slug: "saarland",
    region: "west",
    holidaySource: { title: "Saarland.de", url: "https://www.saarland.de/" },
    schoolSource: kmkSource,
    nuance: "Kleines Land mit ungewöhnlich vielen kirchlich geprägten Feiertagen und entsprechend starkem Brückentag-Potenzial.",
    englishNuance: "A small state with an unusually high number of church-shaped holidays and correspondingly strong bridge-day potential.",
  },
  {
    code: "sn",
    name: "Sachsen",
    englishName: "Saxony",
    slug: "sachsen",
    region: "east",
    holidaySource: { title: "Sachsen.de", url: "https://www.sachsen.de/" },
    schoolSource: kmkSource,
    nuance: "Buß- und Bettag ist der große Unterschied im November; Fronleichnam gilt nicht landesweit.",
    englishNuance: "Day of Repentance and Prayer is the major differentiator in November; Corpus Christi is not statewide here.",
  },
  {
    code: "st",
    name: "Sachsen-Anhalt",
    englishName: "Saxony-Anhalt",
    slug: "sachsen-anhalt",
    region: "east",
    holidaySource: { title: "Sachsen-Anhalt.de", url: "https://www.sachsen-anhalt.de/" },
    schoolSource: kmkSource,
    nuance: "Epiphanias und Reformationstag machen Sachsen-Anhalt im Januar und Herbst auffällig.",
    englishNuance: "Epiphany and Reformation Day make Saxony-Anhalt stand out in January and autumn.",
  },
  {
    code: "sh",
    name: "Schleswig-Holstein",
    englishName: "Schleswig-Holstein",
    slug: "schleswig-holstein",
    region: "north",
    holidaySource: { title: "Schleswig-Holstein.de", url: "https://www.schleswig-holstein.de/" },
    schoolSource: kmkSource,
    nuance: "Reformationstag ist der wichtigste zusätzliche Feiertag; Schulferien spielen oft die größere Rolle als Extra-Feiertage.",
    englishNuance: "Reformation Day is the main extra holiday; school-holiday timing often matters more than extra public holidays.",
  },
  {
    code: "th",
    name: "Thüringen",
    englishName: "Thuringia",
    slug: "thueringen",
    region: "east",
    holidaySource: { title: "Thueringen.de", url: "https://www.thueringen.de/" },
    schoolSource: kmkSource,
    nuance: "Reformationstag ist landesweit frei, Fronleichnam dagegen nur regional und deshalb nicht für das ganze Land planbar.",
    englishNuance: "Reformation Day is statewide, while Corpus Christi applies only regionally and cannot be planned at the whole-state level.",
  },
];

export const germanStateMap = Object.fromEntries(
  germanStates.map((state) => [state.code, state]),
) as Record<GermanStateCode, GermanStateMeta>;

export function getGermanStateBySlug(slug: string) {
  return germanStates.find((state) => state.slug === slug) ?? null;
}
