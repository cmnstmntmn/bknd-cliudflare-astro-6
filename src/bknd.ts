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

export async function getApi(astro: AstroGlobal, opts: { system: boolean }) {
  const app = await getApp(astro.locals.cfContext);
  if (opts.system) {
    const systemApi = app.getApi({ token: env.SYSTEM_USER_TOKEN });
    await systemApi.verifyAuth();

    return systemApi;
  }

  const api = app.getApi({ headers: astro.request.headers });
  await api.verifyAuth();

  return api;
}
