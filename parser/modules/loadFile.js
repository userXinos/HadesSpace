import { basename } from 'path';
import { readFile } from 'fs/promises';
import Runner from './Runner.js';

/**
 * Загрузить файл и обработать ранерами
 * @param {String} path         Путь к файлу
 * @param {Runner[]} runners
 * @return {Function<Runner>}  Заряженный раннер
 * @async
 */
export default async function(path, runners) {
    const metadata = { originalFile: path, runnerName: null };
    const file = await readFile(path, 'utf-8');
    const fileName = basename(path, '.csv');
    const MyRunner = runners.find((e) => filter(e, fileName)) || Runner;

    return new MyRunner({ raw: file, metadata });
}

function filter(runner, fileName) {
    const { config: { file } } = runner;

    if (file.constructor === String && file === fileName) {
        return true;
    }
    if (Array.isArray(file)) {
        return file.includes(fileName);
    }
    return (file.constructor === RegExp && file.test(fileName));
}

