import { describe, expect, it } from 'vitest';

import { createStore } from '../src/store.js';

const FIXTURE = {
    ships: {
        Flagship: {
            Name: 'Flagship',
            Description: 'The biggest hull in the fleet',
            Cost: [100, 250, 500],
            Power: [10, 20, 30],
            Hull: 900,
            icons: 'data:image/png;base64,AAAABBBBCCCC',
        },
        Shuttle: {
            Name: 'Shuttle',
            Description: 'Cheap transport',
            Cost: [5, 9],
            Power: [1, 2],
        },
    },
    levels: {
        ladder: {
            Name: ['Basic', 'Advanced', 'Elite'],
            Cost: [10, 20, 30],
            Power: [1, 2, 3],
        },
        flat: {
            Name: 'Flat entity',
            OnlyScalar: 'value',
        },
    },
    bulk: {
        big: {
            Name: 'Bulk',
            Long: Array.from({ length: 1000 }, (unused, i) => `item-${i}`),
        },
    },
};

const makeStore = (limits) => createStore(FIXTURE, { limits: { maxFieldBytes: 200, ...limits } });

describe('listCollections', () => {
    it('считает коллекции, сущности и поля', () => {
        const list = makeStore().listCollections();

        expect(list.totalCollections).toBe(3);
        expect(list.totalEntities).toBe(5);
        expect(list.collections.find((item) => item.id === 'ships').entities).toBe(2);
    });

    it('сортирует по убыванию числа сущностей, при равенстве — по имени', () => {
        const list = makeStore().listCollections();
        expect(list.collections.map((item) => item.id)).toEqual(['levels', 'ships', 'bulk']);
    });
});

describe('listEntities', () => {
    it('режет по offset и limit', () => {
        const page = makeStore().listEntities('ships', { offset: 1, limit: 1 });

        expect(page.total).toBe(2);
        expect(page.offset).toBe(1);
        expect(page.items).toHaveLength(1);
        expect(page.items[0].id).toBe('Shuttle');
    });

    it('limit по умолчанию и потолок', () => {
        const store = makeStore({ defaultLimit: 1, maxLimit: 1 });
        expect(store.listEntities('ships').items).toHaveLength(1);
        expect(store.listEntities('ships', { limit: 999 }).items).toHaveLength(1);
    });

    it('падает с подсказкой на неизвестной коллекции', () => {
        expect(() => makeStore().listEntities('nope')).toThrow(/Collection "nope" not found/);
    });
});

describe('searchEntities', () => {
    it('находит по Name и ранжирует его выше Description', () => {
        const found = makeStore().searchEntities('flagship');

        expect(found.total).toBeGreaterThan(0);
        expect(found.results[0].id).toBe('Flagship');
        expect(found.results[0].field).toBe('Name');
        expect(found.results[0].collection).toBe('ships');
    });

    it('не зависит от регистра', () => {
        expect(makeStore().searchEntities('SHUTTLE').results[0].id).toBe('Shuttle');
    });

    it('не ищет по скрытым полям', () => {
        expect(makeStore().searchEntities('AAAABBBBCCCC').total).toBe(0);
    });

    it('фильтрует по коллекции', () => {
        const found = makeStore().searchEntities('cost', { collection: 'levels' });

        expect(found.total).toBe(1);
        expect(found.results.every((item) => item.collection === 'levels')).toBe(true);
    });

    it('находит по имени поля, а не только по значению', () => {
        const found = makeStore().searchEntities('OnlyScalar');

        expect(found.results[0].id).toBe('flat');
        expect(found.results[0].field).toBe('OnlyScalar');
    });

    it('режет по limit и отдаёт общее число', () => {
        const found = makeStore().searchEntities('item-1', { limit: 3 });

        expect(found.results.length).toBeLessThanOrEqual(3);
        expect(found.total).toBeGreaterThanOrEqual(found.results.length);
    });

    it('отдаёт фрагмент вокруг совпадения', () => {
        const found = makeStore().searchEntities('fleet', { snippetRadius: 10 });
        expect(found.results[0].snippet).toContain('fleet');
    });

    it('пустой запрос — ошибка', () => {
        expect(() => makeStore().searchEntities('  ')).toThrow(/Empty search query/);
    });
});

describe('describeEntity', () => {
    it('раздаёт типы и отмечает скрытые поля', () => {
        const described = makeStore().describeEntity('ships', 'Flagship');
        const byName = Object.fromEntries(described.fields.map((field) => [field.name, field]));

        expect(described.totalFields).toBe(6);
        expect(byName.Name.type).toBe('string');
        expect(byName.Hull.type).toBe('number');
        expect(byName.Cost.type).toBe('array<scalar>');
        expect(byName.icons.hidden).toBe(true);
        expect(byName.Name.hidden).toBe(false);
    });

    it('сортирует поля по имени', () => {
        const names = makeStore().describeEntity('ships', 'Flagship').fields.map((field) => field.name);
        expect(names).toEqual([...names].sort());
    });
});

