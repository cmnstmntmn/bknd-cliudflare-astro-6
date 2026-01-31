import { env, waitUntil } from "cloudflare:workers";
import type { APIContext } from "astro";
import { serve } from "bknd/adapter/cloudflare";
import { config } from "../../bknd";

const bkndApp = serve<Env>(config);

export const prerender = false;

export async function ALL({ request }: APIContext) {
  // no execution context
  return bkndApp.fetch(request, env, {
    waitUntil,
    passThroughOnException: () => undefined,
  });
}
