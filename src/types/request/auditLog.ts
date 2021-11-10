import type { Snowflake } from "../common";
import { Int32 } from "@airtasker/spot";

export interface GETAuditLogsQuery {
    /**
     * Filter the log for actions made by user.
     */
    user_id?: Snowflake;
    /**
     * The type of audit log event.
     */
    action_type?: Int32;
    /**
     * Filter the log before certain entry ID.
     */
    before?: Snowflake;
    /**
     * The limit that the API should return.
     * Minimum of 1, and maximum of 100
     * @oaSchemaProp minimum
     * 1
     * @default 50
     * @oaSchemaProp maximum
     * 100
     */
    limit?: Int32;
}
