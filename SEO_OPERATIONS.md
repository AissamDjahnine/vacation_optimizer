# SEO Operations

## GA4 setup
- Mark these events as key events in GA4:
  - `planner_start`
  - `planner_result_view`
  - `annual_plan_click`
  - `outbound_travel_compare`
  - `outbound_calendar_export`
  - `result_cta_click`

## Internal traffic exclusion
- In GA4 Admin, create an internal traffic rule for your office/home IPs.
- Use the built-in `internal` traffic type and exclude it from standard reporting.
- Re-check acquisition reports after the filter is active before using `direct` as a decision input.

## Weekly scorecard
- Search Console:
  - indexed pages
  - impressions
  - CTR
  - organic clicks
- GA4:
  - `planner_start`
  - `planner_result_view`
  - `outbound_travel_compare`
  - `result_cta_click`
  - `outbound_calendar_export`

## Search Console index audit
- Bucket non-indexed URLs into:
  - expected exclusions: redirects, alternates, utility pages
  - valid pages discovered but not indexed
  - thin/low-priority pages
- Request indexing only for:
  - `/jours-feries/2026`
  - `/ponts/2026`
  - `/vacances-scolaires-ponts/2026`
  - `/ponts-mai-2026`
  - `/guide-poser-conges-2026`
  - top German state pages already earning impressions

## Review cadence
- Wait `2-3` weeks after metadata and copy rewrites.
- Compare page-level before/after for:
  - impressions
  - CTR
  - clicks
  - engaged sessions
  - outbound travel clicks
