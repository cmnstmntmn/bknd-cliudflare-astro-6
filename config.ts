import { boolean, em, entity, text } from "bknd";
import type { CloudflareBkndConfig } from "bknd/adapter/cloudflare";
import { cloudflareImageOptimization } from "bknd/plugins";
import { secureRandomString } from "bknd/utils";
import schema from "./src/schema";

// // register your schema to get automatic type completion
// type Database = (typeof schema)["DB"];
// declare module "bknd" {
//   interface DB extends Database {}
// }

export default {
  bindings: (env) => ({ db: env.DB }),
  d1: { session: true, transport: "cookie" },
  app: (env) => {
    return {
      config: {
        data: {
          ...schema,
          default_primary_format: "uuid",
        },
        server: {
          mcp: {
            enabled: true,
          },
        },
        auth: {
          enabled: true,
          jwt: {
            issuer: "domzz",
            secret: "anaaremeresipere",
          },
          allow_register: false,
          guard: { enabled: true },
          roles: {
            SYSTEM: {
              is_default: false,
              implicit_allow: false,
              permissions: [
                {
                  permission: "system.access.api",
                },
                {
                  permission: "media.file.read",
                },
                {
                  permission: "data.entity.read",
                },
                {
                  permission: "data.entity.create",
                  policies: [
                    {
                      description: "Can create newsletter entries",
                      condition: {
                        entity: "newsletter",
                      },
                      effect: "allow",
                    },
                  ],
                },
                {
                  permission: "data.entity.update",
                  policies: [
                    {
                      description: "Can update newsletter entries",
                      condition: {
                        entity: "newsletter",
                      },
                      effect: "allow",
                    },
                  ],
                },
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
      },
    };
  },
} satisfies CloudflareBkndConfig;
