import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        vanilla: "#FDF5E6",
        olive: "#556B2F",
        orange: "#FF8C00",
      },
    },
  },
  plugins: [],
};

export default config;
