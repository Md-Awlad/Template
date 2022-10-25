/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",

  theme: {
    fontFamily: {
      display: ["Open Sans", "sans-serif"],
      body: ["Open Sans", "sans-serif"],
    },

    extend: {
      fontSize: {
        14: "14px",
      },
      backgroundColor: {
        primary: "#5442A8",
        "primary-50": "#faf5ff",
        secondary: "#3678E3",
        accent: "#FDA95B",
        neutral: "#fff",
        "base-100": "#181e2a",
        info: "#3ABFF8",
        success: "#36D399",
        warning: "#FBBD23",
        error: "#F87272",
        customColor: "red",
        "main-bg": "#F2F5F9",
        "main-dark-bg": "#20232A",
        "secondary-dark-bg": "#33373E",
        "light-gray": "#F7F7F7",
        "half-transparent": "rgba(0, 0, 0, 0.5)",
      },
      borderWidth: {
        1: "1px",
      },
      borderColor: {
        primary: "#5442A8",
        secondary: "#3678E3",
        accent: "#FDA95B",
        neutral: "#fff",

        "base-100": "#181e2a",

        info: "#3ABFF8",

        success: "#36D399",

        warning: "#FBBD23",

        error: "#F87272",
      },
      textColor: {
        primary: "#5442A8",
        secondary: "#3678E3",
        accent: "#FDA95B",
        neutral: "#fff",
        "dark-color": "#000",
        "base-100": "#181e2a",
        "gray-600": "#4b5563",
        info: "#3ABFF8",

        success: "#36D399",

        warning: "#FBBD23",

        error: "#F87272",
      },
      boxShadow: {
        primary: "#5442A8",
        secondary: "#3678E3",
        accent: "#FDA95B",
        neutral: "#fff",

        "base-100": "#181e2a",

        info: "#3ABFF8",

        success: "#36D399",

        warning: "#FBBD23",

        error: "#F87272",
      },
      width: {
        400: "400px",
        760: "760px",
        780: "780px",
        800: "800px",
        1000: "1000px",
        1200: "1200px",
        1400: "1400px",
      },
      height: {
        80: "80px",
      },
      minHeight: {
        590: "590px",
      },
      backgroundImage: {
        "hero-pattern":
          "url('https://demos.wrappixel.com/premium-admin-templates/react/flexy-react/main/static/media/welcome-bg-2x-svg.25338f53.svg')",
      },
    },
  },
  plugins: [],
};
