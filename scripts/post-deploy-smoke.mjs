const baseUrl = (process.argv[2] || process.env.SMOKE_BASE_URL || "").replace(/\/$/, "");

if (!baseUrl) {
  console.error("Usage: npm run smoke:deploy -- https://your-site.vercel.app");
  process.exit(1);
}

const checks = [
  { path: "/", includes: ["Ponts Malins", "Simulateur"] },
  { path: "/ponts/2026", includes: ["Ponts 2026", "Les meilleurs mois à tester d'abord"] },
  { path: "/jours-feries/2026", includes: ["Jours fériés 2026", "Toutes les dates officielles"] },
  {
    path: "/vacances-scolaires-ponts/2026",
    includes: ["Vacances scolaires et ponts 2026", "Vue rapide pour la zone"],
  },
  { path: "/planifier-annee/2026", includes: ["Planifier vos congés 2026 sur l’année", "Plan annuel suggéré"] },
  { path: "/guide-poser-conges-2026", includes: ["Comment bien poser ses congés en 2026"] },
  { path: "/pont-ascension-2026", includes: ["Pont de l'Ascension 2026"] },
  { path: "/faq-ponts-jours-feries", includes: ["FAQ", "Questions générales"] },
  { path: "/en", includes: ["Ponts Malins", "Planner"] },
  { path: "/en/plan-year/2026", includes: ["Plan your 2026 leave budget", "Suggested annual plan"] },
];

async function run() {
  let failed = false;

  for (const check of checks) {
    const url = `${baseUrl}${check.path}`;

    try {
      const response = await fetch(url, {
        redirect: "follow",
        headers: {
          "user-agent": "PontsMalinsSmoke/1.0",
        },
      });

      if (!response.ok) {
        failed = true;
        console.error(`FAIL ${check.path}: HTTP ${response.status}`);
        continue;
      }

      const html = await response.text();
      const missing = check.includes.filter((snippet) => !html.includes(snippet));

      if (missing.length > 0) {
        failed = true;
        console.error(`FAIL ${check.path}: missing content -> ${missing.join(", ")}`);
        continue;
      }

      console.log(`OK   ${check.path}`);
    } catch (error) {
      failed = true;
      console.error(`FAIL ${check.path}: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  if (failed) {
    process.exit(1);
  }

  console.log("Smoke test passed.");
}

await run();
