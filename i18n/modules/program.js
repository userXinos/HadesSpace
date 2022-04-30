import { readFile } from 'fs/promises';
import { Command } from 'commander';

const program = new Command();
const { version } = JSON.parse(await readFile(new URL('../package.json', import.meta.url), 'utf-8'));

// noinspection RequiredAttributes
program
    .version(version)
    .option('-f, --full', 'all locale files')
    .option('-r, --raw-content <path>', 'custom path to raw content');


export default program;
export const options = program.opts();
