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
        surface: "#fbf9f6",
        "surface-dim": "#dbdad7",
        "surface-bright": "#fbf9f6",
        "surface-container-lowest": "#ffffff",
        "surface-container-low": "#f5f3f0",
        "surface-container": "#efeeeb",
        "surface-container-high": "#eae8e5",
        "surface-container-highest": "#e4e2df",
        "on-surface": "#1b1c1a",
        "on-surface-variant": "#414844",
        "inverse-surface": "#30312f",
        "inverse-on-surface": "#f2f0ed",
        outline: "#717973",
        "outline-variant": "#c1c8c2",
        "surface-tint": "#3f6653",
        primary: {
          DEFAULT: "#012d1d",
          container: "#1b4332",
          verdant: "#1b4332",
        },
        "on-primary": "#ffffff",
        "on-primary-container": "#86af99",
        secondary: {
          DEFAULT: "#006c48",
          mint: "#52b788",
          container: "#92f7c3",
        },
        "on-secondary": "#ffffff",
        "on-secondary-container": "#00734d",
        tertiary: {
          DEFAULT: "#152b1c",
          container: "#2a4131",
          shoot: "#d8f3dc",
        },
        "on-tertiary": "#ffffff",
        "on-tertiary-container": "#93ad98",
        canvas: "#faf8f5",
        stroke: "#e3dfd5",
      },
      fontFamily: {
        serif: ["'Noto Serif Bengali'", "'Noto Serif'", "serif"],
        sans: ["'Hind Siliguri'", "'Noto Sans Bengali'", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
