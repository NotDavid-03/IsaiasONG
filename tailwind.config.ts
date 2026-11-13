import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        isaias: {
          cyan: "#00AEEF",
          "cyan-dark": "#008ec4",
          "cyan-light": "#e0f6fe",
          red: "#EF4444",
          "red-dark": "#dc2626",
          "red-light": "#fee2e2",
          yellow: "#FBBF24",
          "yellow-dark": "#F59E0B",
          "yellow-light": "#fef3c7",
          dark: "#111827",
          gray: "#4B5563",
          light: "#F9FAFB",
        },
      },
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          '"Segoe UI"',
          "Roboto",
          '"Helvetica Neue"',
          "Arial",
          "sans-serif",
        ],
        display: [
          '"Trebuchet MS"',
          "-apple-system",
          "BlinkMacSystemFont",
          '"Segoe UI"',
          "Roboto",
          "sans-serif",
        ],
      },
    },
  },
  plugins: [],
};
export default config;
