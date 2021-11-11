import { GuildGatewayObject } from "../../../types/response/guild";
import { body, endpoint, response } from "@airtasker/spot";

@endpoint({
    method: "POST",
    path: "/pub/GUILD_CREATE",
    tags: ["Guilds"]
})
class GuildCreateDispatch {
    @response({ status: 200 })
    success(@body body: GuildGatewayObject) {}
}