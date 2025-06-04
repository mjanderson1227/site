import { type Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
  content: ["./src/**/*.{html,js,ts,jsx,tsx,svelte,astro}"],
  theme: {
    extend: {},
  },
  plugins: [typography],
};

export default config;
