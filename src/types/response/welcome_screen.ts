import { Snowflake } from "../common";

export interface WelcomeScreenChannelObject {
    /**
     * The channel ID
     */
    channel_id: Snowflake;
    /**
     * The description shown for the channel
     */
    description: string;
    /**
     * The emoji ID, if the emoji provided is custom emoji
     */
    emoji_id: Snowflake | null;
    /**
     * The emoji name if custom, return the unicode if standard,
     * or null if emoji is not set
     */
    emoji_name: string | null;
}

export interface WelcomeScreenGuildObject {
    /**
     * The server description shown in the welcome screen
     */
    description: string | null;
    /**
     * The channels shown in the welcome screen, up to 5
     * @oaSchemaProp maxItems
     * 5
     */
    welcome_channels: WelcomeScreenChannelObject[];
}
