import type { DB } from "bknd";
import type { Insertable, Selectable, Updateable, Generated } from "kysely";

declare global {
  type BkndEntity<T extends keyof DB> = Selectable<DB[T]>;
  type BkndEntityCreate<T extends keyof DB> = Insertable<DB[T]>;
  type BkndEntityUpdate<T extends keyof DB> = Updateable<DB[T]>;
}

/**
 * Represents a workspace that users belong to and subscriptions apply to.
 */
export interface Tenants {
  id: Generated<string>;
  slug: string;
  domain?: string;
  name: string;
  plan?: "solo" | "studio";
  status?: "active" | "suspended" | "archived";
  users_id: string;
  users?: DB["users"];
  memberships?: Memberships;
  subscriptions?: Subscriptions;
}

/**
 * Represents a user’s role and participation within a tenant.
 */
export interface Memberships {
  id: Generated<string>;
  role?: "owner" | "admin" | "member";
  status?: "active" | "invited" | "removed";
  tenants_id: string;
  users_id: string;
  tenants?: Tenants;
  users?: DB["users"];
}

/**
 * Controls a tenant’s billing and access entitlements.
 */
export interface Subscriptions {
  id: Generated<string>;
  provider?: "polar";
  provider_subscription_id: string;
  plan?: "solo" | "studio";
  seats?: number;
  status?: "active" | "past_due" | "canceled";
  start_date?: Date | string;
  end_date?: Date | string;
  tenants_id: string;
  tenants?: Tenants;
}

/**
 * Occasional notes, announcements, and selected work.
 */
export interface Newsletter {
  id: Generated<string>;
  email: string;
  role: "architect" | "studio" | "student" | "other";
  contact_id?: string;
}

interface Database {
  tenants: Tenants;
  memberships: Memberships;
  subscriptions: Subscriptions;
  newsletter: Newsletter;
}

declare module "bknd" {
  interface Users {
    tenants?: Tenants;
    memberships?: Memberships;
  }

  interface DB extends Database {}
}