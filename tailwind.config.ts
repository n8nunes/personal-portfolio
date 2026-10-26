import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      colors: {
        ink: "#13203a",
        sky: "#7fb8ec",
        dawn: "#c4e3fb",
        peach: "#ffe2c4",
        paper: "#f6f9fd",
        accent: "#4338ca",
      },
    },
  },
  plugins: [],
};

export default config;
