<template>
  <ModulePage
    type="Support"
    portrait="portrait_TurretLaser"
    :post-filter="postFilter"
  />
</template>

<script>
import ModulePage from '@/components/ModulePage.vue';
import modules from '@Data/modules.js';
import stars from '@Data/stars.js';

const NEBULA_BUILD = !!process.env.VUE_APP_NEBULA_BUILD;

export default {
    components: { ModulePage },
    methods: {
        postFilter(data) {
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

            if (Repair.RepairHullPointsPerSecond && NEBULA_BUILD) {
                Repair.RepairHullPointsPerSecond = Repair.RepairHullPointsPerSecond
                    .map((e) => e * Repair.EffectDurationx10 / 10);
                Repair.RepairHullPointsPerSecond_BLS = Repair.RepairHullPointsPerSecond_BLS
                    .map((e) => e * Repair.EffectDurationx10BS / 10);
                Repair.RepairHullPointsPerSecond_WS = Repair.RepairHullPointsPerSecond_WS
                    .map((e) => e * Repair.EffectDurationx10WS / 10 / stars.WhiteStar.TimeSlowdownFactor);

                data.Repair = Repair;
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

            return data;
        },
    },
};
</script>
