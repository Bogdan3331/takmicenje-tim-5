module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        driveIn: {
          "0%": { transform: "translateX(-100vw)" },
          "100%": { transform: "translateX(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        driveIn: "driveIn 2s ease-out forwards",
        fadeIn: "fadeIn 3s ease-out forwards",
      },
    },
  },
  plugins: [],
};
