import { readFileSync } from 'node:fs';

import { pickLevels, renderEntity } from './markdown.js';

const DEFAULT_LIMITS = {
    defaultLimit: 50,
    maxLimit: 200,
    defaultSearchLimit: 20,
    maxFieldBytes: 4096,
    maxResultBytes: 65536,
    maxScanElements: 200,
    snippetRadius: 60,
};

const NAME_FIELD_SCORE = 30;
const OTHER_FIELD_SCORE = 10;
const WHOLE_MATCH_SCORE = 40;
const PREFIX_MATCH_SCORE = 20;
const EXTRA_HIT_SCORE = 2;
const MAX_RANKED_HITS = 5;
const ID_HINT_SIZE = 20;

function byteSize(value) {
    if (value === undefined) return 0;
    return JSON.stringify(value)?.length ?? 0;
}

function valueType(value) {
    if (value === null) return 'null';
    if (Array.isArray(value)) {
        const objects = value.filter((item) => item !== null && typeof item === 'object');
        return objects.length === value.length && value.length > 0 ? 'array<object>' : 'array<scalar>';
    }
    const type = typeof value;
    return type === 'object' ? 'object' : /** @type {any} */ (type);
}

function titleOf(entity, id) {
    const name = entity.Name;
    return typeof name === 'string' && name ? name : id;
}

/**
 * @param {Record<string, unknown>} entity
 * @param {Set<string>} hidden
 * @param {number} maxElements
 * @return {[string, string][]}
 */
function collectLeaves(entity, hidden, maxElements) {
    /** @type {[string, string][]} */
    const leaves = [];
    /** @type {Set<string>} */
    const paths = new Set();

    const walk = (path, value) => {
        if (hidden.has(path)) return;

        if (!paths.has(path)) {
            paths.add(path);
            leaves.push([path, path]);
        }

        if (Array.isArray(value)) {
            const limit = Math.min(value.length, maxElements);
            for (let i = 0; i < limit; i++) walk(path, value[i]);
            return;
        }

        if (value !== null && typeof value === 'object') {
            for (const [key, nested] of Object.entries(value)) {
                if (hidden.has(key)) continue;
                walk(`${path}.${key}`, nested);
            }
            return;
        }

        if (value === null || value === undefined) return;
        leaves.push([path, String(value)]);
    };

    for (const [key, value] of Object.entries(entity)) walk(key, value);
    return leaves;
}

/**
 * @param {number} matchAt индекс совпадения query в text
 */
function makeSnippet(text, matchAt, query, radius) {
    const flat = text.replace(/\s+/g, ' ').trim();
    const from = Math.max(0, matchAt - radius);
    const to = Math.min(flat.length, matchAt + query.length + radius);
    return `${from > 0 ? '…' : ''}${flat.slice(from, to)}${to < flat.length ? '…' : ''}`;
}

/**
 * Shrink a single field until it fits maxBytes, dropping trailing array
 * elements or object keys. `truncated` tells the caller data was lost.
 * @param {unknown} value
 * @param {number} maxBytes
 * @return {{value: unknown, truncated: boolean}}
 */
function clampValue(value, maxBytes) {
    if (byteSize(value) <= maxBytes) return { value, truncated: false };

    if (Array.isArray(value)) {
        const kept = [];
        let size = 2;
        for (const item of value) {
            const itemSize = byteSize(item) + 1;
            if (size + itemSize > maxBytes) break;
            kept.push(item);
            size += itemSize;
        }
        return { value: kept, truncated: true };
    }

    if (value !== null && typeof value === 'object') {
        /** @type {Record<string, unknown>} */
        const kept = {};
        let size = 2;
        for (const [key, item] of Object.entries(value)) {
            const itemSize = byteSize(item) + byteSize(key) + 3;
            if (size + itemSize > maxBytes) break;
            kept[key] = item;
            size += itemSize;
        }
        return { value: kept, truncated: true };
    }

    if (typeof value === 'string') return { value: value.slice(0, maxBytes), truncated: true };
    return { value, truncated: false };
}

/**
 * Reads a dataset snapshot: collection listing, paging, substring search and
 * single-entity reads in markdown / json / table form.
 * @param {Record<string, Record<string, unknown>>} collections
 * @param {object} [options] hiddenFields и limits, см. SERVER в config.js
 * @return {object} хранилище с методами чтения датасета
 */
