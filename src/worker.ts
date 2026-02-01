import handler from "@astrojs/cloudflare/entrypoints/server";
import { serve } from "bknd/adapter/cloudflare";
import { config } from "./bknd";

// -- Initialize bknd Cloudflare handler
const bkndApp = serve<Env>(config);

// -- Export default Worker
export default {
  async fetch(
    request: Request,
    env: Env,
    ctx: ExecutionContext,
  ): Promise<Response> {
    const url = new URL(request.url);

    // -- Proxy API calls to bknd
    if (url.pathname.startsWith("/api")) {
      return bkndApp.fetch(request, env, ctx);
    }

    // -- Return Astro handler
    return handler.fetch(request as any, env, ctx);
  },
} satisfies ExportedHandler<Env>;
