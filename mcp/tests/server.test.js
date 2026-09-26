import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { InMemoryTransport } from '@modelcontextprotocol/sdk/inMemory.js';
import { beforeAll, describe, expect, it } from 'vitest';

import { createServer } from '../src/server.js';
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

/** @type {Client} */
let client;
/** @type {Awaited<ReturnType<typeof createServer>>} */
let server;

beforeAll(async () => {
    server = createServer(createStore(FIXTURE, { limits: { maxFieldBytes: 200 } }));

    const [clientTransport, serverTransport] = InMemoryTransport.createLinkedPair();
    client = new Client({ name: 'test', version: '0.0.0' });
    await Promise.all([server.connect(serverTransport), client.connect(clientTransport)]);
});

const call = (name, args = {}) => client.callTool({ name, arguments: args });

describe('инструменты', () => {
    it('регистрирует все пять', async () => {
        const { tools } = await client.listTools();
        expect(tools.map((tool) => tool.name).sort()).toEqual([
            'describe_entity',
            'get_entity',
            'list_collections',
            'list_entities',
            'search_entities',
        ]);
    });

    it('у каждого есть схемы входа и выхода', async () => {
        const { tools } = await client.listTools();

        for (const tool of tools) {
            expect(tool.description, tool.name).toBeTruthy();
            expect(tool.inputSchema, tool.name).toBeTruthy();
            expect(tool.outputSchema, tool.name).toBeTruthy();
            expect(tool.annotations?.readOnlyHint, tool.name).toBe(true);
        }
    });

    it('инструкции объясняют, что данные на английском', async () => {
        expect(await client.getInstructions()).toMatch(/in English/);
    });
});

describe('list_collections', () => {
    it('отдаёт structuredContent и текст', async () => {
        const result = await call('list_collections');

        expect(result.isError).toBeFalsy();
        expect(result.structuredContent.totalEntities).toBe(2);
        expect(result.structuredContent.collections.map((item) => item.id)).toEqual(['ladder', 'ships']);
        expect(result.content[0].text).toContain('| collection |');
    });
});

describe('search_entities', () => {
    it('находит и ранжирует', async () => {
        const result = await call('search_entities', { query: 'flagship' });

        expect(result.structuredContent.results[0].id).toBe('Flagship');
        expect(result.content[0].text).toContain('Flagship');
    });

    it('пустая строка отсекается схемой', async () => {
        const result = await call('search_entities', { query: '' });
        expect(result.isError).toBe(true);
    });
});

describe('list_entities', () => {
    it('отдаёт страницу', async () => {
        const result = await call('list_entities', { collection: 'ships' });

        expect(result.structuredContent.total).toBe(1);
        expect(result.structuredContent.items[0].id).toBe('Flagship');
    });
});

describe('describe_entity', () => {
    it('отдаёт типы и скрытые поля', async () => {
        const result = await call('describe_entity', { collection: 'ships', id: 'Flagship' });

        expect(result.structuredContent.fields.find((field) => field.name === 'icons').hidden).toBe(true);
        expect(result.content[0].text).toContain('hidden by default');
    });
});

describe('get_entity', () => {
    it('по умолчанию markdown с осью уровней и без иконок', async () => {
        const levels = await call('get_entity', { collection: 'ladder', id: 'levels' });
        expect(levels.structuredContent.format).toBe('markdown');
        expect(levels.structuredContent.markdown).toContain('| lvl | Basic | Advanced | Elite |');

        const ship = await call('get_entity', { collection: 'ships', id: 'Flagship' });
        expect(ship.structuredContent.markdown).not.toContain('base64');
    });

    it('format: json отдаёт data', async () => {
        const result = await call('get_entity', { collection: 'ships', id: 'Flagship', format: 'json' });

        expect(result.structuredContent.data.Name).toBe('Flagship');
        expect(result.structuredContent.data.icons).toBeUndefined();
    });

    it('format: table отдаёт ось уровней', async () => {
        const result = await call('get_entity', { collection: 'ladder', id: 'levels', format: 'table' });

        expect(result.structuredContent.table.columns).toEqual(['Basic', 'Advanced', 'Elite']);
        expect(result.structuredContent.table.rows[0]).toEqual({ field: 'Cost', values: [10, 20, 30] });
    });

    it('fields сужает ответ', async () => {
        const result = await call('get_entity', { collection: 'ships', id: 'Flagship', format: 'json', fields: ['Name'] });

        expect(result.structuredContent.fields).toEqual(['Name']);
    });

    it('неизвестная сущность — ошибка, а не исключение протокола', async () => {
        const result = await call('get_entity', { collection: 'ships', id: 'nope' });

        expect(result.isError).toBe(true);
        expect(result.content[0].text).toContain('not found');
    });

    it('неизвестный format отсекается схемой', async () => {
        const result = await call('get_entity', { collection: 'ships', id: 'Flagship', format: 'xml' });
        expect(result.isError).toBe(true);
    });
});
