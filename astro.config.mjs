// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://fadhilsaheer.me",
  integrations: [react()],
  server: { port: 3000 },
  devToolbar: { enabled: false },
  vite: { plugins: [tailwindcss()] },
});
