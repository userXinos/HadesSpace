import { readFile } from 'fs/promises';
import { Command } from 'commander';

const program = new Command();
const { version } = JSON.parse(await readFile(new URL('../package.json', import.meta.url), 'utf-8'));

program
    .version(version)
    .option('-t, --type <type>', 'Type files', 'js')
    .option('--no-wipe', 'Disable wipe dir before starting')
    .option('--ts-types', 'Create TypeScript types');


export default program;
export const options = program.opts();
