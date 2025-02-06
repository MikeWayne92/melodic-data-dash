import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        mint: {
          light: "#B4F1E0",
          DEFAULT: "#9FEDD7",
          dark: "#8AD9C3",
        },
        neogray: {
          light: "#F4F6F9",
          DEFAULT: "#E0E5EC",
          dark: "#A3B1C6",
        },
      },
      boxShadow: {
        'neomorph': '9px 9px 16px rgb(163,177,198,0.6), -9px -9px 16px rgba(255,255,255, 0.5)',
        'neomorph-inset': 'inset 9px 9px 16px rgb(163,177,198,0.6), inset -9px -9px 16px rgba(255,255,255, 0.5)',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;