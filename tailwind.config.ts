import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#07060c",
        dusk: "#100e18",
        mist: "#f2f1f4",
        lavender: "#d4c4ff",
        violet: "#8b6cff",
        ember: "#ff7a3d",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "ui-serif", "Georgia", "serif"],
        headline: ["var(--font-headline)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 80px rgba(232, 160, 214, 0.28)",
        cta: "0 10px 40px rgba(255, 122, 61, 0.28)",
      },
    },
  },
  plugins: [],
};

export default config;
