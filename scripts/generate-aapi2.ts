import { Spot } from "@airtasker/spot";
import { mkdirSync, writeFileSync } from "fs";

import path from "path";
import yaml from "js-yaml";
import { coerceDiscordOA3 } from "../src/asyncapi/lib/coerce";

const TARGET = path.join(__dirname, "..", "generated");

function generateOAS3(filePath: string) {
    const apiPath = path.join(filePath)

    const contract = Spot.parseContract(apiPath);
    const openApi = Spot.OpenApi3.generateOpenAPI3(contract);

    return [yaml.dump(openApi, { skipInvalid: true }), JSON.stringify(openApi, null, 4)];
}

function generateAAPI2() {
    const [_, oa3JSON] = generateOAS3(path.join(__dirname, "..", "src", "asyncapi", "index.ts"));
    const coercedData = coerceDiscordOA3(JSON.parse(oa3JSON) as Spot.OpenApi3.Specification.OpenApiV3);
    
    return [yaml.dump(coercedData, {skipInvalid: true}), JSON.stringify(coercedData, null, 4)];
}

console.time("[Deploy] Creating folder if havent...");
mkdirSync(TARGET, { recursive: true });
console.timeEnd("[Deploy] Creating folder if havent...");

console.time("[Deploy] Generating AsyncAPI 2 for Discord Gateway API...");
const [aapi2yaml, _] = generateAAPI2();
console.timeEnd("[Deploy] Generating AsyncAPI 2 for Discord Gateway API...");

console.time("[Deploy] Writing AsyncAPI 2 file...");
writeFileSync(path.join(TARGET, "gateway.yml"), aapi2yaml);
console.timeEnd("[Deploy] Writing AsyncAPI 2 file...");
