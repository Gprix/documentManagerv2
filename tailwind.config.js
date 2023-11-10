/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#fbfbfe",
        // primary: "#fc6499",
        secondary: "#d69f1f",
        accent: "#2f0e0f",
        // primary: "#ff4d85",
        primaryMedium: "#ff99b3",
        primaryLight: "#ffdbe6",
        primaryExtraLight: "#fff4f7",
        primaryDark: "#e60052",
        // secondary: "#8ba0fd",
        secondaryLight: "#f0f3ff",
        error: "#e06767",
        dimmed: "hsla(0, 0%, 0%, 0.3)",
        // text variants
        label: "hsla(0, 0%, 0%, 0.7)",
        placeholder: "hsla(0, 0%, 0%, 0.25)",
        // backdrop variants
        glass: "hsla(0, 0%, 100%, 0.1)",
        focus: "hsla(0, 0%, 0%, 0.35)",

        // TEST ELEVATIONS (DARK)
        accent: "hsla(339, 90%, 38%, 1)",
        bck: "hsla(0,0%,4%,1)",
        "bck-negative": "hsla(0, 0%, 96%, 1)",
        surf: "hsla(0,0%,10%,1)",
        "surf-alt": "hsla(240,2%,17%,1)",
        "surf-contrast": "hsla(0,0%,36%,1)",
        "surf-semi-contrast": "hsla(0,0%,20%,1)",
        highlight: "hsla(0,0%,42%,1)",
        txt: "hsla(0, 24%, 88%, 1)",
        "txt-accent": "hsla(339, 100%, 57%, 1)",
        "txt-negative": "hsla(0, 52%, 12%, 1)",

        // TEST ELEVATIONS (LIGHT)
        // bck: "hsla(0, 0%, 96%, 1)",
        // surf: "hsla(0, 0%, 90%, 1)",
        // "surf-alt": "hsla(240, 2%, 83%, 1)",
        // highlight: "hsla(0, 0%, 58%, 1)",
        // txt: "hsla(0, 52%, 12%, 1)",
      },
      fontFamily: {
        document: ["var(--font-document)"],
        regular: ["var(--font-regular)"],
        medium: ["var(--font-medium)"],
        bold: ["var(--font-bold)"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      animation: {
        "fade-in": "fade-in 0.5s ease-in-out",
        "slide-to-left": "slide-to-left 0.5s ease-in-out",
        page: "fade-in 0.4s cubic-bezier(0.4, 0, 0.2, 1), slide-to-left 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
        modal:
          "fade-in 0.2s cubic-bezier(0.4, 0, 0.2, 1), scale-up 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
        "slide-to-bottom": "slide-to-bottom 0.5s ease-in-out",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "slide-to-left": {
          "0%": { transform: "translateX(-4rem)" },
          "100%": { transform: "translateX(0rem)" },
        },
        "slide-to-bottom": {
          "0%": { transform: "translateY(-4rem)" },
          "100%": { transform: "translateY(0rem)" },
        },
        "scale-up": {
          "0%": { transform: "scale(0.9)" },
          "100%": { transform: "scale(1)" },
        },
      },
    },
  },
  plugins: [],
};
