/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      screens: {
        'mm': { max: "390px" },
        'mdMAX': { max: "768px" },
        'm8': { min: "815px" },
        'm8Max': { max: "814px" }
      },
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}