<template>
  <ModulePage
    type="Support"
    portrait="portrait_AlphaDrone"
    :post-filter="postFilter"
  />
</template>

<script>
import ModulePage from '@/components/ModulePage.vue';
import modules from '@Data/modules.js';

export default {
    components: { ModulePage },
    methods: {
        postFilter(data) {
            const Salvage = { ...data.Salvage };

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

            return data;
        },
    },
};
</script>
