import { Spot } from "@airtasker/spot";
import path from "path";

const apiPath = path.join(__dirname, "openapi", "index.ts")

const contract = Spot.parseContract(apiPath);
const openApi = Spot.OpenApi3.generateOpenAPI3(contract);


const data = JSON.stringify(openApi, null, 4);
console.info(data);