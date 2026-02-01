import { datetime, entity, enumm, number, text } from "bknd";

export default {
  subscriptions: entity(
    "subscriptions",
    {
      provider: enumm({
        label: "Provider",
        enum: ["polar"],
        default_value: "polar",
      }),
      provider_subscription_id: text({
        label: "Provider Subscription ID",
      }).required(),
      plan: enumm({
        label: "Plan",
        enum: ["solo", "studio"],
        default_value: "solo",
      }),
      seats: number({
        minimum: 1,
        maximum: 10,
      }),
      status: enumm({
        label: "Status",
        enum: ["active", "past_due", "canceled"],
        default_value: "active",
      }),
      start_date: datetime({
        label: "Start",
      }),
      end_date: datetime({
        label: "End",
      }),
    },
    {
      primary_format: "uuid",
      name: "Subscriptions",
      name_singular: "Subscription",
      description: "Controls a tenant’s billing and access entitlements.",
    },
  ),
};
