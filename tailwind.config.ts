import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        toast: {
          '0%, 100%': { opacity: '0', transform: 'translateY(100%)' },
          '2.5%, 97.5%': { opacity: '1', transform: 'translateY(-1rem)' },
        },
      },
      animation: {
        toast: 'toast 10s ease-in-out forwards'
      },
      colors: {
        "mc-gray": {
          100: "#D9D9D9",
          200: "#EFE8DD",
        },
        "mc-purple": {
          300: "#EAE1EC",
          400: "#CFC1D1",
        },
        "mc-brown": {
          300: "#624D4D",
          400: "#4E3939",
          500: "#865f66",
        },
        "mc-mahogany": {
          200: "#bba8a8",
          300: "#8C4848",
        },
        "mc-green": {
          100: "#BBBBA8",
          200: "#B7DE7E",
        },
        "mc-rose": {
          200: "#F6E7E7",
          300: "#FDD9D9",
          400: "#E7C1C1",
        },
        "mc-pink": {
          200: "#FFD7D7",
          300: "#DE7E7E",
          400: "#F74848",
        },
        "mc-orange": {
          200: "#FDD6AE",
          300: "#EC9244",
          350: "#ECAD73",
          400: "#F77A48",
        },
      },
      fontFamily: {
        sans: ["var(--font-goldman)", ...fontFamily.sans],
      },
    },
  },
  plugins: [],
} satisfies Config;
