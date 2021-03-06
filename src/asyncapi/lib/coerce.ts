/**
 * A set of functions to coerce OpenAPI 3 schema into AsyncAPI 2.2 schema
 */

import { OpenApiV3, SchemaObject, PathItemObject } from "@airtasker/spot/build/lib/src/generators/openapi3/openapi3-specification";
import cloneDeep from "lodash.clonedeep";
import { AsyncAPISchema } from "./schema";

type NoneType = null | undefined;

function isNone(value: any): value is NoneType {
    return value === null || typeof value === "undefined";
}

function formatCaseOp(opName: string) {
    const opNameLower = opName.toLowerCase();
    const opNameSplit = opNameLower.split("_").map((word: string) => {
        return word.charAt(0).toUpperCase() + word.slice(1);
    });
    return opNameSplit.join(" ");
}

function coerceSchemaFormatting(schema: SchemaObject) {
    const copySchemas = cloneDeep(schema);
    if (schema.nullable) {
        let originalOneOf = cloneDeep(schema.oneOf);
        if (isNone(originalOneOf)) {
            originalOneOf = [];
        } else {
            originalOneOf = originalOneOf.map((oneOf: any) => {
                return coerceSchemaFormatting(oneOf);
            });
        }
        originalOneOf.push({type: "null"});
        if (copySchemas.type && copySchemas.format) {
            delete copySchemas.type;
            delete copySchemas.format;
            originalOneOf.push({type: schema.type, format: schema.format});
        } else if (copySchemas.type) {
            delete copySchemas.type;
            originalOneOf.push({type: schema.type});
        }
        if (copySchemas["$ref"]) {
            delete copySchemas["$ref"];
            originalOneOf.push({$ref: schema["$ref"]});
        }
        copySchemas.oneOf = originalOneOf;
        delete copySchemas.nullable;
    }
    if (schema.properties) {
        Object.keys(schema.properties).forEach(key => {
            copySchemas.properties[key] = coerceSchemaFormatting(schema.properties[key]);
        });
    }
    return copySchemas;
}

/**
 * Convert a OA3 schema into an AsyncAPI message object.
 */
function messageFromRoute(route: PathItemObject, routeName: string, opName?: string) {
    const post = route.post;
    if (!post) {
        throw new Error(`Missing POST data for route ${routeName}!`);
    }
    // @ts-ignore
    const schematics = post?.responses["200"]?.content["application/json"].schema
    const parsedTags: {
        name: string
    }[] = [];
    if (post.tags) {
        post.tags.forEach(tag => {
            parsedTags.push({
                name: tag
            });
        });
    }
    const coercedData = coerceSchemaFormatting(schematics);
    coercedData.description = "Event data or payload";
    const message = {
        name: opName || post.operationId,
        summary: route.description || "",
        tags: parsedTags,
        payload: {
            type: "object",
            properties: {
                op: {
                    type: "integer",
                    description: "opcode for the payload",
                    enum: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
                },
                d: coercedData,
                s: {
                    type: "integer",
                    oneOf: [
                        {
                            type: "string",
                        },
                        {
                            type: "null",
                        }
                    ],
                    description: "Sequence number, used for resuming sessions and heartbeats (This will be Null if op is not 0)"
                },
                t: {
                    oneOf: [
                        {
                            type: "string",
                        },
                        {
                            type: "null",
                        }
                    ],
                    description: "The event name for this payload (This will be Null if op is not 0)"
                }
            },
        }
    }
    if (!isNone(opName)) {
        // @ts-ignore
        message.payload.properties.t["default"] = opName;
        message.title = formatCaseOp(opName) + " Event";
    }
    return message;
}

/**
 * This is a custom function to coerce our custom OpenAPI schema generated by Spot
 * into AsyncAPI schemas.
 * 
 * Please follow the guidelines so the object can be converted properly.
 * 
 * @param oas3Document An OpenAPI 3 document
 * @returns The new AsyncAPI schemas formatted.
 */
export function coerceDiscordOA3(oas3Document: OpenApiV3): AsyncAPISchema {
    const mainDocument: AsyncAPISchema = {
        asyncapi: "2.2.0",
        id: "urn:com:discord:gateway",
        info: {
            title: oas3Document.info.title,
            version: oas3Document.info.version,
            description: oas3Document.info.description,
        },
        servers: {
            secureGateway: {
                url: "wss://gateway.discord.gg?v={version}&encoding=json",
                protocol: "wss",
                description: "Secure gateway to connect to Discord Gateway API",
                variables: {
                    version: {
                        default: "9",
                        enum: ["6", "8", "9"]
                    }
                },
                security: [
                    {
                        "token": []
                    }
                ]
            }
        },
        channels: {},
        components: {
            schemas: {},
            messages: {},
            securitySchemes: {
                token: {
                    type: "httpApiKey",
                    name: "Authorization",
                    in: "header"
                }
            },
        },
        defaultContentType: "application/json",
        externalDocs: {
            url: "https://discord.com/developers/docs/intro",
            description: "Discord Developer Documentation"
        }
    }
    const channels = {
        "/": {
            "publish": {
                message: {
                    oneOf: []
                }
            },
            "subscribe": {
                message: {
                    oneOf: [],
                }
            }
        }
    }
    for (const [key, value] of Object.entries(oas3Document.components?.schemas || {})) {
        mainDocument["components"]["schemas"][key] = coerceSchemaFormatting(value);
    }
    for (const [routeName, routeData] of Object.entries(oas3Document.paths)) {
        if (routeName.startsWith("/pub")) {
            const cutRouteName = routeName.substring(5);
            const asMessage = messageFromRoute(routeData, cutRouteName, cutRouteName);
            // @ts-ignore
            channels["/"]["publish"].message.oneOf.push({
                // @ts-ignore
                "$ref": `#/components/messages/${cutRouteName}`,
            });
            mainDocument["components"]["messages"][cutRouteName] = asMessage;
        } else if (routeName.startsWith("/sub")) {
            const cutRouteName = routeName.substring(5);
            const asMessage = messageFromRoute(routeData, cutRouteName, cutRouteName);
            // @ts-ignore
            channels["/"]["subscribe"].message.oneOf.push({
                // @ts-ignore
                "$ref": `#/components/messages/${cutRouteName}`,
            });
            mainDocument["components"]["messages"][cutRouteName] = asMessage;
        }
    }
    // @ts-ignore
    mainDocument["channels"] = channels;
    return mainDocument;
}