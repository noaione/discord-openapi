import { api, securityHeader } from "@airtasker/spot";

import { oa3server } from "@airtasker/spot/build/lib/src/syntax/oa3server";
import { oa3serverVariables } from "@airtasker/spot/build/lib/src/syntax/oa3serverVariables";

import "./routes/index";

/**
 * **This is a custom OpenAPI 3.0 compatible schemas for Discord API.**
 * 
 * It's mainly made because looking at the documentation is very hard and confusing sometimes.
 * So some people might just want to use OAPI schema to look or even generate
 * the code for their own API client.
 * 
 * Maintaned by [N4O#8868](https://github.com/noaione/discord-openapi).<br>
 * This project is not affiliated with Discord whatsoever.
 * 
 * Please report issue at: [https://github.com/noaione/discord-openapi](https://github.com/noaione/discord-openapi)
 * 
 * API Version:
 * - v6 (Discord API v6) - Deprecated **[Default]**
 * - v8 (Discord API v8) - Active (Not recommended)
 * - v9 (Discord API v9) - Active (Recommended)
 * 
 * You can use client like [Insomnia](https://insomnia.rest/) to request the API.<br>
 * Since you cannot use this website to do it because of CORS (and I'm not planning to circumvent it).
 * 
 * If you want to see documentation for the Gateway? Click [here](/gateway).
 */
@api({
    name: "Discord API",
    version: "v9-1.0.0"
})
export class DiscordAPI {
    /**
     * The main endpoint for Discord API
     */
    @oa3server({ url: "https://discord.com/api/{apiVersion}" })
    apiServer(
        @oa3serverVariables
        variables: {
            /**
             * The API version, either "v9", "v8", or "v6"
             * @default v9
             */
            apiVersion: "v6" | "v8" | "v9";
        }
    ) {}

    /**
     * The canary endpoint for Discord API
     */
    @oa3server({ url: "https://canary.discord.com/api/{apiVersion}" })
    canaryApiServer(
        @oa3serverVariables
        variables: {
            /**
             * The API version, either "v9", "v8", or "v6"
             * @default v9
             */
            apiVersion: "v6" | "v8" | "v9";
        }
    ) {}

    @securityHeader
    "Authorization": string;
};
