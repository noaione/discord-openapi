import { String, Int32, DateTime } from "@airtasker/spot";

export type Nullable<T> = T | null;

export interface ErrorResponse {
    /**
     * The error code of the error.
     */
    code: Int32;
    /**
     * The more detailed information of where the error occurred.
     * Usually it's the fault in your request body.
     */
    errors: {};
    /**
     * The error message.
     */
    message: String;
}

export interface DefaultHeaders {
    /**
     * The user agent of the client. You must follow this format.
     * Where the user agent format is `DiscordBot ($url, $version)`.
     */
    "User-Agent": "DiscordBot (https://github.com/noaione/discord-openapi, 1.0)"
}

export interface AuditHeader {
    /**
     * This endpoint support adding reason to audit log with this header.
     */
    "X-Audit-Log-Reason": String;
}

/**
 * A snowflake or ID for identifying unique object in Discord.
 */
export type Snowflake = String;
/**
 * A list of Snowflake
 */
export type Snowflakes = Snowflake[];
/**
 * An ISO8601 compliant timestamp.
 */
export type ISO8601 = DateTime;
/**
 * A base64 encoded file
 */
export type B64StringFile = string;
