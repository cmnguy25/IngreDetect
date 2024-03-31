/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        beige: "#DDD0C8",
        "dark-grey": "#323232",
      },
    },
  },
  plugins: [require("@tailwindcss/forms"), require("@headlessui/react")],
};
