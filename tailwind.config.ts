import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#4A3F6B",
          50: "#F5F3F8",
          100: "#EBE8F1",
          200: "#D5D0E3",
          300: "#BFB8D5",
          400: "#A99FC7",
          500: "#9387B9",
          600: "#7D6EAB",
          700: "#67589A",
          800: "#4A3F6B",
          900: "#3D3357",
          950: "#2D2A32",
        },
        accent: {
          DEFAULT: "#E8A838",
          50: "#FDF6E8",
          100: "#FBEDCF",
          200: "#F7DBA1",
          300: "#F3C96F",
          400: "#EFB73D",
          500: "#E8A838",
          600: "#B8862D",
          700: "#886422",
          800: "#584317",
          900: "#28210B",
        },
        cream: {
          DEFAULT: "#FAF8F5",
          50: "#FFFFFF",
          100: "#FAF8F5",
          200: "#F5F1EC",
          300: "#EFE9E2",
          400: "#E9E1D9",
          500: "#E3D9D0",
        },
        charcoal: "#2D2A32",
      },
      fontFamily: {
        serif: ["Georgia", "Cambria", "serif"],
        sans: ["system-ui", "-apple-system", "sans-serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;