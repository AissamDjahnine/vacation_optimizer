import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#183b67",
        paper: "#f8fbff",
        mist: "#e8f0f8",
        line: "#d6e3f1",
        coral: "#d55a1d",
        mint: "#dff4ea",
        lavender: "#ece8ff",
        sand: "#fff4dd",
        peach: "#ffe5da",
        gcal: "#1f4471",
      },
      boxShadow: {
        soft: "0 16px 60px rgba(24,59,103,0.08)",
        card: "0 12px 30px rgba(24,59,103,0.08)",
      },
      borderRadius: {
        "4xl": "2rem",
      },
      backgroundImage: {
        glow:
          "radial-gradient(circle at top, rgba(213,90,29,0.14), transparent 45%), radial-gradient(circle at 80% 20%, rgba(24,59,103,0.09), transparent 42%)",
      },
    },
  },
  plugins: [],
};

export default config;
