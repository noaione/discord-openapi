import { Snowflake } from "../common";

interface PartialRoleObject {
    /**
     * The role snowflake ID.
     */
    id?: Snowflake;
    /**
     * The role name.
     */
    name?: string;
}

type AuditLogChangeKey =
    "afk_channel_id" |
    "afk_timeout" |
    "allow" |
    "deny" |
    "application_id" |
    "archived" |
    "asset" |
    "auto_archive_duration" |
    "available" |
    "avatar_hash" |
    "banner_hash" |
    "bitrate" |
    "channel_id" |
    "code" |
    "color" |
    "deaf" |
    "default_auto_archive_duration" |
    "default_message_notifications" |
    "description" |
    "discovery_splash_hash" |
    "enable_emoticons" |
    "expire_behavior" |
    "expire_grace_period" |
    "explicit_content_filter" |
    "format_type" |
    "guild_id" |
    "hoist" |
    "icon_hash" |
    "id" |
    "inviter_id" |
    "locked" |
    "max_age" |
    "max_uses" |
    "mentionable" |
    "mfa_level" |
    "mute" |
    "name" |
    "nick" |
    "nsfw" |
    "owner_id" |
    "permission_overwrites" |
    "permissions" |
    "position" |
    "preferred_locale" |
    "privacy_level" |
    "prune_delete_days" |
    "public_updates_channel_id" |
    "rate_limit_per_user" |
    "region" |
    "rules_channel_id" |
    "splash_hash" |
    "system_channel_id" |
    "tags" |
    "temporary" |
    "topic" |
    "type" |
    "unicode_emoji" |
    "user_limit" |
    "uses" |
    "vanity_url_code" |
    "verification_level" |
    "widget_channel_id" |
    "widget_enabled" |
    "$add" |
    "$remove";


interface AuditLogChange {
    /**
     * The new value of the key
     */
    new_value?: string | number | boolean | null | Snowflake | PartialRoleObject[];
    /**
     * The old value of the key
     */
    old_value?: string | number | boolean | null | Snowflake | PartialRoleObject[];
    /**
     * The key name that got changed.
     * Refer to https://discord.com/developers/docs/resources/audit-log#audit-log-change-object-audit-log-change-key
     * for more information on what every key contains.
     */
    key: AuditLogChangeKey;
}

interface AuditLogChangeOptional {
    /**
     * Channels in which the entities is targeted.
     */
    channel_id?: Snowflake;
    /**
     * Numbers of entities that are targeted.
     */
    count?: string;
    /**
     * Numbers of days after which inactive members were kicked
     */
    delete_member_days?: string;
    /**
     * ID of the overwritten entity
     */
    id?: Snowflake;
    /**
     * Number of members removed by the prune
     */
    members_removed?: string;
    /**
     * ID of the message that was targeted
     */
    message_id?: Snowflake;
    /**
     * Name of the role if type is "0" (not present if type is "1")
     */
    role_name?: string;
    /**
     * Type of overwritten entity - "0" for "role" or "1" for "member"
     */
    type?: "0" | "1"
}

interface AuditLogEntry {
    /**
     * ID of the affected entity (webhook, user, role, etc.)
     */
    target_id?: string;
    /**
     * Changes made into target_id
     */
    changes?: AuditLogChange[];
    /**
     * The user who made the changes
     */
    user_id?: Snowflake;
    /**
     * Type of action that occured.
     * https://discord.com/developers/docs/resources/audit-log#audit-log-entry-object-audit-log-events
     */
    action_type?: number;
    /**
     * The optional audit entry information.
     */
    options?: AuditLogChangeOptional | null;
    /**
     * The reason for the changes.
     */
    reason?: string;
}

export interface AuditLogResponse {
    /**
     * List of audit log entries.
     */
    audit_log_entries: AuditLogEntry[];
}
