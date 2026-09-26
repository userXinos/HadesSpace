import { createServer as createHttpServer } from 'node:http';

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp.js';

import { SERVER } from '../config.js';
import { loadStore } from './store.js';
import {
    registerConvertCrystals,
    registerDescribeEntity,
    registerGetEntity,
    registerListCollections,
    registerListEntities,
    registerSearchEntities,
} from './tools/index.js';

function instructionsOf(store, extras = {}) {
    const { totalCollections, totalEntities, totalFields } = store.listCollections();
    return [
        `Read-only access to the Hades' Star dataset: ${totalCollections} collections, ${totalEntities} entities, ${totalFields} fields.`,
        '',
        'How to use it:',
        '1. list_collections - see what collections exist and how big they are.',
        '2. search_entities - find an entity by name, field name, or any value.',
        '3. get_entity - read one entity (markdown with tables by default).',
        '4. describe_entity - list the fields of an entity without their values; useful before a targeted get_entity.',
        '',
        'IMPORTANT: the dataset is in English (Ship, Flagship, Hydrogen, Materials), and so are the field keys.',
        'Search in English, case does not matter. Searching in another language returns nothing.',
        `The ${SERVER.hiddenFields.join(' and ')} fields hold base64 images and make up 65% of the dataset weight,`,
        'so they are hidden by default. Request them explicitly through "fields" if you really need them.',
        ...(extras.crystalConverter ?
            [
                '',
                'Premium currency: convert_crystals converts crystals to time, credits or hydrogen and back. Never compute a conversion',
                'yourself - the price curve is not linear, so interpolating between known values gives a wrong answer.',
            ] :
            []),
    ].join('\n');
}

/**
 * Loads the app own crystal converter. It is optional: on a Node that cannot
 * strip TypeScript types the dataset tools must still work, so a failure here
 * only costs the converter tool.
 */
async function loadCrystalConverter() {
    try {
        const { CrystalConverter } = await import('./crystalConverter.js');
        return CrystalConverter;
    } catch (error) {
        console.error(`[mcp] crystal converter disabled: ${error.message}`);
        return undefined;
    }
}

/**
 * Builds the MCP server on top of a ready store. No I/O, so tests can mount it
 * on an InMemoryTransport. Each tool lives in its own file under tools/.
 */
export function createServer(store, extras = {}) {
    const server = new McpServer(
        { name: SERVER.name, version: '1.0.0' },
        { instructions: instructionsOf(store, extras) },
    );

    registerListCollections(server, store);
    registerSearchEntities(server, store);
    registerListEntities(server, store);
    registerDescribeEntity(server, store);
    registerGetEntity(server, store);

    if (extras.crystalConverter) {
        registerConvertCrystals(server, extras.crystalConverter);
    }

    return server;
}

function summary(store) {
    const { totalCollections, totalEntities, totalFields, hiddenFields } = store.listCollections();
    return (
        `${totalCollections} collections, ${totalEntities} entities, ${totalFields} fields, ` +
        `hidden by default: ${hiddenFields.join(', ')}`
    );
}

/**
 * Runs the server over stdio. stdout belongs to the protocol, so all logging goes to stderr.
 */
export async function startServer(args = {}) {
    const config = args.config ?? SERVER;
    const store = args.store ?? loadStore(args.dataset ?? config.dataset, config);
    const crystalConverter = await loadCrystalConverter();

    const server = createServer(store, { crystalConverter });
    await server.connect(new StdioServerTransport());

    console.error(`[mcp] ${config.name} ready on stdio: ${summary(store)}`);
    return server;
}

/**
 * Runs the server over Streamable HTTP. Every tool is read-only and nothing is
 * shared between sessions, so sessions are disabled: the client may reconnect at
 * any time and a restart loses nothing.
 *
 * In stateless mode the SDK expects a fresh transport and a fresh server per
 * request, so the dataset is loaded once here and only the cheap tool registry is
 * rebuilt each time.
 *
 * Host validation is done here rather than through the transport options, which
 * the SDK has deprecated in favour of external middleware.
 */
export async function startHttpServer(args = {}) {
    const config = args.config ?? SERVER;
    const defaults = config.http ?? SERVER.http;
    const host = args.interface ?? defaults.interface;
    const port = args.port ?? defaults.port;
    const path = args.path ?? defaults.path;
    const store = args.store ?? loadStore(args.dataset ?? config.dataset, config);

    // Конвертер грузим один раз на процесс, а не на каждый запрос: в stateless
    // режиме сервер пересоздаётся на запрос, и импорт .ts на каждом не нужен.
    const extras = { crystalConverter: await loadCrystalConverter() };

    const isAllowedHost = (header) => {
        if (!header) return true;
        const hostname = header.replace(/:\d+$/, '').replace(/^\[|\]$/g, '').toLowerCase();
        return (
            hostname === 'localhost' ||
            hostname === '::1' ||
            /^127\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(hostname) ||
            hostname === String(host).toLowerCase()
        );
    };

    const http = createHttpServer(async (req, res) => {
        const target = new URL(req.url ?? '/', `http://${host}:${port}`);

        if (target.pathname !== path) {
            res.writeHead(404, { 'content-type': 'text/plain' }).end(`Not found. The MCP endpoint is ${path}\n`);
            return;
        }

        if (!isAllowedHost(req.headers.host)) {
            res.writeHead(403, { 'content-type': 'text/plain' }).end('Forbidden host\n');
            return;
        }

        // Без сессий сервер не шлёт сам уведомления, поэтому GET и DELETE не нужны.
        if (req.method !== 'POST') {
            res
                .writeHead(405, { 'content-type': 'application/json' })
                .end(`${JSON.stringify({ jsonrpc: '2.0', error: { code: -32000, message: 'Method not allowed.' }, id: null })}\n`);
            return;
        }

        const transport = new StreamableHTTPServerTransport({ sessionIdGenerator: undefined });
        const server = createServer(store, extras);

        try {
            await server.connect(transport);
            res.on('close', () => {
                transport.close();
                server.close();
            });
            await transport.handleRequest(req, res);
        } catch (error) {
            console.error(`[mcp] http error: ${error.message}`);
            if (!res.headersSent) {
                res
                    .writeHead(500, { 'content-type': 'application/json' })
                    .end(`${JSON.stringify({ jsonrpc: '2.0', error: { code: -32603, message: 'Internal server error' }, id: null })}\n`);
            }
        }
    });

    await new Promise((resolve, reject) => {
        http.once('error', reject);
        http.listen(port, host, resolve);
    });

    const address = http.address();
    const boundPort = typeof address === 'object' && address ? address.port : port;
    console.error(
        `[mcp] ${config.name ?? SERVER.name} ready on http://${host}:${boundPort}${path} ` +
        `(stateless, streamable http): ${summary(store)}`,
    );
    return http;
}