export function createStore(collections, options = {}) {
    const hidden = new Set(options.hiddenFields ?? ['icon', 'icons']);
    const limits = { ...DEFAULT_LIMITS, ...options.limits };

    /** @type {Map<string, Map<string, any>>} */
    const index = new Map();
    let totalEntities = 0;
    let totalFields = 0;
    let totalBytes = 0;

    for (const [collectionId, entities] of Object.entries(collections ?? {})) {
        /** @type {Map<string, any>} */
        const byId = new Map();

        for (const [id, entity] of Object.entries(entities ?? {})) {
            if (entity === null || typeof entity !== 'object' || Array.isArray(entity)) continue;

            const fieldNames = Object.keys(entity);
            const record = {
                id,
                title: titleOf(entity, id),
                entity,
                fieldNames,
                bytes: byteSize(entity),
                leaves: collectLeaves(entity, hidden, limits.maxScanElements),
            };

            byId.set(id, record);
            totalEntities++;
            totalFields += fieldNames.length;
            totalBytes += record.bytes;
        }

        index.set(collectionId, byId);
    }

    function requireCollection(collection) {
        const byId = index.get(collection);
        if (!byId) {
            throw new Error(`Collection "${collection}" not found. Available: ${[...index.keys()].join(', ')}`);
        }
        return byId;
    }

    function requireEntity(collection, id) {
        const byId = requireCollection(collection);
        const record = byId.get(id);
        if (!record) {
            const names = [...byId.keys()];
            const hint = names.slice(0, ID_HINT_SIZE).join(', ') +
                (names.length > ID_HINT_SIZE ? `, ... ${names.length} total` : '');
            throw new Error(`Entity "${id}" not found in "${collection}". Available: ${hint}`);
        }
        return record;
    }

    function clampLimit(limit, max) {
        const value = Math.floor(Number(limit));
        if (!Number.isFinite(value) || value <= 0) return 0;
        return Math.min(value, max);
    }

    /**
     * An explicit `fields` whitelist is the model asking for a field by name, so
     * it outranks the hidden-by-default policy. `includeIcons` re-opens the
     * hidden fields without having to name them.
     * @param {string} collection
     * @param {string} id
     * @param {any} record
     * @param {object} args fields и includeIcons
     * @return {Record<string, unknown>}
     */
    function selectFields(collection, id, record, { fields, includeIcons }) {
        /** @type {Set<string>|null} */
        let whitelist = null;

        if (Array.isArray(fields) && fields.length > 0) {
            whitelist = new Set();
            for (const name of fields) {
                if (!record.fieldNames.includes(name)) {
                    const sample = record.fieldNames.slice(0, ID_HINT_SIZE).join(', ');
                    throw new Error(
                        `Entity "${collection}/${id}" has no field "${name}". ` +
                        `It has ${record.fieldNames.length} fields, first ones: ${sample}. ` +
                        'Use describe_entity for the full list.',
                    );
                }
                whitelist.add(name);
            }
        }

        const view = {};
        for (const name of record.fieldNames) {
            const visible = whitelist ? whitelist.has(name) : !(hidden.has(name) && !includeIcons);
            if (visible) view[name] = record.entity[name];
        }
        return view;
    }

    return {
        limits,
        hiddenFields: [...hidden],

        listCollections() {
            const list = [...index.entries()].map(([id, byId]) => {
                const records = [...byId.values()];
                return {
                    id,
                    entities: records.length,
                    fields: records.reduce((sum, record) => sum + record.fieldNames.length, 0),
                    bytes: records.reduce((sum, record) => sum + record.bytes, 0),
                };
            });

            list.sort((a, b) => b.entities - a.entities || a.id.localeCompare(b.id));

            return {
                totalCollections: list.length,
                totalEntities,
                totalFields,
                totalBytes,
                hiddenFields: [...hidden],
                collections: list,
            };
        },

        /**
         * Страница сущностей коллекции: total, offset, limit и items.
         */
        listEntities(collection, args = {}) {
            const records = [...requireCollection(collection).values()];
            const offset = Math.max(0, Math.floor(Number(args.offset) || 0));
            const limit = clampLimit(args.limit ?? limits.defaultLimit, limits.maxLimit);

            return {
                collection,
                total: records.length,
                offset,
                limit,
                items: records.slice(offset, offset + limit).map((record) => ({
                    id: record.id,
                    title: record.title,
                    fields: record.fieldNames.length,
                    bytes: record.bytes,
                })),
            };
        },

        /**
         * Case-insensitive substring search. Ranking favours the Name field, an
         * exact match and a prefix match; all texts the agent reads stay in English.
         */
        searchEntities(query, args = {}) {
            const needle = String(query ?? '').trim().toLowerCase();
            if (!needle) throw new Error('Empty search query.');

            const limit = clampLimit(args.limit ?? limits.defaultSearchLimit, limits.maxLimit);
            const collections = args.collection ?
                [[args.collection, requireCollection(args.collection)]] :
                [...index.entries()];

            /** @type {{score: number, collection: string, record: any, field: string, snippet: string, hits: number}[]} */
            const found = [];

            for (const [collectionId, byId] of collections) {
                for (const record of byId.values()) {
                    let best = null;
                    let hits = 0;

                    for (const [field, text] of record.leaves) {
                        const lower = text.toLowerCase();
                        const at = lower.indexOf(needle);
                        if (at === -1) continue;
                        hits++;

                        const score =
                            (field === 'Name' ? NAME_FIELD_SCORE : OTHER_FIELD_SCORE) +
                            (lower === needle ? WHOLE_MATCH_SCORE : 0) +
                            (lower.startsWith(needle) ? PREFIX_MATCH_SCORE : 0);

                        if (!best || score > best.score) {
                            best = { score, field, snippet: makeSnippet(text, at, needle, limits.snippetRadius) };
                        }
                    }

                    if (best) {
                        found.push({
                            ...best,
                            collection: collectionId,
                            record,
                            hits,
                            score: best.score + Math.min(hits, MAX_RANKED_HITS) * EXTRA_HIT_SCORE,
                        });
                    }
                }
            }

            found.sort((a, b) => b.score - a.score || a.record.title.localeCompare(b.record.title));

            return {
                query: String(query),
                total: found.length,
                results: found.slice(0, limit).map((hit) => ({
                    collection: hit.collection,
                    id: hit.record.id,
                    title: hit.record.title,
                    field: hit.field,
                    hits: hit.hits,
                    score: hit.score,
                    snippet: hit.snippet,
                })),
            };
        },

        /**
         * Имена полей с типами и размерами, но без значений.
         */
        describeEntity(collection, id) {
            const record = requireEntity(collection, id);

            return {
                collection,
                id,
                title: record.title,
                totalFields: record.fieldNames.length,
                bytes: record.bytes,
                hiddenFields: [...hidden],
                fields: [...record.fieldNames].sort().map((name) => ({
                    name,
                    type: valueType(record.entity[name]),
                    bytes: byteSize(record.entity[name]),
                    hidden: hidden.has(name),
                })),
            };
        },

        /**
         * Конверт с markdown, data или table — по args.format.
         */
        getEntity(collection, id, args = {}) {
            const record = requireEntity(collection, id);
            const format = args.format ?? 'markdown';
            const view = selectFields(collection, id, record, args);

            const envelope = {
                collection,
                id,
                title: record.title,
                format,
                fields: Object.keys(view),
                hiddenFields: [...hidden],
                bytes: 0,
                truncated: false,
            };

            /** @type {unknown} */
            let payload;

            if (format === 'json') {
                const data = {};
                for (const [name, value] of Object.entries(view)) {
                    const clamped = clampValue(value, limits.maxFieldBytes);
                    data[name] = clamped.value;
                    if (clamped.truncated) envelope.truncated = true;
                }
                payload = data;
                envelope.data = data;
            } else if (format === 'table') {
                const levels = pickLevels(view);
                payload = levels ?
                    { columns: levels.columns, rows: levels.rows.map(([field, values]) => ({ field, values })) } :
                    { columns: [], rows: [] };
                envelope.table = payload;
            } else {
                const markdown = renderEntity(view, { level: 2, id });
                payload = markdown || `_this entity has no fields other than images (${[...hidden].join(', ')})_`;
                envelope.markdown = payload;
            }

            envelope.bytes = byteSize(payload);

            if (envelope.bytes > limits.maxResultBytes) {
                throw new Error(
                    `Result for "${collection}/${id}" is ${envelope.bytes} bytes, over the ${limits.maxResultBytes} byte limit. ` +
                    'Narrow the request: pass fields, use format: "table", or pick a smaller collection.',
                );
            }

            return envelope;
        },
    };
}

/**
 * @param {string} path путь к dataset.json
 */
export function loadStore(path, options = {}) {
    return createStore(JSON.parse(readFileSync(path, 'utf-8')), options);
}
