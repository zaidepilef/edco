import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://zaidepilef.github.io/edco/",
  base: "/edco/",
  output: "static",
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
    server: {
      allowedHosts: [
        ".trycloudflare.com"
      ]
    }
  }
});