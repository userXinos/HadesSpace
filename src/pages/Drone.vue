<template>
  <ModulePage
    type="Drone"
    portrait="portrait_AlphaDrone.jpg"
    :post-filter="postFilter"
  />
</template>

<!--suppress JSUnresolvedReference -->
<script setup>
import ModulePage from '@/components/ModulePage.vue';
import { fixRampLasers } from './Weapon.vue';
import modules from '@Data/modules.js';
import stars from '@Data/stars.js';

function postFilter(data) {
    const Repair = { ...data.Repair };

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
        Repair.RepairHullPointsPerSecond_WS = Repair.RepairHullPointsPerSecond_WS
            .map((e) => e * Repair.EffectDurationx10WS / 10 / stars.WhiteStar.TimeSlowdownFactor);

        data.Repair = Repair;
    }

    return data;
}
</script>
