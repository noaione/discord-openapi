import { ISO8601, Snowflake } from "../common";
import type { ExplicitContentFilterLevel, SystemChannelFlags, VerificationLevel, MessageNotificationLevel } from "../request/guild";
import { ChannelThread, GuildChannel } from "./channel";

/**
 * Guild features, if the guild have one of this features,
 * that means the guild have it enabled or available.
 */
export type GuildFeatures =
    "ANIMATED_BANNER" |
    "ANIMATED_ICON" |
    "BANNER" |
    "COMMERCE" |
    "COMMUNITY" |
    "DISCOVERABLE" |
    "FEATURABLE" |
    "INVITE_SPLASH" |
    "MEMBER_VERIFICATION_GATE_ENABLED" |
    "MONETIZATION_ENABLED" |
    "MORE_EMOJI" |
    "MORE_STICKERS" |
    "NEWS" |
    "PARTNERED" |
    "PREVIEW_ENABLED" |
    "PRIVATE_THREADS" |
    "ROLE_ICONS" |
    "SEVEN_DAY_THREAD_ARCHIVE" |
    "THREE_DAY_THREAD_ARCHIVE" |
    "TICKETED_EVENTS_ENABLED" |
    "VANITY_URL" |
    "VERIFIED" |
    "VIP_REGIONS" |
    "WELCOME_SCREEN_ENABLED";

/**
 * Guild MFA level needed for user to join.
 * 0 means none, 1 means elevated/needed.
 */
export type MFALevel = 0 | 1;

/**
 * Current boost level of the guild.
 * 0 means none, 1 means level 1, 2 means level 2, etc.
 */
export type PremiumTier = 0 | 1 | 2 | 3;

/**
 * The NSFW level of the guild
 * 0 means default level, 1 means explicit content only,
 * 2 means safe, 3 means age restricted.
 */
export type NSFWLevel = 0 | 1 | 2 | 3;

export interface GuildObjectBase {
    id: Snowflake;
    name: string;
    icon: string | null;
    icon_hash?: string | null;
    splash: string | null;
    discovery_splash: string | null;
    owner_id: Snowflake;
    region?: string | null;
    afk_channel_id: Snowflake | null;
    afk_timeout: number;
    widget_enabled?: boolean;
    widget_channel_id?: Snowflake | null;
    verification_level: VerificationLevel;
    default_message_notifications: MessageNotificationLevel;
    explicit_content_filter: ExplicitContentFilterLevel;
    // TODO: Change later
    roles: Snowflake[];
    // TODO: Change later
    emojis: string[];
    features: GuildFeatures[];
    mfa_level: MFALevel;
    application_id: Snowflake | null;
    system_channel_id: Snowflake | null;
    system_channel_flags: SystemChannelFlags;
    rules_channel_id: Snowflake | null;
    max_presences?: number | null;
    max_members?: number;
    vanity_url_code: string | null;
    description: string | null;
    banner: string | null;
    premium_tier: PremiumTier;
    premium_subscription_count?: number;
    preferred_locale: string;
    public_updates_channel_id: Snowflake | null;
    max_video_channel_users: number;
    approximate_member_count: number;
    approximate_presence_count: number;
    // TODO: Change this
    welcome_screen: string;
    nsfw_level: NSFWLevel;
    // TODO: Change this
    stickers: string[];
}

export interface GuildHTTPObject extends GuildObjectBase {
    owner?: boolean;
    permissions?: string;
}

export interface GuildGatewayObject extends GuildObjectBase {
    joined_at?: ISO8601;
    large?: boolean;
    unavailable?: boolean;
    member_count?: number;
    // TODO: change this
    voice_states?: string[];
    // TODO: change this
    members?: string[];
    channels?: GuildChannel[];
    // TODO: change this
    threads?: ChannelThread[];
    // TODO: change this
    presences?: string[];
    // TODO: change this
    stage_instances?: string[];
}