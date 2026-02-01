import { entity, enumm, text } from "bknd";

export default {
  tenants: entity(
    "tenants",
    {
      slug: text({}).required(),
      domain: text(),
      name: text().required(),
      plan: enumm({
        label: "Plan",
        enum: ["solo", "studio"],
        default_value: "solo",
      }),
      status: enumm({
        label: "Status",
        enum: ["active", "suspended", "archived"],
        default_value: "active",
      }),
    },
    {
      primary_format: "uuid",
      name: "Tenants",
      name_singular: "Tenant",
      description: "Represents a workspace that users belong to and subscriptions apply to.",
    },
  ),
};
