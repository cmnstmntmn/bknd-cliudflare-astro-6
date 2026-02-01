import { entity, enumm, text } from "bknd";

export default {
  newsletter: entity(
    "newsletter",
    {
      email: text().required(),
      role: enumm({
        label: "Role",
        enum: ["architect", "studio", "student", "other"],
        default_value: "other",
      }).required(),
      contact_id: text(),
    },
    {
      primary_format: "uuid",
      name: "Newsletter",
      name_singular: "Newsletter",
      description: "Occasional notes, announcements, and selected work.",
    },
  ),
};
