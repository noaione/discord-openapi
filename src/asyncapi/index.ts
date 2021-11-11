import { api } from "@airtasker/spot";
import { oa3server } from "@airtasker/spot/build/lib/src/syntax/oa3server";

import "./routes";

/**
 * **This is a custom AsyncAPI 2.2.0 compatible schemas for Discord Gateway API.**
 * 
 * It's mainly made because looking at the documentation is very hard and confusing sometimes.
 * So some people might just want to use AsyncAPI schema to look or even generate
 * the code for their own API client.
 * 
 * Maintaned by [N4O#8868](https://github.com/noaione/discord-openapi).<br>
 * This project is not affiliated with Discord whatsoever.
 * 
 * Please report issue at: [https://github.com/noaione/discord-openapi](https://github.com/noaione/discord-openapi)
 * 
 * Gateway API Version:
 * - v6 (Gateway API v6) - Deprecated **[Default]**
 * - v8 (Gateway API v8) - Active (Not recommended)
 * - v9 (Gateway API v9) - Active (Recommended)
 * 
 * @oaSchemaProp id
 * urn:com:discord:gateway
 */
@api({ name: "Discord Gateway API", version: "v9-1.0.0" })
class DiscordGatewayAPI {
    @oa3server({ url: "wss://gateway.discord.gg" })
    secureGateway() {}

    @oa3server({ url: "ws://gateway.discord.gg" })
    gateway() {}
}
