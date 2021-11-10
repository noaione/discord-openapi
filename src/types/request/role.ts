import { B64StringFile } from "../common";

export interface GuildRoleBody {
    /**
     * Name of the role
     * @default "new role"
     */
    name?: string;
    /**
     * RGB color value
     * @default 0
     */
    color?: number;
    /**
     * Whether the role should be displayed separately in the sidebar
     * @default false
     */
    hoist?: boolean;
    /**
     * The role's icon image (if the guild has the `ROLE_ICONS` feature)
     */
    icon?: B64StringFile | null;
    /**
     * The role's unicode emoji as a standard emoji (if the guild has the ROLE_ICONS feature)
     */
    unicode_emoji?: string | null;
    /**
     * Bitwise value of the enabled/disabled permissions.
     */
    permissions?: string;
    /**
     * Whether the role should be mentionable.
     * @default false
     */
    mentionable?: boolean;
}