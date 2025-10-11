/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/**/*.html"],
  darkMode: "class", // 👈 enable dark mode via class
  theme: {
    extend: {
      colors: {
        background: {
          light: "#ffffff",
          dark: "#0D0D0D",
        },
        mainScreenBackground:{
          light: "#F6F6F6",
          dark: "#1a1818",
        },
        text: {
          light: "#1a202c",
          dark: "#ffffff",
        },
        iconBackground:{
          light:"#EBEBEB66",
          dark: "#56565666"
        },
        borderColor:{
          light: "#E8E8E8",
          dark: "#242424",
        },
        textColor:{
          dark:"#EAEAEA",
          light:"#292D32",
        },
        selectedBackground:{
          light:"#F6F6F6",
          dark:"#2D2D2DDB",
        },
        primary: "#5832E6",
        successBackground: "#23C10A26",
        successText: "#0B8A00",
        errorBackground: "#C10A0A26",
        errorText: "#C71026",
      },
      borderRadius: {
        '15': '15px',
      },
      fontFamily: {
        body: ['Poppins']
      }
    },
  },
  plugins: [],
};
