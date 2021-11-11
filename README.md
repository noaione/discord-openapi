# Under Construction

Please come back later

## Plan

Parser:
- [x] OpenAPI: [Spot](https://github.com/airtasker/spot)
- [x] AsyncAPI: [Spot](https://github.com/airtasker/spot) then a custom converter.

Validator:
- [ ] OpenAPI: ????
- [ ] AsyncAPI: ????

Renderer:
- [x] [RapiDoc](https://mrin9.github.io/RapiDoc/)
- [x] Maybe a custom one? See: https://github.com/asyncapi/html-template

Todo:
- [x] Finalize parser
  - [x] OpenAPI
  - [x] AsyncAPI (Custom made for this)
- [ ] Typing for every request and response (including errors).
- [ ] Renderer
  - [x] OpenAPI
  - [ ] AsyncAPI (Still half-baked)
- [ ] Actual Routes
  - [ ] Application
  - [x] Audit Log
  - [ ] Channel
  - [ ] Emoji
  - [ ] Guild
  - [ ] Guild Template
  - [ ] Invite
  - [ ] Stage Instance
  - [ ] Sticker
  - [ ] User
  - [ ] Voice
  - [ ] Webhook
  - [ ] Gateway
  - [ ] OAuth2
- [ ] Gateway routes/dispatch/etc
  - [ ] Subscribe
    - [ ] Identify
    - [ ] Resume
    - [ ] Heartbeat
    - [ ] Request Guild Members
    - [ ] Update Presence
  - [ ] Publish
    - [ ] Hello
    - [ ] Ready
    - [ ] Resumed
    - [ ] Reconnect
    - [ ] Invalid Session
    - [ ] Channel Related
    - [ ] Thread Related
    - [ ] Guild Related
    - [ ] Guild Ban Related
    - [ ] Guild Emoji Related
    - [ ] Guild Stickers Related
    - [ ] Guild Integrations Related
    - [ ] Guild Member Related
    - [ ] Guild Role Related
    - [ ] Integration Related
    - [ ] Invite Related
    - [ ] Message Related
    - [ ] Presence Related
    - [ ] Stage Instance Related
    - [ ] Typing Start
    - [ ] User Update
    - [ ] Webhooks Update
- [ ] Voice Gateway
  - [ ] Subscribe
    - [ ] Identify
    - [ ] Select Protocol
    - [ ] Resume
    - [ ] Heartbeat
    - [ ] Update VC State
    - [ ] Speaking
  - [ ] Publish
    - [ ] Hello
    - [ ] Session Description
    - [ ] Heartbeat ACK
    - [ ] Resumed
    - [ ] Client Disconnect
    - [ ] VC State Update
    - [ ] VC Server Update
    - [ ] Speaking