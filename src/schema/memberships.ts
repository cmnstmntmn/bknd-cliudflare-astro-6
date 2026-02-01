import { entity, enumm } from "bknd";

export default {
  memberships: entity(
    "memberships",
    {
      role: enumm({
        label: "Role",
        enum: ["owner", "admin", "member"],
        default_value: "owner",
      }),
      status: enumm({
        label: "Status",
        enum: ["active", "invited", "removed"],
        default_value: "active",
      }),
    },
    {
      primary_format: "uuid",
      name: "Memberships",
      name_singular: "Membership",
      description: "Represents a user’s role and participation within a tenant.",
    },
  ),
};
