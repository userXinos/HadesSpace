import { z } from 'zod';

import { kb, plural, READ_ONLY } from './shared.js';

function text(collections) {
    const lines = [
        '| collection | entities | fields | size |',
        '| --- | --- | --- | --- |',
        ...collections.collections.map((item) => `| ${item.id} | ${item.entities} | ${item.fields} | ${kb(item.bytes)} |`),
    ];
    return [
        `${collections.totalCollections} ${plural(collections.totalCollections, 'collection', 'collections')}, ` +
            `${collections.totalEntities} ${plural(collections.totalEntities, 'entity', 'entities')}, ` +
            `${collections.totalFields} ${plural(collections.totalFields, 'field', 'fields')}, ${kb(collections.totalBytes)}`,
        `Hidden by default: ${collections.hiddenFields.join(', ')}`,
        '',
        ...lines,
    ].join('\n');
}

export function registerListCollections(server, store) {
    server.registerTool(
        'list_collections',
        {
            title: 'List collections',
            description:
                'What the dataset contains: the id of every collection with its entity count, field count and size. Start here.',
            annotations: READ_ONLY,
            inputSchema: {},
            outputSchema: {
                totalCollections: z.number(),
                totalEntities: z.number(),
                totalFields: z.number(),
                totalBytes: z.number(),
                hiddenFields: z.array(z.string()),
                collections: z.array(
                    z.object({
                        id: z.string(),
                        entities: z.number(),
                        fields: z.number(),
                        bytes: z.number(),
                    }),
                ),
            },
        },
        async () => {
            const result = store.listCollections();
            return { content: [{ type: 'text', text: text(result) }], structuredContent: result };
        },
    );
}
