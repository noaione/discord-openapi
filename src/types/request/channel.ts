import { Int32 } from "@airtasker/spot";
import { Snowflake } from "../common";

import { ChannelType, VideoQualityMode, ThreadArchive } from "../response/channel";

export interface GETChannelMessagesQuery {
    /**
     * Only returns messages that are around this ID.
     * Either around, before, or after can only be specified at a time.
     */
    around?: Snowflake;
    /**
     * Only returns messages that are before this ID.
     * Either around, before, or after can only be specified at a time.
     */
    before?: Snowflake;
    /**
     * Only returns messages that are after this ID.
     * Either around, before, or after can only be specified at a time.
     */
    after?: Snowflake;
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

export interface ChannelGuildMessageBody {
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
    /**
      * The position of the channel in a guild.
      */
    position?: number;
    /**
     * The topic of the channel.
     */
    topic?: string | null;
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
    permission_overwrites?: string[];
    /**
     * The parent ID of category for a channel, or the parent ID of text channel if it's a thread.
     */
    parent_id?: Snowflake | null;
    /**
     * Voice region id for the voice channel, automatic when set to null.
     */
    rtc_region?: string | null;
    /**
      * The video quality of voice channel.
      * 1 means that Discord auto-choose it for them, while 2 means 720p quality.
      */
    video_quality_mode?: VideoQualityMode;
    /**
     * The default auto archival of a thread in seconds.
     */
    default_auto_archive_duration?: ThreadArchive;
}
