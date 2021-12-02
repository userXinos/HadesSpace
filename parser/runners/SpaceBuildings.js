import Runner from '../modules/Runner.js';

const CONFIG = Object.freeze({
    timeModifiers: {
        ConstructionTimeSeconds: 1,
        ConstructionTimeMinutes: 60,
        ConstructionTimeHours: 3600,
    },
});

export default class SpaceBuildings extends Runner {
    static config = {
        file: 'spacebuildings',
    }

    run(rawData) {
        const data = Object.fromEntries(
            Object.entries(rawData).map(([ key, value ]) => {
                fixConstructionTime(value);
                return [ key, value ];
            }),
        );

        data.TimeModulator.Model = 'TimeModulator'; // нету
        return data;
    }
}

function fixConstructionTime(obj) {
    Object.entries(CONFIG.timeModifiers).forEach(([ key, mod ]) => {
        if (key in obj) {
            if (Array.isArray(obj[key])) {
                obj.ConstructionTime = obj[key].map((t) => t * mod);
            } else {
                obj.ConstructionTime = obj[key] * mod;
            }
            delete obj[key];
        }
    });
}
