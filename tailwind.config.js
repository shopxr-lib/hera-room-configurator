/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#a4dbd9",
          50: "#e0f7f6",
          100: "#c1efed",
          200: "#a2e7e4",
          300: "#83dfdb",
          400: "#64d7d2",
          500: "#a4dbd9", // DEFAULT
          600: "#45cfc9",
          700: "#36b7b1",
          800: "#279f99",
          900: "#188781",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
