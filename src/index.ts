import { Spot } from "@airtasker/spot";
import path from "path";
import { copyFileSync } from "fs";
import { mkdirSync, writeFileSync } from "fs";
import yaml from "js-yaml";
import ncp from "ncp";

const TARGET = path.join(__dirname, "..", "dist")
const TEMPLATE = path.join(__dirname, "..", "template")

function generateOAS3() {
    const apiPath = path.join(__dirname, "openapi", "index.ts")

    const contract = Spot.parseContract(apiPath);
    const openApi = Spot.OpenApi3.generateOpenAPI3(contract);

    return yaml.dump(openApi, { skipInvalid: true });
}

function generateAAPI2() {
    // TODO: Implement AsyncAPI 2.x generation
    return null;
}

const oa3 = generateOAS3();
const aapi2 = generateAAPI2();

console.time("[Deploy] Creating dist folder...");
mkdirSync(TARGET, { recursive: true });
console.timeEnd("[Deploy] Creating dist folder...");

console.time("[Deploy] Writing OAS3 file...");
writeFileSync(path.join(TARGET, "openapi.yaml"), oa3);
console.timeEnd("[Deploy] Writing OAS3 file...");

console.time("[Deploy] Writing AAPI2 file...");
// TODO
console.timeEnd("[Deploy] Writing AAPI2 file...");

console.time("[Deploy] Copying template files...");
ncp(TEMPLATE, TARGET, (err: Error) => {
    if (err) {
        return console.error(err);
    }
    console.timeEnd("[Deploy] Copying template files...");
});
// copyFileSync(path.join(TEMPLATE, "index.html"), path.join(TARGET, "index.html"));
writeFileSync(path.join(TARGET, ".nojekyll"), "");
console.timeEnd("[Deploy] Copying template files...");

console.info("[Deploy] Deployment finished");
