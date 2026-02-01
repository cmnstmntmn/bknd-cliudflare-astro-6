import { medium, systemEntity } from "bknd";

export default {
  users: systemEntity(
    "users",
    {
      avatar: medium(),
    },
    { primary_format: "uuid" },
  ),
};
