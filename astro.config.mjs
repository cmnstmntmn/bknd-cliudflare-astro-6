// @ts-check
import { defineConfig } from "astro/config";
import cloudflare from "@astrojs/cloudflare";

import react from "@astrojs/react";

import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  output: "server",
  integrations: [react()],
  i18n: {
    locales: ["en", "de", "fr", "it"],
    defaultLocale: "en",
  },
  adapter: cloudflare({
    imageService: "cloudflare",
    sessionKVBindingName: "SESSION",
  }),
  vite: {
    clearScreen: true,
    plugins: [tailwindcss()],
    build: {
      minify: true,
    },
  },
});
