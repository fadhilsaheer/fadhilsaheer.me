// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://fadhilsaheer.me",
  trailingSlash: "always",
  prefetch: { prefetchAll: true, defaultStrategy: "viewport" },
  integrations: [react()],
  server: { port: 3000 },
  devToolbar: { enabled: false },
  vite: { plugins: [tailwindcss()] },
});
