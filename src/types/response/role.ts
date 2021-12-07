import { Int32 } from "@airtasker/spot";
import { Snowflake } from "../common";
import { PermissionBit } from "./permissions";

export interface RoleTagObject {
    /**
     * The id of the bot this role belongs to
     */
    bot_id?: Snowflake;
    /**
     * The id of the integration this role belongs to
     */
    integration_id?: Snowflake;
    /** 
     * Whether this is the guild's premium subscriber role
     */
    premium_subscriber?: boolean;
}

export interface RoleObject {
    /**
     * The Role ID
     */
    id: Snowflake;
    /**
     * The Role name
     */
    name: string;
    /**
     * Integer representation of the role color, default to 0 (for no color)
     */
    color: Int32;
    /**
     * If this role is pinned in the user listing
     */
    hoist: boolean;
    /**
     * Role icon hash
     * Guild must be boosted to level 2 to have this.
     */
    icon?: string | null;
    /**
     * Role unicode emoji
     * Guild must be boosted to level 2 to have this.
     */
    unicode_emoji?: string | null;
    /**
     * The position of the role
     */
    position: Int32;
    /**
     * The permission set for the role
     */
    permissions: PermissionBit;
    /**
     * Is the role managed by an integration or not?
     */
    managed: boolean;
    /**
     * Whether the role can be mentioned by anyone or not
     */
    mentionable: boolean;
    /**
     * The tags this role has
     */
    tags?: RoleTagObject;
}