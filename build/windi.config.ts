import { defineConfig } from "windicss/helpers";

export default defineConfig({
  extract: {
    include: ["**/*.{html,jsx,tsx}"],
    exclude: ["node_modules", ".git"],
  },
});
