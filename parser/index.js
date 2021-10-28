'use strict';

import {join} from 'path';
import {readFile} from 'fs/promises';
import {wipeDir, walkDir} from './modules/dirUtils.js';
import loadFile from './modules/loadFile.js';
import saveFile from './modules/saveFile.js';
import fixOrder from './modules/fixOrder.js';
import {Command} from 'commander';

const program = new Command();
const startTime = new Date().getTime();
const pathCSVs = join('./rawData/');
const pathSave = join('./data/');
const optionalFiles = ['projectiles.csv', 'ship_spawners.csv', 'solar_system_gen_data.csv'].map((e) => join(pathCSVs, e));
global.ignoringHeaders = ['maxLevel', 'Name', 'TID', 'TID_Description', 'Icon', 'SlotType', 'Model'];
let files;

program
    .version('0.0.1')
    .option('-t, --type <type>', 'Type files')
    .option('--no-wipe', 'Disable wipe dir before starting', false)
    .parse(process.argv);

if (!program.args.length) {
  if (!program.noWipe) wipeDir(pathSave);
  files = walkDir(pathCSVs)
      .filter((e) => (e !== undefined && !optionalFiles.includes(e) && e.endsWith('.csv')));
} else {
  files = program.args;
}

const promises = files.map(loadSaveFile);
Promise.all(promises)
    .then(() => {
      const time = (new Date().getTime() - startTime) / 1000;
      console.log('\x1b[32m[✓]\x1b[0m', `Готово! (${time} сек.)`);
    })
    .catch((error) => {
      console.log('\x1b[31m[х]\x1b[0m', `Ошибки в выполнении.`, error, error.stack);
      process.exit(-1);
    });

function loadSaveFile(file) {
  return readFile(file, 'utf8')
      .then((data) => {
        return loadFile(file, data)
            .then((data) => fixOrder(data))
            .then((data) => saveFile(data, program.type))
            .catch((err) => {
              throw err;
            });
      })
      .catch((err) => {
        throw err;
      });
}
