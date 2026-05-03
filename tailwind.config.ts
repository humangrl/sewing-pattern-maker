import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          "0": "#000000",
          "10": "#001a42",
          "20": "#002e6a",
          "30": "#12448f",
          "40": "#325ca8",
          "50": "#4e76c3",
          "60": "#6990df",
          "70": "#84aafb",
          "80": "#aec6ff",
          "90": "#d8e2ff",
          "95": "#edf0ff",
          "98": "#f9f9ff",
          "99": "#fefbff",
        },
        secondary: {
          "10": "#141b2c",
          "20": "#293041",
          "30": "#3f4759",
          "40": "#575e71",
          "50": "#6f778b",
          "70": "#a4abc0",
          "80": "#bfc6dc",
          "90": "#dbe2f9",
          "95": "#edf0ff",
        },
        neutral: {
          "5": "#101114",
          "10": "#1b1b1f",
          "20": "#303034",
          "30": "#46464a",
          "50": "#77777a",
          "70": "#ababaf",
          "90": "#e3e2e6",
          "95": "#f2f0f4",
          "98": "#faf8fd",
          "99": "#fefbff",
        },
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        serif: ["Lora", "ui-serif", "Georgia", "serif"],
      },
      backgroundImage: {
        "hero-gradient":
          "linear-gradient(135deg, #edf0ff 0%, #d8e2ff 50%, #bfc6dc 100%)",
      },
      animation: {
        "spin-slow": "spin 2s linear infinite",
        "fade-in": "fadeIn 0.4s ease-out",
        "slide-up": "slideUp 0.4s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
