import { Spot } from "@airtasker/spot";
import { mkdirSync, writeFileSync } from "fs";

import path from "path";
import yaml from "js-yaml";
import ncp from "ncp";
import { coerceDiscordOA3 } from "./asyncapi/lib/coerce";

const TARGET = path.join(__dirname, "..", "dist")
const TEMPLATE = path.join(__dirname, "..", "template")

function generateOAS3(filePath: string) {
    const apiPath = path.join(filePath)

    const contract = Spot.parseContract(apiPath);
    const openApi = Spot.OpenApi3.generateOpenAPI3(contract);

    return [yaml.dump(openApi, { skipInvalid: true }), JSON.stringify(openApi, null, 4)];
}

function generateAAPI2() {
    const [_, oa3JSON] = generateOAS3(path.join(__dirname, "asyncapi", "index.ts"));
    const coercedData = coerceDiscordOA3(JSON.parse(oa3JSON) as Spot.OpenApi3.Specification.OpenApiV3);
    
    return [yaml.dump(coercedData, {skipInvalid: true}), JSON.stringify(coercedData, null, 4)];
}

console.time("[Deploy] Creating dist folder...");
mkdirSync(TARGET, { recursive: true });
console.timeEnd("[Deploy] Creating dist folder...");

console.time("[Deploy] Generated OA3 for Discord API...");
const [oa3yaml, oa3json] = generateOAS3(path.join(__dirname, "openapi", "index.ts"));
console.timeEnd("[Deploy] Generated OA3 for Discord API...");
console.time("[Deploy] Generated AsyncAPI 2 for Discord Gateway API...");
const [aapi2yaml, aapi2json] = generateAAPI2();
console.timeEnd("[Deploy] Generated AsyncAPI 2 for Discord Gateway API...");

console.time("[Deploy] Writing OAS3 file...");
writeFileSync(path.join(TARGET, "openapi.yaml"), oa3yaml);
writeFileSync(path.join(TARGET, "openapi.json"), oa3json);
console.timeEnd("[Deploy] Writing OAS3 file...");

console.time("[Deploy] Writing AsyncAPI 2 file...");
writeFileSync(path.join(TARGET, "asyncapi.yaml"), aapi2yaml);
writeFileSync(path.join(TARGET, "asyncapi.json"), aapi2json);
console.timeEnd("[Deploy] Writing AsyncAPI 2 file...");

console.time("[Deploy] Copying template files...");
ncp(TEMPLATE, TARGET, (err) => {
    if (err) {
        return console.error(err);
    }
    writeFileSync(path.join(TARGET, ".nojekyll"), "");
    console.timeEnd("[Deploy] Copying template files...");
});

// console.info("[Deploy] Deployment finished");
