import { z } from 'zod';

import { collectionArg, kb, limitArg, plural, READ_ONLY } from './shared.js';

function text(page) {
    const lines = page.items.map(
        (item) => `- **${item.id}** - ${item.title} - ${item.fields} ${plural(item.fields, 'field', 'fields')} - ${kb(item.bytes)}`,
    );
    const tail =
        page.offset + page.items.length < page.total ?
            `\n\nShowing ${page.items.length} of ${page.total}. Next page: offset=${page.offset + page.items.length}` :
            `\n\nShowing all ${page.total}.`;
    return `**${page.collection}** (${page.total} ${plural(page.total, 'entity', 'entities')})\n\n${lines.join('\n')}${tail}`;
}

export function registerListEntities(server, store) {
    server.registerTool(
        'list_entities',
        {
            title: 'List entities of a collection',
            description:
                'Paginated list of the entities in a collection with their id and size. Needed for big collections such as modules (103 entities).',
            annotations: READ_ONLY,
            inputSchema: {
                collection: collectionArg,
                offset: z.number().int().min(0).optional().describe('how many entities to skip, defaults to 0'),
                limit: limitArg,
            },
            outputSchema: {
                collection: z.string(),
                total: z.number(),
                offset: z.number(),
                limit: z.number(),
                items: z.array(
                    z.object({
                        id: z.string(),
                        title: z.string(),
                        fields: z.number(),
                        bytes: z.number(),
                    }),
                ),
            },
        },
        async ({ collection, offset, limit }) => {
            const result = store.listEntities(collection, { offset, limit });
            return { content: [{ type: 'text', text: text(result) }], structuredContent: result };
        },
    );
}
