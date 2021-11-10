import { body, endpoint, headers, pathParams, queryParams, request, response } from "@airtasker/spot";
import { AuditLogResponse } from "../../types/response/auditLog";
import { GETAuditLogsQuery } from "../../types/request/auditLog";
import { POSTGuildCreation } from "../../types/request/guild";
import { GuildHTTPObject } from "../../types/response/guild";
import { DefaultHeaders, ErrorResponse, Snowflake } from "../../types/common";


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