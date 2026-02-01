import { em } from "bknd";
import media from "./media";
import memberships from "./memberships";
import newsletter from "./newsletter";
import subscriptions from "./subscriptions";
import tenants from "./tenants";
import users from "./users";

export default em(
  {
    ...media,
    ...users,
    ...tenants,
    ...memberships,
    ...subscriptions,
    ...newsletter,
    // ...services,
    // ...team,
    // ...movies,
    // ...locations,
    // ...snippets,
  },
  (
    { relation, index },
    { users, media, tenants, memberships, subscriptions, newsletter },
  ) => {
    // indices

    relation(tenants).oneToOne(users, {
      required: true,
    });
    relation(memberships)
      .oneToOne(tenants, {
        required: true,
      })
      .oneToOne(users, {
        required: true,
      });

    relation(subscriptions).oneToOne(tenants, {
      required: true,
    });
    //
    //

    index(tenants).on(["slug"], true);
    index(tenants).on(["domain"], true);
    index(tenants).on(["slug", "domain"], true);
    index(newsletter).on(["email"], true);

    // index(pages).on(["order"]);
    // index(pages).on(["route"], true);
    // index(services).on(["active"]);
    // index(services).on(["order"]);
    // index(snippets).on(["handle"], true);
    // index(team).on(["active"]);
    // index(team).on(["order"]);
    // index(movies).on(["active"]);
    // index(movies).on(["order"]);
    // index(locations).on(["active"]);
    // index(locations).on(["order"]);
    // relations
    // relation(pages).polyToOne(media, {
    //   mappedBy: "cover",
    // });
    // relation(pages).polyToMany(media, {
    //   mappedBy: "gallery",
    // });
    // relation(team).polyToOne(media, {
    //   mappedBy: "avatar",
    // });
    // relation(movies).polyToOne(media, {
    //   mappedBy: "poster",
    // });
    // relation(locations).polyToMany(media, {
    //   mappedBy: "gallery",
    // });
  },
).toJSON();
