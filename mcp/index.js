import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { Command } from 'commander';

const ROOT_DIR = dirname(fileURLToPath(import.meta.url));
const OUT_FILE = join(ROOT_DIR, 'dist/dataset.json');
const OUT_MD_FILE = join(ROOT_DIR, 'dist/dataset.md');

const program = new Command();
const dataset = program.command('dataset').description('работа с датасетом');

dataset
    .command('build')
    .description('собрать dist/dataset.json из parser/dist + i18n + regulation')
    .action(async () => {
        const { buildDataset } = await import('./src/dataset.js');
        const { getFailed } = await import('./src/plugins/format.js');

        const started = Date.now();
        const { collections, stats } = await buildDataset();
        const json = `${JSON.stringify(collections, null, 2)}\n`;

        mkdirSync(dirname(OUT_FILE), { recursive: true });
        writeFileSync(OUT_FILE, json, 'utf-8');

        const failed = getFailed();
        console.log(`[✓] ${OUT_FILE}`);
        console.log(`    collections: ${stats.collections}, entities: ${stats.entities}, fields: ${stats.fields}`);
        console.log(`    Size: ${(json.length / 1024 / 1024).toFixed(2)} MB, Time: ${Date.now() - started} ms`);
        console.log(`    Errored format values: ${failed.length}`);
    });

dataset
    .command('md')
    .description('build dist/dataset.md from dist/dataset.json')
    .option('--out <file>', 'save destination', OUT_MD_FILE)
    .action(async ({ out }) => {
        if (!existsSync(OUT_FILE)) {
            console.error(`[✗] no ${OUT_FILE} — dataset build first`);
            process.exitCode = 1;
            return;
        }

        const { toMarkdown, interpolate } = await import('./src/markdown.js');
        const collections = JSON.parse(readFileSync(OUT_FILE, 'utf-8'));

        const baseFile = join(ROOT_DIR, '../community/dataset-base.md');
        let baseText = '';
        if (existsSync(baseFile)) {
            baseText = interpolate(readFileSync(baseFile, 'utf-8')).trim();
        } else {
            console.error(`[!] No ${baseFile} — skipped`);
        }

        const body = toMarkdown(collections);
        const md = baseText ? `${baseText}\n\n${body}` : body;

        mkdirSync(dirname(out), { recursive: true });
        writeFileSync(out, md, 'utf-8');

        console.log(`[✓] ${out}`);
        console.log(`    Size: ${(md.length / 1024 / 1024).toFixed(2)} MB, Lines: ${md.split('\n').length}`);
    });

program
    .command('serve')
    .description('Start mcp server')
    .option('--dataset <file>', 'dataset.json')
    .option('--interface <host>', 'interface http-mode; with с --port enabled Streamable HTTP')
    .option('--port <port>', 'port http-mode; with --interface enabled Streamable HTTP')
    .action(async ({ dataset, interface: host, port }) => {
        const file = dataset ?? OUT_FILE;
        if (!existsSync(file)) {
            console.error(
                dataset ?
                    `[✗] нет ${file}` :
                    `[✗] нет ${file} — сначала node index.js dataset build`,
            );
            process.exitCode = 1;
            return;
        }

        if (Boolean(host) !== Boolean(port)) {
            console.error('[✗] Both flags are required for HTTP mode: --interface и --port');
            process.exitCode = 1;
            return;
        }

        try {
            const { startServer, startHttpServer } = await import('./src/server.js');
            const start = host && port ? startHttpServer : startServer;
            await start({ dataset: file, interface: host, port: port ? Number(port) : undefined });
        } catch (error) {
            console.error(`[✗] ${error.message}`);
            process.exitCode = 1;
        }
    });

program.parse();
