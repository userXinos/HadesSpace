import { z } from 'zod';

import { SERVER } from '../../config.js';

import { collectionArg, entityArg, READ_ONLY } from './shared.js';

function text(envelope) {
    if (envelope.format === 'markdown') return envelope.markdown;
    if (envelope.format === 'json') return JSON.stringify(envelope.data, null, 2);

    if (envelope.table.rows.length === 0) {
        return `"${envelope.collection}/${envelope.id}" has no level axis. Use format: "markdown" instead.`;
    }
    const header = `| field | ${envelope.table.columns.join(' | ')} |`;
    const rule = `| --- | ${envelope.table.columns.map(() => '---').join(' | ')} |`;
    const body = envelope.table.rows.map(
        (row) => `| ${row.field} | ${row.values.map((value) => (value === null ? '' : String(value))).join(' | ')} |`,
    );
    return [header, rule, ...body].join('\n');
}

export function registerGetEntity(server, store) {
    server.registerTool(
        'get_entity',
        {
            title: 'Read one entity',
            description:
                'A single entity from a collection. Returns markdown with level tables by default, which is the most readable form. ' +
                'Use format "json" for raw values or format "table" to get the level axis as structured data. ' +
                'Pass fields to fetch only what you need, otherwise the answer can get large. ' +
                `The ${SERVER.hiddenFields.join(' and ')} fields are hidden; request them through fields if you need them.`,
            annotations: READ_ONLY,
            inputSchema: {
                collection: collectionArg,
                id: entityArg,
                format: z
                    .enum(['markdown', 'json', 'table'])
                    .optional()
                    .describe('markdown by default, json for raw values, table for the level axis only'),
                fields: z.array(z.string()).optional().describe('only these fields, exact names as reported by describe_entity'),
                includeIcons: z.boolean().optional().describe('also return the image fields along with everything else, defaults to false'),
            },
            outputSchema: {
                collection: z.string(),
                id: z.string(),
                title: z.string(),
                format: z.enum(['markdown', 'json', 'table']),
                fields: z.array(z.string()),
                hiddenFields: z.array(z.string()),
                bytes: z.number(),
                truncated: z.boolean(),
                markdown: z.string().optional().describe('set when format is markdown'),
                data: z.record(z.string(), z.unknown()).optional().describe('set when format is json'),
                table: z
                    .object({
                        columns: z.array(z.union([z.string(), z.number()])),
                        rows: z.array(z.object({ field: z.string(), values: z.array(z.unknown()) })),
                    })
                    .optional()
                    .describe('set when format is table'),
            },
        },
        async ({ collection, id, format, fields, includeIcons }) => {
            const result = store.getEntity(collection, id, { format, fields, includeIcons });
            return { content: [{ type: 'text', text: text(result) }], structuredContent: result };
        },
    );
}
