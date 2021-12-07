import { Snowflake } from "../common";

/**
 * A permission bit set.
 */
export type PermissionBit = string;

export interface PermissionsOverwriteObject {
    /**
     * The target ID for the permission overwrite
     */
    id: Snowflake;
    /**
     * The overwrite type.
     * 0 for role, 1 for member
     */
    type: 0 | 1;
    /**
     * The permissions to allow
     */
    allow: PermissionBit;
    /**
     * The permissions to deny
     */
    deny: PermissionBit;
}