import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "mc-brown": "#624D4D",
        "mc-green": "#B7DE7E",
        "mc-pink": {
          200: "#FFD7D7",
          300: "#DE7E7E",
          400: "#F74848",
        },
        "mc-orange": {
          200: "#FDD6AE",
          300: "#EC9244",
          400: "#F77A48",
        },
      },
      fontFamily: {
        sans: ["var(--font-goldman)", ...fontFamily.sans],
      }
    },
  },
  plugins: [],
} satisfies Config;