describe('getEntity — скрытие полей', () => {
    it('по умолчанию прячет иконки', () => {
        const entity = makeStore().getEntity('ships', 'Flagship');

        expect(entity.fields).not.toContain('icons');
        expect(entity.markdown).not.toContain('base64');
        expect(entity.hiddenFields).toEqual(['icon', 'icons']);
    });

    it('includeIcons возвращает иконки', () => {
        const entity = makeStore().getEntity('ships', 'Flagship', { includeIcons: true });
        expect(entity.fields).toContain('icons');
    });

    it('явный fields важнее политики скрытия', () => {
        const entity = makeStore().getEntity('ships', 'Flagship', { format: 'json', fields: ['icons'] });

        expect(entity.fields).toEqual(['icons']);
        expect(entity.data.icons).toContain('base64');
    });
});

describe('getEntity — fields', () => {
    it('оставляет ровно запрошенные поля', () => {
        const entity = makeStore().getEntity('ships', 'Flagship', { format: 'json', fields: ['Name', 'Hull'] });

        expect(entity.fields).toEqual(['Name', 'Hull']);
        expect(Object.keys(entity.data)).toEqual(['Name', 'Hull']);
    });

    it('без fields отдаёт все видимые поля', () => {
        const entity = makeStore().getEntity('ships', 'Shuttle', { format: 'json' });
        expect(entity.fields).toEqual(['Name', 'Description', 'Cost', 'Power']);
    });

    it('неизвестное поле — ошибка со списком', () => {
        expect(() => makeStore().getEntity('ships', 'Flagship', { fields: ['nope'] })).toThrow(
            /Entity "ships\/Flagship" has no field "nope"/,
        );
    });
});

describe('getEntity — форматы', () => {
    it('markdown по умолчанию и содержит ось уровней', () => {
        const entity = makeStore().getEntity('levels', 'ladder');

        expect(entity.format).toBe('markdown');
        expect(entity.markdown).toContain('| lvl | Basic | Advanced | Elite |');
        expect(entity.markdown).toContain('| Cost | `10` | `20` | `30` |');
        expect(entity.data).toBeUndefined();
    });

    it('table отдаёт ось уровней структурированно', () => {
        const entity = makeStore().getEntity('levels', 'ladder', { format: 'table' });

        expect(entity.table.columns).toEqual(['Basic', 'Advanced', 'Elite']);
        expect(entity.table.rows).toEqual([
            { field: 'Cost', values: [10, 20, 30] },
            { field: 'Power', values: [1, 2, 3] },
        ]);
        expect(entity.markdown).toBeUndefined();
    });

    it('table без оси уровней возвращает пустую сетку, а не ошибку', () => {
        const entity = makeStore().getEntity('levels', 'flat', { format: 'table' });

        expect(entity.table).toEqual({ columns: [], rows: [] });
    });

    it('json отдаёт сырые значения', () => {
        const entity = makeStore().getEntity('ships', 'Shuttle', { format: 'json' });

        expect(entity.data.Hull).toBeUndefined();
        expect(entity.data.Cost).toEqual([5, 9]);
        expect(entity.markdown).toBeUndefined();
    });
});

describe('getEntity — усечение', () => {
    it('обрезает огромное поле и ставит truncated', () => {
        const entity = makeStore().getEntity('bulk', 'big', { format: 'json' });

        expect(entity.truncated).toBe(true);
        expect(entity.data.Long.length).toBeLessThan(1000);
    });

    it('bytes считает по реальному payload, а не по сырому объекту', () => {
        const entity = makeStore().getEntity('levels', 'ladder', { format: 'table' });
        expect(entity.bytes).toBe(JSON.stringify(entity.table).length);
    });

    it('превышение maxResultBytes даёт понятную ошибку', () => {
        const store = makeStore({ maxResultBytes: 50 });
        expect(() => store.getEntity('ships', 'Flagship')).toThrow(/over the 50 byte limit/);
    });
});

describe('getEntity — ошибки', () => {
    it('неизвестная сущность', () => {
        expect(() => makeStore().getEntity('ships', 'nope')).toThrow(/Entity "nope" not found/);
    });

    it('сущность, которая не объект, пропускается при загрузке', () => {
        const store = createStore({ broken: { ok: { Name: 'ok' }, bad: 'строка' } });
        expect(store.listCollections().totalEntities).toBe(1);
    });
});
