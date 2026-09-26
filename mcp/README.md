# mcp

MCP-server over the Hades' Star dataset: 27 collections, 334 entities, 3839 fields. All tools are
read-only.

Tools: `list_collections`, `search_entities`, `list_entities`, `describe_entity`, `get_entity`,
`convert_crystals`.

## Quick start

```bash
npm run build:dataset   # dist/dataset.json
npm run build:md        # dist/dataset.md
npm start               # start server
npm start -- --interface 127.0.0.1 --port 3000   # http instead of stdio
npm test
```

## Connect

```jsonc
// opencode.json — stdio
{ "mcp": { "hades-data": { "type": "local", "command": ["node", "path/to/HadesSpace/mcp/index.js", "serve"] } } }
```

`npm start` uses stdio (waits for a client on `stdin`). Add `--interface`/`--port` for Streamable
HTTP at `http://127.0.0.1:3000/mcp` (stateless, SSE responses, reconnect anytime).

## Crystal converter

`convert_crystals` is backed by the app's own `src/utils/crystalConverter.ts`, imported natively at
startup — Node strips the types at runtime, so there is no build step, no copy of the file and no
second implementation of the math to drift.

It needs Node >= 22.18 for type stripping. If the import fails, the server logs one line to stderr and
starts without the converter tool — the dataset tools are unaffected.

The tool takes `amount`, `from` and `to`, and returns one number. It deliberately exposes nothing
about the price curve behind it, so there is no way to talk itself into interpolating one.

## Layout

Each tool is a file under `src/tools/`, registered one by one in `src/server.js`. Shared zod args and
formatters live in `src/tools/shared.js`; the text an agent reads for each tool sits next to its
schema, in the same file.

## Watch out

- `icon`/`icons` are base64 images — 65% of the dataset. Hidden by default; request via `fields`,
  still capped by `maxFieldBytes`.
- Data is English — search `Ship`, `Flagship`, `Hydrogen`
