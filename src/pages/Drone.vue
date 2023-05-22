<template>
  <ModulePage
    type="Drone"
    portrait="portrait_AlphaDrone"
    :post-filter="postFilter"
  />
</template>

<script setup>
import ModulePage from '@/components/ModulePage.vue';
import modules from '@Data/modules.js';
import stars from '@Data/stars.js';

function postFilter(data) {
    const Salvage = { ...data.Salvage };
    const Repair = { ...data.Repair };

    if (Salvage.SalvageHullPercent) {
        Salvage.SalvageHullPercent = {
            RS: Salvage.SalvageHullPercent[0],
            WS: Salvage.SalvageHullPercent[1],
            // BS: Salvage.SalvageHullPercent[2], // тоже самое, что и в КЗ
        };
        data.Salvage = Salvage;
    }

    for (const [k, module] of Object.entries(data)) {
        if (module.Name.includes('Drone')) {
            const DroneModule = { ...module };

            if (DroneModule?.drone?.modules) {
                for (const droneModName in DroneModule.drone.modules) {
                    if ((droneModName in DroneModule.drone.modules) && (droneModName in modules)) {
                        DroneModule[droneModName] = { ...modules[droneModName] };
                        delete DroneModule.drone.modules[droneModName];

                        delete DroneModule[droneModName].FuelUseIncrease;
                        delete DroneModule[droneModName].BCCost;
                    }
                }
                data[k] = DroneModule;
            }
        }
    }

    if (Repair.RepairHullPointsPerSecond) {
        Repair.RepairHullPointsPerSecond = Repair.RepairHullPointsPerSecond
            .map((e) => e * Repair.EffectDurationx10 / 10);
        Repair.RepairHullPointsPerSecond_BLS = Repair.RepairHullPointsPerSecond_BLS
            .map((e) => e * Repair.EffectDurationx10BS / 10);
        Repair.RepairHullPointsPerSecond_WS = Repair.RepairHullPointsPerSecond_WS
            .map((e) => e * Repair.EffectDurationx10WS / 10 / stars.WhiteStar.TimeSlowdownFactor);

        data.Repair = Repair;
    }

    if (data.LaserTurret) {
        const modKey = 'LaserTurret';
        const mod = { ...data[modKey] };
        const drone = mod.LaserTurret_Laser;

        ['RampDPS', 'RampDPS_BLS', 'RampDPS_WS']
            .forEach((key) => {
                if (`${key}0` in drone) {
                    if (Array.isArray(drone[`${key}2`])) {
                        const arr = Array(drone[`${key}2`].length);

                        if (!Array.isArray(drone[`${key}0`])) {
                            drone[`${key}0`] = [...arr].fill(drone[`${key}0`]);
                        }
                        if (!Array.isArray(drone[`${key}1`])) {
                            drone[`${key}1`] = [...arr].fill(drone[`${key}1`]);
                        }
                    }

                    drone[key] = {
                        '■': [...drone[`${key}0`]],
                        '■■': [...drone[`${key}1`]],
                        '■■■': [...drone[`${key}2`]],
                    };
                    delete drone[`${key}0`];
                    delete drone[`${key}1`];
                    delete drone[`${key}2`];

                    data[modKey].drone = mod.drone;
                }
            });
    }

    return data;
}
</script>
