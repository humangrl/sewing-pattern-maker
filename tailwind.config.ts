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
        hg: {
          bg:        "#f6f0dc",
          "bg-el":   "#fbf6e6",
          "bg-sun":  "#ebe0bf",
          surface:   "#fffdf3",
          blue:      "#2c5fb3",
          "blue-lt": "#6f9ddb",
          "blue-dk": "#1c3f7c",
          lime:      "#cfd64a",
          "lime-dk": "#b3bb35",
          text:      "#1f2a4a",
          "text-2":  "#4a5374",
          muted:     "#8a8fa6",
          rose:      "#d97e8a",
        },
      },
      fontFamily: {
        display: ["Silkscreen", "Kuchibue", "Courier New", "monospace"],
        ui:      ["VT323", "rainyhearts", "Courier New", "ui-monospace", "monospace"],
        body:    ["Quicksand", "ui-rounded", "Hiragino Maru Gothic ProN", "system-ui", "sans-serif"],
      },
      boxShadow: {
        "hg-sm": "2px 2px 0 rgba(28, 36, 60, 0.12)",
        "hg":    "3px 3px 0 rgba(28, 36, 60, 0.12)",
      },
      animation: {
        "blink":        "blink 1s steps(2) infinite",
        "sparkle":      "sparklePulse 3s ease-in-out infinite",
        "gentle-spin":  "gentleSpin 20s linear infinite",
        "gentle-float": "gentleFloat 4s ease-in-out infinite",
        "slide-up":     "slideUp 0.25s ease-out",
        "fade-in":      "fadeIn 0.35s ease-out",
        "spin-slow":    "spin 2s linear infinite",
      },
      keyframes: {
        blink: {
          "0%, 49%":   { opacity: "1" },
          "50%, 100%": { opacity: "0" },
        },
        sparklePulse: {
          "0%, 100%": { opacity: "0.3", transform: "scale(1)" },
          "50%":      { opacity: "0.8", transform: "scale(1.2)" },
        },
        gentleSpin: {
          "0%":   { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        gentleFloat: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%":      { transform: "translateY(-6px)" },
        },
        slideUp: {
          "0%":   { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%":   { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
