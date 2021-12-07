import { Int32 } from "@airtasker/spot";
import { Snowflake } from "../common";
import { PartialUserObject } from "./user";

export interface PartialStickerObject {
    /**
     * The ID of the sticker
     */
    id: Snowflake;
    /**
     * The sticker name
     */
    name: string;
    /**
     * The sticker format
     * 1 means PNG, 2 means APNG, 3 means Lottie
     */
    format_type: 1 | 2 | 3;
}

export interface StickerObject extends PartialStickerObject {
    /**
     * The pack ID, available if the sticker is from the standard sticker set
     */
    pack_id?: Snowflake;
    /**
     * The sticker description
     */
    description: string | null;
    /**
     * Autocompletion/suggestion tags.
     * This is a comma separated strings (max 200 characters)
     * @oaSchemaProp maxLength
     * 200
     */
    tags: string;
    /**
     * The type of the sticker
     * 1 means that it's from the official sticker in a pack, part of nitro or purchased stickers.
     * 2 means that it's from a guild.
     */
    type: 1 | 2;
    /**
     * Whether this guild sticker can be used, may be false due to loss of Server Boosts
     */
    available?: boolean;
    /**
     * The associated guild ID if the sticker is from a guild
     */
    guild_id?: Snowflake;
    /**
     * The user who uploaded the guild sticker
     */
    user?: PartialUserObject;
    /**
     * The standard sticker's sort order within its pack
     */
    sort_value?: Int32;
}

export interface StickerPackObject {
    /**
     * The ID of the sticker pack
     */
    id: Snowflake;
    /**
     * The stickers in the pack
     */
    stickers: StickerObject[];
    /**
     * The sticker pack name
     */
    name: string;
    /**
     * The ID of the pack SKU
     */
    sku_id: Snowflake;
    /**
     * ID of a sticker in the pack which is shown as the pack's icon
     */
    cover_sticker_id?: Snowflake;
    /**
     * The description of the pack
     */
    description: string;
    /**
     * ID of the sticker pack's banner image (hash)
     */
    banner_asset_id: Snowflake;
}
