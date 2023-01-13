/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        dark: "#1E1E24",
        "navbar-dark": "#1A1A1F",
        "split-red": "#6C100A",
        "white-custom": "#FFF8F0",
        "theme-background": "rgba(84, 12, 7, 0.5)",
      },
      backgroundImage: (theme) => ({
        "gradient-primary": `linear-gradient(290deg, #6C100A calc(50% - 5px), #1E1E24 calc(50% - 1px))`,
      }),
    },
  },
  plugins: [require("tailwind-scrollbar")],
};

// npx tailwindcss -i ./src/index.css -o ./public/output.css --watch
