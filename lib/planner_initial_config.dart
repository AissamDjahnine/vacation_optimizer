class PlannerInitialConfig {
  const PlannerInitialConfig({
    this.year,
    this.schoolZone,
    this.scrollToPlanner = false,
  });

  final int? year;
  final String? schoolZone;
  final bool scrollToPlanner;
}
