# Under Construction

Please come back later

## Plan

- Use [Spot](https://github.com/airtasker/spot) to help making the API (Generate OpenAPI v3 compatible schemas)
- ~~Use [discord-api-types](https://github.com/discordjs/discord-api-types) to help types every request and response~~

For Gateway API documentation, I'm still thinking about how can I automatically generate it that follows the AsyncAPI format.

After that, it will be generated automatically via Github CI and published to Github Pages.

Renderer:
- [openapi-explorer](https://github.com/Rhosys/openapi-explorer) to display the Schemas.
- Maybe a custom one? See: https://github.com/asyncapi/html-template

Validation/Parser:
- OpenAPI: https://www.npmjs.com/package/openapi-enforcer
- AsyncAPI: https://github.com/asyncapi/parser-js
