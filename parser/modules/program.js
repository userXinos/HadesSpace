import { Command } from 'commander';
import { readFile } from 'fs/promises';
const program = new Command();

const { version } = JSON.parse(await readFile(new URL('../package.json', import.meta.url), 'utf-8'));

program
    .version(version)
    .option('-t, --type <type>', 'Type files', 'js')
    .option('--no-wipe', 'Disable wipe dir before starting')
    .parse();


export default program;
export const options = program.opts();
