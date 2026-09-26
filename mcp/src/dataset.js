import { FILES, OPTIONS } from '../config.js';
import { loadSources, normalize } from './loadSources.js';
import { isPlainObject } from '../utils/types.js';

import hide from './plugins/hide.js';
import format from './plugins/format.js';
import icons from './plugins/icons.js';
import i18n from './plugins/i18n.js';

const PIPELINE = [icons, hide, format, i18n];

const ctx = { options: OPTIONS };

/**
 * @param {unknown} value
 * @param {{collection: string, entityId: string, name: string|null, depth: number}} params
 * @return {unknown}
 */
function processValue(value, params) {
    if (Array.isArray(value)) {
        return value.map((item) => processValue(item, { ...params, name: null }));
    }

    if (!isPlainObject(value)) return value;

    return process(value, params);
}

function process(raw, { collection, entityId, name, depth = 0 }) {
    let entity = raw;

    if (name) entity = { ...entity, Name: name };

    for (const step of PIPELINE) {
        entity = step.transform(entity, { ...ctx, collection, entityId, depth });
    }

    const processed = {};
    for (const [key, value] of Object.entries(entity)) {
        processed[key] = processValue(value, { collection, entityId, name: key, depth: depth + 1 });
    }

    return processed;
}

export async function buildDataset() {
    const collections = {};
    let entities = 0;
    let fields = 0;

    for (const { id, data } of await loadSources(FILES)) {
        const collection = {};

        for (const [entityId, raw] of Object.entries(normalize(data, id))) {
            const entity = process(raw, { collection: id, entityId, name: null });
            collection[entityId] = entity;
            entities += 1;
            fields += Object.keys(entity).length;
        }

        collections[id] = collection;
    }

    return { collections, stats: { collections: Object.keys(collections).length, entities, fields } };
}
