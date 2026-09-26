import { existsSync, readFileSync } from 'node:fs';

import { cachedIconPath } from '../iconCache.js';

const SOURCES = {
    modules: { fields: ['Icon'], dir: 'Modules', many: false },
    capital_ships: { fields: ['Model'], dir: 'Ships', many: true, rootOnly: true },
    spacebuildings: { fields: ['PrefabModel', 'Model'], dir: 'SpaceBuildings', many: false },
    stars: { fields: ['Icon'], dir: 'Stars', many: false },
    distinctions: { fields: ['Icon'], dir: 'Distinctions', many: false },
};

// логика src/components/Icon.vue: без неё 24 из 210 моделей кораблей не находятся
const CERBERUS_RENAMES = {
    Fighter_Cerberus3_DrkNeb: 'Fighter_Cerberus_DrkNeb',
    Cerberus_Destroyer_DrkNeb: 'Fighter_DrkNeb_Cerberus3',
    Cerberus_DrkNeb_Swarm: 'Cerberus_DrkNeb_swarm1',
};

function realName(name) {
    if (!name.includes('Cerberus') || !name.includes('_lv1')) return name;

    const stripped = name.replace('_lv1', '');
    return CERBERUS_RENAMES[stripped] || stripped;
}

const checked = new Map();

function icon2base64(filePath) {
    const base64 = readFileSync(filePath).toString('base64');

    return `data:image/png;base64,${base64}`;
}

/**
 * @return {string|null} base64
 */
export function iconUrl(dir, name) {
    if (typeof name !== 'string' || !name) return null;

    const file = `${realName(name)}.png`;
    const key = `${dir}/${file}`;

    if (!checked.has(key)) {
        const p = cachedIconPath(dir, file);

        if (existsSync(p)) {
            checked.set(key, icon2base64(p));
        }
    }

    return checked.get(key) ?? null;
}

export default {
    name: 'icons',

    transform(entity, { collection, depth = 0 }) {
        const source = SOURCES[collection];
        if (!source) return entity;

        if (source.rootOnly && depth > 0) return entity;

        const field = source.fields.find((f) => entity[f] !== undefined && entity[f] !== null);
        if (!field) return entity;
        const out = { ...entity };

        if (source.many) {
            const list = Array.isArray(entity[field]) ? entity[field] : [entity[field]];
            out.icons = list.map((name) => iconUrl(source.dir, name));
            if (out.icons.length && out.icons.every(Boolean)) delete out[field];
            return out;
        }

        const icon = iconUrl(source.dir, entity[field]);
        out.icon = icon;

        if (icon) delete out[field];
        return out;
    },
};
