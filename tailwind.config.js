/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        lg: "1081px",
      },
      colors: {
        'lite-green': '#cbefa4',
      },
    },
    plugins: [],
  },
};
