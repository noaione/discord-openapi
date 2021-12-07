import { Snowflake } from "../common";
import { PartialUserObject } from "./user";

export interface GuildEmojiObject {
    /**
     * The emoji ID, can also be used as the image hash
     */
    id: Snowflake;
    /**
     * The emoji name (can be null only in reactions emote object)
     */
    name?: string | null;
    /**
     * Array of role object IDs, contains user that can use this emoji
     */
    roles?: Snowflake[];
    /**
     * User that created this emoji
     */
    user?: PartialUserObject;
    /**
     * Whether this emoji must be wrapped in colons
     */
    require_colons?: boolean;
    /**
     * Whether this emoji is managed by an integration
     */
    managed?: boolean;
    /**
     * Whether this emoji is animated.
     * If the emote is animated, the hash need to be prefixed by `a_`
     */
    animated?: boolean;
    /**
     * Whether this emoji can be used, may be false due to loss of Server Boosts
     */
    available?: boolean;
}
