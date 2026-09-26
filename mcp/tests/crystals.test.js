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
        },
    },
};

const { CrystalConverter } = await import('../src/crystalConverter.js');

/** @type {Client} */
let client;

beforeAll(async () => {
    const store = createStore(FIXTURE, { limits: { maxFieldBytes: 200 } });
    const server = createServer(store, { crystalConverter: CrystalConverter });

    const [clientTransport, serverTransport] = InMemoryTransport.createLinkedPair();
    client = new Client({ name: 'test', version: '0.0.0' });
    await Promise.all([server.connect(serverTransport), client.connect(clientTransport)]);
});

const call = (name, args = {}) => client.callTool({ name, arguments: args });

/**
 * Ожидание берём из самого класса: тест проверяет, что инструмент вызывает
 * CrystalConverter, а не что он умеет считать.
 */
function expected(amount, from, to) {
    const byUnit = {
        seconds: CrystalConverter.sec2crystals,
        credits: CrystalConverter.credit2crystals,
        hydrogen: CrystalConverter.hydrogen2crystals,
    };
    const toValue = {
        seconds: CrystalConverter.crystals2sec,
        credits: CrystalConverter.crystals2credit,
        hydrogen: CrystalConverter.crystals2hydrogen,
    };

    return from === 'crystals' ? toValue[to](amount) : byUnit[from](amount);
}

describe('native crystalConverter import', () => {
    it('loads the app TypeScript module without a build step', () => {
        expect(typeof CrystalConverter.sec2crystals).toBe('function');
        expect(typeof CrystalConverter.crystals2hydrogen).toBe('function');
    });

    it('adds the converter to the five dataset tools', async () => {
        const { tools } = await client.listTools();
        expect(tools.map((tool) => tool.name)).toEqual([
            'list_collections',
            'search_entities',
            'list_entities',
            'describe_entity',
            'get_entity',
            'convert_crystals',
        ]);
    });

    it('tells the agent the curve is not linear and not to interpolate', async () => {
        const { tools } = await client.listTools();
        const { description } = tools.find((tool) => tool.name === 'convert_crystals');

        // Без этого агент посчитает перевод сам по двум известным точкам и промахнётся
        expect(description).toMatch(/not linear/);
        expect(description).toMatch(/interpolat/i);
    });

    it('states in the server instructions that conversions must not be hand-computed', async () => {
        const instructions = await client.getInstructions();

        expect(instructions).toMatch(/not linear/);
    });
});

describe('convert_crystals', () => {
    it('converts crystals to time', async () => {
        const result = (await call('convert_crystals', { amount: 250, from: 'crystals', to: 'seconds' })).structuredContent;

        expect(result.value).toBe(CrystalConverter.crystals2sec(250));
        expect(result.to).toBe('seconds');
        expect(result.from).toBe('crystals');
        expect(result.amount).toBe(250);
    });

    it('converts crystals to credits and hydrogen', async () => {
        const credits = (await call('convert_crystals', { amount: 250, from: 'crystals', to: 'credits' })).structuredContent;
        const hydrogen = (await call('convert_crystals', { amount: 250, from: 'crystals', to: 'hydrogen' })).structuredContent;

        expect(credits.value).toBe(CrystalConverter.crystals2credit(250));
        expect(hydrogen.value).toBe(CrystalConverter.crystals2hydrogen(250));
    });

    it('converts each resource to crystals, dispatching on the source unit', async () => {
        const time = (await call('convert_crystals', { amount: 1800, from: 'seconds', to: 'crystals' })).structuredContent;
        const credits = (await call('convert_crystals', { amount: 500, from: 'credits', to: 'crystals' })).structuredContent;
        const hydrogen = (await call('convert_crystals', { amount: 50, from: 'hydrogen', to: 'crystals' })).structuredContent;

        expect(time.value).toBe(CrystalConverter.sec2crystals(1800));
        expect(credits.value).toBe(CrystalConverter.credit2crystals(500));
        expect(hydrogen.value).toBe(CrystalConverter.hydrogen2crystals(50));
    });

    it('dispatches to the right method in every one of the six directions', async () => {
        const pairs = [
            ['crystals', 'seconds'],
            ['crystals', 'credits'],
            ['crystals', 'hydrogen'],
            ['seconds', 'crystals'],
            ['credits', 'crystals'],
            ['hydrogen', 'crystals'],
        ];

        for (const [from, to] of pairs) {
            const result = (await call('convert_crystals', { amount: 7200, from, to })).structuredContent;
            expect(result.value, `${from} -> ${to}`).toBe(expected(7200, from, to));
        }
    });

    it('rounds to two decimals the way the site calculator does', async () => {
        const result = (await call('convert_crystals', { amount: 1800, from: 'seconds', to: 'crystals' })).structuredContent;

        expect(result.value).toBe(4.6);
        expect(result.rounded).toBe(4.6);
    });

    it('rounds a long decimal in the rounded field only', async () => {
        const result = (await call('convert_crystals', { amount: 1800, from: 'seconds', to: 'crystals' })).structuredContent;
        const coarse = (await call('convert_crystals', { amount: 7200, from: 'seconds', to: 'crystals' })).structuredContent;

        expect(coarse.value).toBe(22.608695652173914);
        expect(coarse.rounded).toBe(22.61);
        expect(result.display).toBe('4.6');
    });

    it('returns the limit the converter clamps to, without inventing a price', async () => {
        const high = (await call('convert_crystals', { amount: 1000000000, from: 'credits', to: 'crystals' })).structuredContent;
        const low = (await call('convert_crystals', { amount: 0.5, from: 'crystals', to: 'seconds' })).structuredContent;

        expect(high.value).toBe(CrystalConverter.credit2crystals(1000000000));
        expect(low.value).toBe(CrystalConverter.crystals2sec(0.5));
        expect(high.rounded).toBe(high.value);
    });

    it('handles zero without a broken display', async () => {
        const result = (await call('convert_crystals', { amount: 0, from: 'crystals', to: 'seconds' })).structuredContent;

        expect(result.value).toBe(0);
        expect(result.display).toBe('0');
    });

    it('rejects a negative amount', async () => {
        const result = await call('convert_crystals', { amount: -5, from: 'crystals', to: 'seconds' });

        // SDK отдаёт ошибку инструмента как isError, а не как reject — модель её видит
        expect(result.isError).toBe(true);
        expect(result.content[0].text).toMatch(/non-negative/);
    });

    it('rejects converting a unit to itself', async () => {
        const result = await call('convert_crystals', { amount: 10, from: 'credits', to: 'credits' });

        expect(result.isError).toBe(true);
        expect(result.content[0].text).toMatch(/both "credits"/);
    });
});
