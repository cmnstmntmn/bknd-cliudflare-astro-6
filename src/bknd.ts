import type { APIContext } from "astro";
import { createApp } from "bknd/adapter/cloudflare";
import config from "../config";
import type { ApiOptions } from "bknd/client";
import type { App } from "bknd";
import { env } from "cloudflare:workers";

export { config };

let app: App;
export async function getApp(request: APIContext) {
  if (!app) {
    app = await createApp(
      {
        ...config,
        adminOptions: {
          adminBasepath: "/admin",
          logoReturnPath: "/../",
        },
      },
      { env, request },
    );
  }
  return app;
}

export async function getApi(
  request: APIContext,
  options: ApiOptions = {},
  verify = false,
) {
  const app = await getApp(request);
  const api = app.getApi(options);

  if (verify && options.headers) {
    await api.verifyAuth();
  }
  return api;
}
