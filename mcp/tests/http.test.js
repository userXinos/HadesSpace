import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StreamableHTTPClientTransport } from '@modelcontextprotocol/sdk/client/streamableHttp.js';
import { connect } from 'node:net';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

import { startHttpServer } from '../src/server.js';
import { createStore } from '../src/store.js';

const FIXTURE = {
    ships: {
        Flagship: {
            Name: 'Flagship',
            Description: 'The biggest hull',
            Cost: [100, 250, 500],
            Power: [10, 20, 30],
            icons: 'data:image/png;base64,AAAABBBB',
        },
    },
    ladder: {
        levels: {
            Name: ['Basic', 'Advanced', 'Elite'],
            Cost: [10, 20, 30],
        },
    },
};

/** @type {any} */
let http;
/** @type {number} */
let port;
/** @type {Client} */
let client;
/** @type {string} */
let endpoint;

beforeAll(async () => {
    http = await startHttpServer({
        store: createStore(FIXTURE),
        config: { name: 'hades-data', hiddenFields: ['icon', 'icons'], http: { interface: '127.0.0.1', port: 0, path: '/mcp' } },
        port: 0,
    });
    ({ port } = http.address());
    endpoint = `http://127.0.0.1:${port}/mcp`;

    client = new Client({ name: 'test', version: '0.0.0' });
    await client.connect(new StreamableHTTPClientTransport(new URL(endpoint)));
});

afterAll(async () => {
    await client?.close();
    await new Promise((resolve) => http.close(resolve));
});

describe('streamable http', () => {
    it('клиент подключается и получает инструкции', async () => {
        expect(await client.getInstructions()).toMatch(/Hades' Star dataset/);
    });

    it('отдаёт все инструменты', async () => {
        const { tools } = await client.listTools();
        expect(tools.map((tool) => tool.name).sort()).toEqual([
            'convert_crystals',
            'describe_entity',
            'get_entity',
            'list_collections',
            'list_entities',
            'search_entities',
        ]);
    });

    it('вызывает инструменты без сессии', async () => {
        const result = await client.callTool({ name: 'list_collections', arguments: {} });
        expect(result.structuredContent.totalEntities).toBe(2);
    });

    it('get_entity отдаёт markdown по умолчанию', async () => {
        const result = await client.callTool({ name: 'get_entity', arguments: { collection: 'ladder', id: 'levels' } });

        expect(result.structuredContent.markdown).toContain('| lvl | Basic | Advanced | Elite |');
    });

    it('поиск работает так же, как по stdio', async () => {
        const result = await client.callTool({ name: 'search_entities', arguments: { query: 'flagship' } });
        expect(result.structuredContent.results[0].id).toBe('Flagship');
    });

    it('ошибки приходят как isError, а не как падение', async () => {
        const result = await client.callTool({ name: 'get_entity', arguments: { collection: 'nope', id: 'x' } });

        expect(result.isError).toBe(true);
        expect(result.content[0].text).toContain('Collection "nope" not found');
    });

    it('несколько запросов подряд работают — транспорт новый на каждый', async () => {
        for (let i = 0; i < 3; i++) {
            const result = await client.callTool({ name: 'list_entities', arguments: { collection: 'ships' } });
            expect(result.structuredContent.items[0].id).toBe('Flagship');
        }
    });
});

describe('маршрутизация и защита', () => {
    it('404 на неизвестный путь', async () => {
        const res = await fetch(`http://127.0.0.1:${port}/wrong`);
        expect(res.status).toBe(404);
    });

    it('405 на GET — сервер не шлёт уведомления сам', async () => {
        expect((await fetch(endpoint)).status).toBe(405);
    });

    it('405 на DELETE', async () => {
        expect((await fetch(endpoint, { method: 'DELETE' })).status).toBe(405);
    });

    it('403 на подделанный Host', async () => {
        const body = JSON.stringify({ jsonrpc: '2.0', id: 1, method: 'initialize', params: {} });
        const status = await new Promise((resolve) => {
            const sock = connect(port, '127.0.0.1', () => {
                sock.write(
                    `POST /mcp HTTP/1.1\r\nHost: evil.example.com\r\nContent-Type: application/json\r\n` +
                        `Accept: application/json, text/event-stream\r\nContent-Length: ${Buffer.byteLength(body)}\r\n\r\n${body}`,
                );
            });
            let data = '';
            sock.on('data', (chunk) => {
                data += chunk;
            });
            sock.on('close', () => resolve(Number(data.split(' ')[1])));
            sock.on('error', () => resolve(0));
            setTimeout(() => {
                sock.destroy();
                resolve(Number(data.split(' ')[1]) || 0);
            }, 2000);
        });

        expect(status).toBe(403);
    });
});
