// @ts-ignore
import daisyui from "daisyui";


/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: { fontFamily: {
      sakura: ["Mochiy Pop P One", "sans-serif"],
      elegant: ["Sawarabi Mincho", "serif"],
    }},
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        night: {
          "primary": "#de1614",   // custom red
          "secondary": "#FF6723", // custom orange
          "accent": "#ff9e64",
          "neutral": "#1d1f21",
          "base-100": "#0f1115",
          "info": "#3abff8",
          "success": "#36d399",
          "warning": "#fbbd23",
          "error": "#f87272",
        },
      },
    ],
  },
};
