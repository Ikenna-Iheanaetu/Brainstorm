/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        satoshi: ["Satoshi", "sans-serif"],
        inter: ["Inter", "sans-serif"],
      },
      colors: {
        base: {
          background: '#0C0A09'
        },
        primary: {
          DEFAULT: "#FAFAF9",
          foreground: "#A1A1AA",
        },
        secondary: {
          DEFAULT: "#9999A2",
          foreground: "hsl(24, 9.8%, 10%)",
        },
        button: {
          DEFAULT: "#fafafa",
          text: "#18181B",
        },
        accent: {
          DEFAULT: "hsl(60, 4.8%, 95.9%)",
          foreground: "hsl(24, 9.8%, 10%)",
        },
        destructive: {
          DEFAULT: "hsl(0, 84.2%, 60.2%)",
          foreground: "hsl(60, 9.1%, 97.8%)",
        },
        borderColor: "hsl(20, 5.9%, 90%)",
        input: "hsl(20, 5.9%, 90%)",
        ring: "hsl(20, 14.3%, 4.1%)",
      },
      borderRadius: {
        DEFAULT: "0.5rem",
      },
    },
  },
  plugins: [],
};
