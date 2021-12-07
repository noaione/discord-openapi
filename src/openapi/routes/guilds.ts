import { body, endpoint, headers, pathParams, queryParams, request, response } from "@airtasker/spot";
import { AuditLogResponse } from "../../types/response/auditLog";
import { GETAuditLogsQuery } from "../../types/request/auditLog";
import { GETGuildQuery, POSTGuildCreation } from "../../types/request/guild";
import { GuildHTTPObject, GuildPreviewObject } from "../../types/response/guild";
import { DefaultHeaders, DefaultWithAuditHeader, ErrorResponse, Snowflake } from "../../types/common";
import { GuildChannel } from "../../types/response/channel";
import { ChannelGuildMessageBody } from "../../types/request/channel";


/**
 * Create a new guild. Returns a guild object on success.
 * 
 * This action will fires a GUILD_CREATE Gateway event.
 * 
 * https://discord.com/developers/docs/resources/guild#create-guild
 */
@endpoint({
    method: "POST",
    path: "/guilds",
    tags: ["Guilds"]
})
class PostGuilds {
    @request
    request(
        @body
        body: POSTGuildCreation,
        @headers
        headers: DefaultHeaders,
    ) {}

    /** Guild object */
    @response({ status: 200 })
    success(
        @body
        body: GuildHTTPObject
    ) {}

    /** Bad request, invalid icon image format */
    @response({ status: 400 })
    badRequest(
        @body
        body: ErrorResponse,
    ) {}
}

/**
 * Get a guild. Returns the guild object for the given id.
 * 
 * If with_counts is set to true, this endpoint will also return
 * approximate_member_count and approximate_presence_count for the guild.
 * 
 * https://discord.com/developers/docs/resources/guild#get-guild
 */
@endpoint({
    method: "GET",
    path: "/guilds/:guildId",
    tags: ["Guilds"]
})
class GetGuild {
    @request
    request(
        @pathParams
        pathParams: { guildId: Snowflake },
        @queryParams
        queryParams: GETGuildQuery,
        @headers
        headers: DefaultHeaders,
    ) {}

    /** Requested Guild object */
    @response({ status: 200 })
    success(
        @body
        body: GuildHTTPObject
    ) {}

    /** Unauthorized, you need to provide token to get the guild */
    @response({ status: 401 })
    unauthorizedRequest(
        @body
        body: ErrorResponse,
    ) {}

    /** Forbidden, your provided token is missing some permissions */
    @response({ status: 403 })
    badRequest(
        @body
        body: ErrorResponse,
    ) {}

    /** You're trying to fetch an unknown guild */
    @response({ status: 404 })
    notFound(
        @body
        body: ErrorResponse,
    ) {}
}

/**
 * Get a guild preview. Returns the guild preview object for the given id.
 * 
 * If the user is not in the guild, then the guild must be lurkable (it must be Discoverable or have a live public stage).
 * 
 * https://discord.com/developers/docs/resources/guild#get-guild-preview
 */
@endpoint({
    method: "GET",
    path: "/guilds/:guildId/preview",
    tags: ["Guilds"]
})
class GetGuildPreview {
    @request
    request(
        @pathParams
        pathParams: { guildId: Snowflake },
        @headers
        headers: DefaultHeaders,
    ) {}

    /** Requested Guild object */
    @response({ status: 200 })
    success(
        @body
        body: GuildPreviewObject,
    ) {}

    /** Unauthorized, you need to provide token to get the guild */
    @response({ status: 401 })
    unauthorizedRequest(
        @body
        body: ErrorResponse,
    ) {}

    /** Forbidden, your provided token is missing some permissions */
    @response({ status: 403 })
    badRequest(
        @body
        body: ErrorResponse,
    ) {}

    /** You're trying to fetch an unknown guild */
    @response({ status: 404 })
    notFound(
        @body
        body: ErrorResponse,
    ) {}
}

/**
 * Modify a guild's settings.
 * Requires the `MANAGE_GUILD` permission.
 * Returns the updated guild object on success and fires the GUILD_UPDATE Gateway event.
 * 
 * https://discord.com/developers/docs/resources/guild#modify-guild
 */
@endpoint({
    method: "PATCH",
    path: "/guilds/:guildId",
    tags: ["Guilds"]
})
class PatchGuildModify {
    @request
    request(
        @pathParams
        pathParams: { guildId: Snowflake },
        @body
        body: POSTGuildCreation,
        @headers
        headers: DefaultWithAuditHeader,
    ) {}

    /** The modified guild object */
    @response({ status: 200 })
    success(
        @body
        body: GuildPreviewObject,
    ) {}

    /** Unauthorized, you need to provide token to modify the guild */
    @response({ status: 401 })
    unauthorizedRequest(
        @body
        body: ErrorResponse,
    ) {}

    /** Forbidden, your provided token is missing some permissions */
    @response({ status: 403 })
    badRequest(
        @body
        body: ErrorResponse,
    ) {}

