// import { env } from "cloudflare:workers";
import { boolean, em, entity, text } from "bknd";
import type { CloudflareBkndConfig } from "bknd/adapter/cloudflare";
import { cloudflareImageOptimization } from "bknd/plugins";
// import { d1 } from "bknd/adapter/cloudflare";

import { secureRandomString } from "bknd/utils";
// import { env } from "cloudflare:workers";

const schema = em({
  todos: entity("todos", {
    titles: text(),
    done: boolean(),
  }),
});

// register your schema to get automatic type completion
type Database = (typeof schema)["DB"];
declare module "bknd" {
  interface DB extends Database {}
}

export default {
  bindings: (env) => ({ db: env.DB }),
  d1: { session: true, transport: "cookie" },
  app: (env) => {
    return {
      // in production mode, we use the appconfig.json file as static config
      config: {
        data: schema.toJSON(),
        server: {
          mcp: {
            enabled: true,
          },
        },
        auth: {
          enabled: false,
          jwt: {
            issuer: "domzz",
            secret: secureRandomString(64),
          },
          guard: { enabled: true },
          roles: {
            EDITOR: {
              is_default: true,
              implicit_allow: false,
              permissions: [
                "system.access.api",
                "media.file.read",
                "data.entity.read",
              ],
            },
            ADMIN: {
              implicit_allow: true,
            },
          },
        },
        media: {
          enabled: true,
          adapter: {
            type: "r2",
            config: {
              binding: "BUCKET",
            },
          },
        },
      },
      options: {
        mode: "code",
        plugins: [
          cloudflareImageOptimization({
            accessUrl: "/api/_plugin/image/optimize",
            explain: true,
          }),
        ],
      },
      onBuilt: async (app) => {
        console.log("On build");

        //const hono = app.server;
        //hono.get("/hello", (c) => c.text("Hello from bknd hono route"));
      },
    };
  },
} satisfies CloudflareBkndConfig;
