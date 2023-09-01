/** @type {import('tailwindcss').Config} */
export default {
  darkMode:'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontSize:{
        landingDesktop:'5rem',
        landingLaptop:'4.4rem'
      },
      height:{
        landingDesktop:'690px',
        landingLaptop:'560px',
        noNavDesktop:'93.1vh',
        noNavLaptop:'91.2vh',
        form:'738px'
      },
      width:{
        '100':'29rem'
      },
      colors:{
        'blue':'#163C85',
      }
    },
    fontFamily:{
      poppins:["poppins","sans-serif"]
    },

  },
  plugins: [],
}