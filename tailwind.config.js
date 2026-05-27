/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#12213a",
        fluidBlue: "#2664a9",
        fluidYellow: "#ffe36e"
      }
    }
  },
  plugins: []
};
