module.exports = {
  content: ["./src/pages/**/*.{ts,tsx}", "./src/components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        gray: {
          950: "#18181b",
        },
      },
    },
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#dc8f8f",
          "base-100": "#313131",
          "neutral": "#4c3f3f",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
