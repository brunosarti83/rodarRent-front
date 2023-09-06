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
        landingDesktop:'5.4rem',
        landingLaptop:'4.4rem'
      },
      height:{
        landingDesktop:'770px',
        landingLaptop:'560px',
        noNavDesktop:'93.1vh',
        noNavLaptop:'91.2vh',
        form:'738px',
        card:'328px'
      },
      width:{
        '100':'29rem',
        '120':'39rem',
        card: '400px'
      },
      colors:{
        'blue':'#163C85',
        'red':'#C70039'
      }
    },
    fontFamily:{
      poppins:["poppins","sans-serif"]
    },

  },
  plugins: [],
}