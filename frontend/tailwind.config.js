/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        amarts: {
          primary: "#3C5A4C",
          secondary: "#FFD9D6",
          accent: "#AEC2B1",
          neutral: "#FAF6F3",
          "base-100": "#ffffff",
        },
      },
    ], // we'll customize this later
  },
}