    /** You're trying to modify an unknown guild */
    @response({ status: 404 })
    notFound(
        @body
        body: ErrorResponse,
    ) {}
}

/**
 * Delete a guild permanently.
 * User must be the guild owner to delete it.
 * Fires a GUILD_DELETE gateway event on success.
 * 
 * https://discord.com/developers/docs/resources/guild#delete-guild
 */
@endpoint({
    method: "DELETE",
    path: "/guilds/:guildId",
    tags: ["Guilds"]
})
class DeleteGuild {
    @request
    request(
        @pathParams
        pathParams: { guildId: Snowflake },
        @headers
        headers: DefaultHeaders,
    ) {}

    /** Returns 204 (No content) status */
    @response({ status: 204 })
    success() {}

    /** Unauthorized, you need to provide token to delete the guild */
    @response({ status: 401 })
    unauthorizedRequest(
        @body
        body: ErrorResponse,
    ) {}

    /** Forbidden, your provided token is not the owner auth token */
    @response({ status: 403 })
    badRequest(
        @body
        body: ErrorResponse,
    ) {}

    /** You're trying to delete an unknown guild */
    @response({ status: 404 })
    notFound(
        @body
        body: ErrorResponse,
    ) {}
}

/**
 * Get Guild Channels. Returns a list of channels in the guild.
 * 
 * This does not include threads.
 * 
 * https://discord.com/developers/docs/resources/guild#get-guild-channels
 */
@endpoint({
    method: "GET",
    path: "/guilds/:guildId/channels",
    tags: ["Guilds"]
})
class GetGuildChannels {
    @request
    request(
        @pathParams
        pathParams: { guildId: Snowflake },
        @headers
        headers: DefaultHeaders,
    ) {}

    /** List of guild channels object */
    @response({ status: 200 })
    success(
        @body
        body: GuildChannel[],
    ) {}

    /** Unauthorized, you need to provide token to get the guild channels */
    @response({ status: 401 })
    unauthorizedRequest(
        @body
        body: ErrorResponse,
    ) {}

    /** Forbidden, your provided token is missing permission needed */
    @response({ status: 403 })
    badRequest(
        @body
        body: ErrorResponse,
    ) {}

    /** You're trying to get an unknown guild */
    @response({ status: 404 })
    notFound(
        @body
        body: ErrorResponse,
    ) {}
}

/**
 * Create Guild Channels.
 * Requires the MANAGE_CHANNELS permission.
 * 
 * If setting permission overwrites,
 * only permissions your bot has in the guild can be allowed/denied.
 * 
 * Setting MANAGE_ROLES permission in channels is only possible for guild administrators.
 * 
 * Returns new channel object on success, and fires a CHANNEL_CREATE gateway event.
 * 
 * https://discord.com/developers/docs/resources/guild#create-guild-channel
 */
 @endpoint({
    method: "POST",
    path: "/guilds/:guildId/channels",
    tags: ["Guilds"]
})
class PostGuildChannelCreate {
    @request
    request(
        @pathParams
        pathParams: { guildId: Snowflake },
        @body
        body: ChannelGuildMessageBody[],
        @headers
        headers: DefaultWithAuditHeader,
    ) {}

    /** The created guild channel */
    @response({ status: 200 })
    success(
        @body
        body: GuildChannel,
    ) {}

    /** Unauthorized, you need to provide token to create a guild channels */
    @response({ status: 401 })
    unauthorizedRequest(
        @body
        body: ErrorResponse,
    ) {}

    /** Forbidden, your provided token is missing permission needed */
    @response({ status: 403 })
    badRequest(
        @body
        body: ErrorResponse,
    ) {}

    /** You're trying to create on an unknown guild */
    @response({ status: 404 })
    notFound(
        @body
        body: ErrorResponse,
    ) {}
}

/**
 * Returns an audit log object for the guild.
 * Requires the 'VIEW_AUDIT_LOG' permission.
 * 
 * https://discord.com/developers/docs/resources/audit-log#get-guild-audit-log
 */
@endpoint({
    method: "GET",
    path: "/guilds/:guildId/audit-logs",
    tags: ["Guilds"]
})
class GetGuildAuditLogs {
    @request
    request(
        @pathParams
        pathParams: {
            guildId: Snowflake
        },
        @queryParams
        queryParams: GETAuditLogsQuery,
        @headers
        headers: DefaultHeaders,
    ) {}

    /** Audit log object */
    @response({ status: 200 })
    success(
        @body
        body: AuditLogResponse
    ) {}

    /** Forbidden, your provided token is missing some permissions */
    @response({ status: 403 })
    badRequest(
        @body
        body: ErrorResponse,
    ) {}

    /** You're trying to fetch an unknown guild */
    @response({ status: 404 })
    notFound(
        @body
        body: ErrorResponse,
    ) {}
}