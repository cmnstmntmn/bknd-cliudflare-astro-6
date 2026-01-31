import type { AstroGlobal } from "astro";
import { createApp } from "bknd/adapter/cloudflare";
import config from "../config";
import type { App } from "bknd";
import { env } from "cloudflare:workers";

export { config };

let app: App;
export async function getApp(ctx: ExecutionContext) {
  if (!app) {
    app = await createApp(
      {
        ...config,
        adminOptions: {
          adminBasepath: "/admin",
          logoReturnPath: "/../",
        },
      },
      { env, ctx },
    );
  }
  return app;
}

export async function getApi(
  astro: AstroGlobal,
  opts?: { mode: "static" } | { mode?: "dynamic"; verify?: boolean },
) {
  const app = await getApp(astro.locals.cfContext);
  if (opts?.mode !== "static" && opts?.verify) {
    const api = app.getApi({ headers: astro.request.headers });
    await api.verifyAuth();
    return api;
  }
  return app.getApi();
}
