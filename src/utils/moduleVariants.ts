import lightModules from '@Data/light_modules.js';
import darkModules from '@Data/dark_modules.js';
import modulesData from '@Data/modules.js';
import globals from '@Data/globals.js';
import locKeys from '@Regulation/locKeys.mjs';

export type ModuleVariantId = 'light' | 'dark';

export interface ModuleVariant {
    id: ModuleVariantId;
    titleLocKey: string;
    descriptionKey: string;
    data: Record<string, unknown>;
    fields: string[];
    extraModules: Record<string, unknown>[];
}

type VariantSource = Record<string, Record<string, unknown> & {
    Name?: string;
    TID_Description?: string;
}>;

/**
 * Parser/service fields that are not part of the variant's stat payload.
 * Everything else in a light/dark module entry is rendered automatically,
 * so new CSV columns need no changes here.
 */
const META_KEYS = new Set([
    'Name',
    'TID',
    'TID_Description',
    'Icon',
    'Model',
    'PrefabModel',
    'EnableQuantum',
    'VFX',
]);

const SOURCES: Record<ModuleVariantId, VariantSource> = {
    dark: darkModules as VariantSource,
    light: lightModules as VariantSource,
};

// Quantum progression lives in globals.csv, but belongs to every variant table.
const QUANTUM_GLOBAL_FIELDS = [
    'QuantumUpgradeBaseLevels',
    'QuantumArtifactBPReqs',
    'QuantumUpgradeCosts',
];

const QUANTUM_GLOBALS = Object.fromEntries(
    QUANTUM_GLOBAL_FIELDS
        .map((key) => [key, (globals as Record<string, unknown>)[key]])
        .filter(([, value]) => Array.isArray(value)),
);

type ModuleData = Record<string, unknown>;

const MODULES = modulesData as Record<string, ModuleData>;
const EFFECT_DURATION_STARS = ['YS', 'RS', 'WS', 'BS'];

function durationInSeconds(base: ModuleData, star: string): number {
    const suffixes = (star === 'BS') ? ['BS', 'BLS'] : [star];
    const candidates = [
        ...suffixes.map((suffix) => `EffectDurationx10${suffix}`),
        ...suffixes.map((suffix) => `EffectDuration${suffix}`),
        'EffectDurationx10',
        'EffectDuration',
    ];

    for (const key of candidates) {
        const raw = Number(base[key]);

        if (Number.isFinite(raw)) {
            return key.includes('x10') ? raw / 10 : raw;
        }
    }

    return 0;
}

/**
 * QEffectDurationF is a percentage of the module's effect duration, which is
 * different for every star type. The result is merged into the base module
 * object so DataStatByStar can render it under EffectDurationx10.
 * @param {ModuleData} base original module data
 * @param {number} percent QEffectDurationF value
 * @return {Record<string, number>} per-star effect durations in seconds
 */
export function getEffectDurationByStar(base: ModuleData, percent: number): Record<string, number> {
    const result: Record<string, number> = {};

    if (!Number.isFinite(percent)) {
        return result;
    }

    EFFECT_DURATION_STARS.forEach((star) => {
        const seconds = durationInSeconds(base, star) * percent / 100;

        if (seconds > 0) {
            result[`QEffectDurationF_${star}`] = seconds;
        }
    });

    return result;
}

/**
 * Discovers Light/Dark variants from the parsed CSV data itself. A module is
 * included only when the parser found a variant description for it, and its
 * fields are all non-service keys, so newly added stats appear automatically.
 * @return {Record<string, ModuleVariant[]>} variants grouped by module name
 */
export default function getModuleVariants(): Record<string, ModuleVariant[]> {
    const result: Record<string, ModuleVariant[]> = {};

    for (const [id, source] of Object.entries(SOURCES) as [ModuleVariantId, VariantSource][]) {
        for (const [moduleName, variantData] of Object.entries(source)) {
            if (!variantData || variantData.Name !== moduleName || !variantData.TID_Description) {
                continue;
            }

            const data = { ...QUANTUM_GLOBALS, ...variantData };
            const fields = Object.keys(data).filter((key) => (
                !META_KEYS.has(key) && !key.startsWith('_')
            ));
            const extraNames = Array.isArray(variantData.DroneExtraModule) ?
                variantData.DroneExtraModule :
                (variantData.DroneExtraModule) ? [variantData.DroneExtraModule] : [];
            const extraModules = extraNames
                .filter((name): name is string => typeof name === 'string')
                .map((name) => MODULES[name])
                .filter(Boolean)
                .map((module) => ({ ...module }));

            (result[moduleName] ??= []).push({
                id,
                titleLocKey: locKeys[id],
                descriptionKey: variantData.TID_Description,
                data,
                fields,
                extraModules,
            });
        }
    }

    return result;
}
