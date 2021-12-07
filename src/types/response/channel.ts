import { Int32 } from "@airtasker/spot";
import { ISO8601, Snowflake } from "../common";
import { PermissionBit, PermissionsOverwriteObject } from "./permissions";
import { PartialUserObjectBase } from "./user";

/**
 * The channel type.
 * 0 is a guild text channel, 1 is a DM between user, 2 is a guild voice channel,
 * 3 is a group DM, 4 is a guild category, 5 is a guild news channel,
 * 6 is a guild store channel, 10 is a temporary sub-channel within news channels,
 * 11 is a public thread, 12 is a private thread, 13 is a guild stage channel.
 */
export type ChannelType = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 10 | 11 | 12 | 13;
/**
 * The video quality that user can pick when streaming
 * 1 means automatically choosen by discord, 2 means 720p
 */
export type VideoQualityMode = 1 | 2;
/**
 * The thread archive duration, in seconds.
 * 4320 is locked behind boost level 1, 10080 is locked behind boost level 2.
 */
export type ThreadArchive = 60 | 1440 | 4320 | 10080;

interface ChannelBase {
    /**
     * The ID of the channel.
     */
    id: Snowflake;
    /**
     * The channel name.
     */
    name?: string;
    /**
     * The type of the channel.
     */
    type: ChannelType;
}

export interface GroupDMChannel extends ChannelBase {
    /**
     * The recipients in DM.
     */
    recipients?: PartialUserObjectBase[];
    /**
     * The icon hash for the channel.
     */
    icon?: string | null
    /**
     * The creator of the group DM or thread.
     */
    owner_id?: Snowflake;
    /**
     * Application ID of the group DM creator if it is bot-created
     */
    application_id?: Snowflake;
}

export interface GuildChannel extends ChannelBase {
    /**
     * The guild ID associated with the channel, if it's a DM this will be none.
     */
    guild_id?: Snowflake;
    /**
      * The position of the channel in a guild.
      */
    position?: number;
    /**
     * The topic of the channel.
     */
    topic?: string | null
    /**
      * Is the channel NSFW-restricted or not.
      */
    nsfw?: boolean;
    /**
     * Slowmode of the channel.
     */
    rate_limit_per_user?: number;
    /**
     * The bitrate of the voice/stage channel.
     */
    bitrate?: number;
    /**
      * The user limit of the voice channel
      */
    user_limit?: number;
    /**
     * Explicit permission overwrites for members and roles
     */
    permission_overwrites?: PermissionsOverwriteObject[];
    /**
     * The parent ID of category for a channel, or the parent ID of text channel if it's a thread.
     */
    parent_id?: Snowflake | null
    /**
     * Voice region id for the voice channel, automatic when set to null.
     */
    rtc_region?: string | null
    /**
      * The video quality of voice channel.
      * 1 means that Discord auto-choose it for them, while 2 means 720p quality.
      */
    video_quality_mode?: VideoQualityMode;
    /**
     * The default auto archival of a thread in seconds.
     */
    default_auto_archive_duration?: ThreadArchive;
    /**
     * The last message ID that sent to that channel.
     */
    last_message_id?: Snowflake | null
    /**
     * The last pinned message timestamp in ISO8601.
     */
    last_pin_timestamp?: ISO8601 | null
    /**
     * Computed permissions for the invoking user in the channel, including overwrites,
     * only included when part of the resolved data received on a slash command interaction
     */
    permissions?: PermissionBit;
}

export interface ThreadMetadataObject {
    /**
     * Whether the thread is archived
     */
    archived: boolean;
    /**
     * Duration in minutes to automatically archive the thread after recent activity.
     */
    auto_archive_duration: ThreadArchive;
    /**
     * Timestamp when the thread's archive status was last changed,
     * used for calculating recent activity
     */
    archive_timestamp: ISO8601;
    /**
     * Whether the thread is locked; when a thread is locked,
     * only users with MANAGE_THREADS can unarchive it
     */
    locked: boolean;
    /**
     * Whether non-moderators can add other non-moderators to a thread; only available on private threads
     */
    invitable?: boolean;
}

export interface ThreadMemberBaseObject {
    /**
     * The time the current user last joined the thread
     */
    join_timestamp: ISO8601;
    /**
     * Any user-thread settings, currently only used for notifications
     */
    flags: Int32;
}

export interface ThreadMemberObject extends ThreadMemberBaseObject {
    /**
     * The ID of the thread, fields will be omitted in GUILD_CREATE event.
     */
    id?: Snowflake;
    /**
     * THe ID of the user, fields will be omitted in GUILD_CREATE event.
     */
    user_id?: Snowflake;
}

export interface ChannelThread extends ChannelBase {
    /**
     * Slowmode of the channel.
     */
    rate_limit_per_user?: number;
    /**
     * The creator of the group DM or thread.
     */
    owner_id?: Snowflake;
    /**
     * An approximate count of messages in a thread, stops counting at 50
     */
    message_count?: number;
    /**
     * An approximate count of users in a thread, stops counting at 50
     */
    member_count?: number;
    /**
     * Thread-specific fields not needed by other channels
     */
    thread_metadata?: ThreadMetadataObject;
    /**
     * Thread member object for the current user, if they have joined the thread, only included on certain API endpoints
     */
    member?: ThreadMemberObject[];
}
