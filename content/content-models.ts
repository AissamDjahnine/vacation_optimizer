import type { ContentSection, LocalizedText, RelatedLink } from "@/lib/domain/types";

export type GuideContent = {
  title: LocalizedText;
  subtitle: LocalizedText;
  sections: ContentSection[];
  relatedLinks?: RelatedLink[];
};

export type LeaveGuideScenario = {
  budgetLabel: LocalizedText;
  periodLabel: LocalizedText;
  resultLabel: LocalizedText;
  note: LocalizedText;
};

export type FamilyPlanningExample = {
  title: LocalizedText;
  summary: LocalizedText;
  note: LocalizedText;
};

export type HolidaysPlanIdea = {
  title: LocalizedText;
  summary: LocalizedText;
};

export type FaqEntry = {
  question: LocalizedText;
  answer: LocalizedText;
  sourceLabel?: LocalizedText;
  sourceUrl?: string;
};
