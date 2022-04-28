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
        runner: CONFIG,
    }

    run(rawData) {
        const data = Runner.objectArrayify(rawData, {
            map: ([ key, value ]) => {
                fixConstructionTime(value);
                return [ key, value ];
            },
        });

        data.TimeModulator.Model = 'TimeModulator'; // нету
        return data;
    }
}

function fixConstructionTime(obj) {
    const tm = CONFIG.timeModifiers;

    if (Object.keys(obj).some((k) => k in tm)) {
        obj.ConstructionTime = [];
    } else {
        return;
    }

    Object.keys(CONFIG.timeModifiers).forEach(( key ) => {
        if (key in obj) {
            if (Array.isArray(obj[key])) {
                obj.ConstructionTime.push(...obj[key].map((t) => t * tm[key]));
            } else {
                obj.ConstructionTime.push(obj[key] * tm[key]);
            }
            delete obj[key];
        }
    });

    if (obj.ConstructionTime.length === 1) {
        obj.ConstructionTime = obj.ConstructionTime[0];
    }
}
