import { ISO8601, Nullable, Snowflake } from "../common";

import { ChannelThread } from "./channel";

type MessageType = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23;

export interface MessageResponse {
    /**
     * The ID of the message.
     */
    id: Snowflake;
    /**
     * The ID of the channel where the message is sent to.
     */
    channel_id: Snowflake;
    /**
     * The guild ID associated with the channel, if it's a DM this will be none.
     */
    guild_id?: Snowflake;
    author: any;
    member?: any;
    content: string;
    timestamp: ISO8601;
    edited_timestamp: Nullable<ISO8601>;
    tts: boolean;
    mention_everyone: boolean;
    mentions?: any[];
    mention_roles: any[];
    mention_channels?: any[];
    attachments: any[];
    embeds: any[];
    reactions?: any[];
    nonce?: string | number;
    pinned: boolean;
    webhook_id?: Snowflake;
    type: MessageType;
    activity?: any;
    application?: any;
    application_id?: Snowflake;
    message_reference?: any;
    flags?: number;
    referenced_message?: Nullable<MessageResponse>;
    interaction?: any;
    thread?: ChannelThread;
    components?: any[];
    sticker_items?: any[];
    stickers?: any[];
}