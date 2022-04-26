<template>
  <ModulePage
    type="Trade"
    portrait="portrait_ShipmentDrone"
    :post-filter="postFilter"
  />
</template>

<script>
import ModulePage from '@/components/ModulePage.vue';

export default {
    components: { ModulePage },
    methods: {
        postFilter(data) {
            // добавить макс бонус DroneShipment
            const ShipmentDrone = { ...data.ShipmentDrone };

            ShipmentDrone.DroneShipmentBonusMax = ShipmentDrone.DroneShipmentBonus
                .map((e, i) => (ShipmentDrone.SpawnCapacity[i] - 1) * e);
            data.ShipmentDrone = ShipmentDrone;

            return data;
        },
    },
};
</script>
