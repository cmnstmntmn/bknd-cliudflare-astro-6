// @ts-check
import { defineConfig } from "astro/config";
import cloudflare from "@astrojs/cloudflare";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  output: "server",
  integrations: [react()],
  adapter: cloudflare({
    workerEntryPoint: {
      path: "src/worker.ts", // our custom entry
    },
    imageService: "cloudflare",
    sessionKVBindingName: "SESSION",
  }),
});
