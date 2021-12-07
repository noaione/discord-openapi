import { ISO8601, Snowflake } from "../common";
import type { ExplicitContentFilterLevel, SystemChannelFlags, VerificationLevel, MessageNotificationLevel } from "../request/guild";
import { ChannelThread, GuildChannel } from "./channel";
import { GuildEmojiObject } from "./emoji";
import { PermissionBit } from "./permissions";
import { RoleObject } from "./role";
import { StickerObject } from "./sticker";
import { WelcomeScreenGuildObject } from "./welcome_screen";

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

export interface GuildPreviewObjectBase {
    /**
     * The Guild ID
     */
    id: Snowflake;
     /**
      * The Guild name
      */
    name: string;
     /**
      * The guild icon hash
      */
    icon: string | null;
    /**
     * Emojis in the guild
     */
    emojis: GuildEmojiObject[];
     /**
      * Enabled guild features
      */
    features: GuildFeatures[];
    /**
     * The description of a Community guild
     */
    description: string | null;
    /**
     * The splash screen hash
     */
    splash: string | null;
     /**
      * The discovery splash hash, only present for guilds with "DISCOVERABLE" feature
      */
    discovery_splash: string | null;
}

export interface GuildPreviewObject extends GuildPreviewObjectBase {
    /**
     * Approximate number of members in this guild, returned if `with_counts` is true in the guilds request
     */
    approximate_member_count: number;
    /**
     * Approximate number of non-offline members, returned if `with_counts` is true in the guilds request
     */
    approximate_presence_count: number;
}

export interface GuildObjectBase extends GuildPreviewObjectBase {
    /**
     * The guild icon hash, returned if the guild is a template object
     */
    icon_hash?: string | null;
    /**
     * ID of the owner
     */
    owner_id: Snowflake;
    /**
     * Voice region ID for the guild (deprecated)
     * @oaSchemaProp deprecated
     * true
     */
    region?: string | null;
    /**
     * The ID for voice channel afk channel
     */
    afk_channel_id: Snowflake | null;
    /**
     * The AFK timeout before someone is moved to AFK channel (in seconds)
     */
    afk_timeout: number;
    /**
     * Whether is the server widget is enabled
     */
    widget_enabled?: boolean;
    /**
     * The channel id that the widget will generate an invite to, or null if set to no invite
     */
    widget_channel_id?: Snowflake | null;
    /**
     * Verification level required for the guild
     */
    verification_level: VerificationLevel;
    /**
     * Default message notification level
     */
    default_message_notifications: MessageNotificationLevel;
    /**
     * Explicit content filter level
     */
    explicit_content_filter: ExplicitContentFilterLevel;
    /**
     * Roles in the guild
     */
    roles: RoleObject[];
    /**
     * Required MFA (multi-factor authentication) level for the guild
     */
    mfa_level: MFALevel;
    /**
     * Application id of the guild creator if it is bot-created
     */
    application_id: Snowflake | null;
    /**
     * The id of the channel where guild notices such as welcome messages and boost events are posted
     */
    system_channel_id: Snowflake | null;
    /**
     * System channel flags
     */
    system_channel_flags: SystemChannelFlags;
    /**
     * The id of the channel where Community guilds can display rules and/or guidelines
     */
    rules_channel_id: Snowflake | null;
    /**
     * The maximum number of presences for the guild (null is always returned, apart from the largest of guilds)
     */
    max_presences?: number | null;
    /**
     * The maximum number of members for the guild
     */
    max_members?: number;
    /**
     * The vanity invite url code for the guild
     */
    vanity_url_code: string | null;
    /**
     * The banner hash
     */
    banner: string | null;
    /**
     * Premium tier (server boost)
     */
    premium_tier: PremiumTier;
    /**
     * The number of boosts this guild currently has
     */
    premium_subscription_count?: number;
    /**
     * The preferred locale of a Community guild;
     * used in server discovery and notices from Discord;
     * defaults to "en-US"
     */
    preferred_locale: string;
    /**
     * The id of the channel where admins and moderators of Community guilds receive notices from Discord
     */
    public_updates_channel_id: Snowflake | null;
    /**
     * The maximum amount of users in a video channel
     */
    max_video_channel_users: number;
    /**
     * The welcome screen of a Community guild, shown to new members, returned in an Invite's guild object
     */
    welcome_screen: WelcomeScreenGuildObject;
    /**
     * The guild NSFW level
     */
    nsfw_level: NSFWLevel;
    /**
     * Custom guild stickers
     */
    stickers: StickerObject[];
}

export interface GuildHTTPObject extends GuildObjectBase {
    /**
     * True if the user is the owner of the guild. Only available via API,
     * will return the current user requesting to the API.
     */
    owner?: boolean;
    /**
     * Total permissions for the user in the guild (excludes overwrites). Only available via API,
     * will return the current user requesting to the API.
     */
    permissions?: PermissionBit;
}

export interface GuildGatewayObject extends GuildObjectBase {
    /**
     * When this guild was joined at
     */
    joined_at?: ISO8601;
    /**
     * trur if this is considered a large guild
     */
    large?: boolean;
    /**
     * true if this guild is unavailable due to an outage
     */
    unavailable?: boolean;
    /**
     * Total number of members in this guild
     */
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