import { z } from 'zod';

export const READ_ONLY = { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false };

export const collectionArg = z
    .string()
    .describe('collection id, exactly as in the dataset: modules, capital_ships, achievements, stars, planets...');
export const entityArg = z.string().describe('entity id inside the collection, exactly as in the dataset');
export const limitArg = z
    .number()
    .int()
    .min(1)
    .max(200)
    .optional()
    .describe('how many results to return, defaults to 50 for lists and 20 for search');

export function kb(value) {
    return `${(Number(value) / 1024).toFixed(1)} KB`;
}

export function plural(count, one, many) {
    return count === 1 ? one : many;
}
