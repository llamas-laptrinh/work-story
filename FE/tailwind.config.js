/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        primary: ["Rubik Wet Paint", "system-ui"],
      },
      backgroundColor: {
        primary: "#ffc809",
      },
    },
  },
  plugins: [],
};
