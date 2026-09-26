import { z } from 'zod';

import { collectionArg, limitArg, plural, READ_ONLY } from './shared.js';

function text(found) {
    if (found.results.length === 0) {
        return `Nothing found for "${found.query}". The dataset is in English - try an English term: Ship, Flagship, Hydrogen.`;
    }
    const lines = found.results.map(
        (item) => `- **${item.collection}/${item.id}** - ${item.title} - matched in field ${item.field} - score ${item.score}\n  ${item.snippet}`,
    );
    return `"${found.query}": ${found.total} ${plural(found.total, 'match', 'matches')}\n\n${lines.join('\n')}`;
}

export function registerSearchEntities(server, store) {
    server.registerTool(
        'search_entities',
        {
            title: 'Search the dataset',
            description:
                'Case-insensitive substring search across entity names, field names and values. The dataset is in English, so search in English: Ship, Flagship, Hydrogen. ' +
                'Returns the collection, entity id, the field that matched and a snippet around the match.',
            annotations: READ_ONLY,
            inputSchema: {
                query: z.string().min(1).describe('what to look for, for example Flagship or hydrogen'),
                collection: collectionArg.optional().describe('restrict the search to a single collection'),
                limit: limitArg,
            },
            outputSchema: {
                query: z.string(),
                total: z.number(),
                results: z.array(
                    z.object({
                        collection: z.string(),
                        id: z.string(),
                        title: z.string(),
                        field: z.string(),
                        hits: z.number(),
                        score: z.number(),
                        snippet: z.string(),
                    }),
                ),
            },
        },
        async ({ query, collection, limit }) => {
            const result = store.searchEntities(query, { collection, limit });
            return { content: [{ type: 'text', text: text(result) }], structuredContent: result };
        },
    );
}
