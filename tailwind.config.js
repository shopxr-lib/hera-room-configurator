/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: "#a4dbd9",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
