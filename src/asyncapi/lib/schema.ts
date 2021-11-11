interface ReferenceObject {
    "$ref": string;
}

export interface AAPIContactObject {
    name?: string;
    url?: string;
    email?: string;
}

export interface AAPILicenseObject {
    name: string;
    url?: string;
}

export interface AAPIInfoObject {
    title: string;
    version: string;
    description?: string;
    termsOfService?: string;
    contact?: AAPIContactObject;
    license?: AAPILicenseObject;
}

export interface AAPIServerVariableObject {
    enum?: string[];
    default?: string;
    description?: string;
    examples?: string;
}

export interface AAPIServerObject {
    url: string;
    protocol: "amqp" | "amqps" | "http" | "https" | "ibmmq" | "jms" | "kafka" | "kafka-secure" | "anypointmq" | "mqtt" | "secure-mqtt" | "stomp" | "stomps" | "ws" | "wss" | "mercure";
    protocolVersion?: string;
    description?: string;
    variables?: {[key: string]: AAPIServerVariableObject};
    security?: {[key: string]: any[]}[];
}

export interface AAPIExternalDocumentationObject {
    description?: string;
    url: string;
}
type AAPIObject = any | ReferenceObject;

type AAPIComponent = {[key: string]: AAPIObject};

export interface AAPIComponentsObject {
    schemas?: AAPIComponent;
    messages?: AAPIComponent;
    securitySchemes?: AAPIComponent;
    parameters?: AAPIComponent;
    operationTraits?: AAPIComponent;
    messageTraits?: AAPIComponent;
}

export interface AsyncAPISchema {
    asyncapi: "2.2.0",
    id?: string;
    info: AAPIInfoObject;
    servers?: {[serverName: string]: AAPIServerObject};
    defaultContentType?: string;
    channels: {[key: string]: any};
    components?: AAPIComponentsObject;
    externalDocs?: AAPIExternalDocumentationObject;
}