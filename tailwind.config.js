/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        color: {
          gray1: '#2A2A2A',
          gray2: '#303030',
          gray3: '#373737',
          white: '#ECECEC',
          purple: '#8878F0',
          green: '#46EA8D',
          red: '#EE2F32',
          warning: "#EAE546",
        }
      }
    },
  },
  plugins: [],
}

