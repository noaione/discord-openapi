import { ISO8601, Nullable, Snowflake } from "../common";

export type ChannelType = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 10 | 11 | 12 | 13;
export type VideoQualityMode = 1 | 2;
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
     * 0 is guild text channel, 1 is DM between users,
     * 2 is voice channel in guild, 3 is group DM,
     * 4 is guild category, 5 is guild news channel,
     * 6 is guild store channel, 10 is temporary sub-channel within guild news channel,
     * 11 is guild public thread, 12 is guild private thread,
     * 13 is guild stage channel.
     */
    type: ChannelType;
}

export interface GroupDMChannel extends ChannelBase {
    // TODO: Change this
    /**
     * The recipients in DM.
     */
    recipients?: string[];
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
    // TODO: Change this
    /**
     * Explicit permission overwrites for members and roles
     */
    permission_overwrites?: string[];
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
    permissions?: string;
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
    // TODO: Change this
    /**
      * Thread-specific fields not needed by other channels
      */
    thread_metadata?: string[];
    // TODO: Change this
    /**
      * Thread member object for the current user, if they have joined the thread, only included on certain API endpoints
      */
    member?: string[];
}

