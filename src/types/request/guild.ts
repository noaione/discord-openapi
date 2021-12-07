import { Snowflake, B64StringFile } from "../common";

import { ChannelGuildMessageBody } from "./channel";
import { GuildRoleBody } from "./role";

/**
 * The verification level of the guild.
 * 0 is none, 1 is low, 2 is medium, 3 is high, 4 is very high.
 */
export type VerificationLevel = 0 | 1 | 2 | 3 | 4;
/**
 * The default message notification level of the guild.
 * 0 is all messages, 1 is only mentions.
 */
export type MessageNotificationLevel = 0 | 1;
/**
 * The default explicit content filter level of the guild.
 * 0 is disabled, 1 is members without roles, 2 is everyone.
 */
export type ExplicitContentFilterLevel = 0 | 1 | 2;

/**
 * Supress some system channels messages.
 * 1 will disable member join notification,
 * 2 will disable server boost notification,
 * 4 will disable server setup tips
 * 8 will hide member join sticker reply actions.
 */
export type SystemChannelFlags = 1 | 2 | 4 | 8;

export interface POSTGuildCreation {
    /**
     * Name of the guild (2-100 characters)
     * @oaSchemaProp minLength
     * 2
     * @oaSchemaProp maxLength
     * 100
     */
    name: string;
    /**
     * Voice region ID (Replaced with channel.rtc_region)
     * @oaSchemaProp deprecated
     * true
     */
    region?: string;
    /**
     * Base64 128x128 image for the guild icon
     */
    icon?: B64StringFile;
    /**
     * Verification level
     */
    verification_level?: VerificationLevel;
    /**
     * Default message notification level
     */
    default_message_notifications?: MessageNotificationLevel;
    /**
     * Explicit content filter level
     */
    explicit_content_filter?: ExplicitContentFilterLevel;
    /**
     * New guild roles
     * If this is provided, the first role permission will be used for the @everyone role.
     */
    roles?: GuildRoleBody[];
    /**
     * New guild channels.
     * If provided, the default channels will not be created.
     */
    channels?: ChannelGuildMessageBody[];
    /**
     * ID for afk channel
     */
    afk_channel_id?: Snowflake;
    /**
     * AFK timeout in seconds
     */
    afk_timeout?: number;
    /**
     * The id of the channel where guild notices such as welcome messages and boost events are posted
     */
    system_channel_id?: Snowflake;
    /**
     * This is the combined bitwise value of the system channel flags.
     */
    system_channel_flags?: number;
    /**
     * Whether the guild's boost progress bar should be enabled.
     */
    premium_progress_bar_enabled: boolean;
}

export interface GETGuildQuery {
    /** When true, will return approximate member and presence count for the guild */
    with_counts?: "false" | "true";
}
