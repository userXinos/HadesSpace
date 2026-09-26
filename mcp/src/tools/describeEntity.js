import { z } from 'zod';

import { collectionArg, entityArg, kb, plural, READ_ONLY } from './shared.js';

function text(described) {
    const lines = described.fields.map(
        (field) => `- ${field.name}: ${field.type} - ${kb(field.bytes)}${field.hidden ? ' - hidden by default' : ''}`,
    );
    return [
        `**${described.collection}/${described.id}** - ${described.title}`,
        `${described.totalFields} ${plural(described.totalFields, 'field', 'fields')}, ${kb(described.bytes)}`,
        '',
        ...lines,
    ].join('\n');
}

export function registerDescribeEntity(server, store) {
    server.registerTool(
        'describe_entity',
        {
            title: 'Describe an entity',
            description:
                'Field names of an entity with their types and sizes, but no values. Call this before get_entity when you need a few specific fields out of an entity that has hundreds of them.',
            annotations: READ_ONLY,
            inputSchema: { collection: collectionArg, id: entityArg },
            outputSchema: {
                collection: z.string(),
                id: z.string(),
                title: z.string(),
                totalFields: z.number(),
                bytes: z.number(),
                hiddenFields: z.array(z.string()),
                fields: z.array(
                    z.object({
                        name: z.string(),
                        type: z.enum(['string', 'number', 'boolean', 'null', 'array<object>', 'array<scalar>', 'object']),
                        bytes: z.number(),
                        hidden: z.boolean(),
                    }),
                ),
            },
        },
        async ({ collection, id }) => {
            const result = store.describeEntity(collection, id);
            return { content: [{ type: 'text', text: text(result) }], structuredContent: result };
        },
    );
}
