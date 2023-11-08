import Runner from '../modules/Runner.js';
import { basename } from 'path';

export default class PlanetLevels extends Runner {
    static config = {
        file: 'planet_levels',
        ignoreFiles: [ 'planet_shipments' ],
    };

    run(rawData) {
        const shipments = this.readCsv('planet_shipments');
        const data = Runner.objectArrayify(Runner.compileOne(rawData), {
            map: ([ k, v ]) => [ k.replace(/\s/g, ''), v ],
        });

        data.Name = basename(this.metadata.originalFile, '.csv');
        data.MaxShipments = [ 1, ...shipments ].splice(0, data.Cost.length);
        return data;
    }
}
