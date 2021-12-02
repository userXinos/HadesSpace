import loadFile from '../modules/loadFile.js';
import saveFile from '../modules/saveFile.js';

export default async function(file, runners) {
    const data = await loadFile(file, runners);
    return saveFile(data);
}
