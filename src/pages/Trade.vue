<template>
  <ModulePage
    type="Trade"
    portrait="portrait_ShipmentDrone"
    :post-filter="postFilter"
  />
</template>

<script setup>
import ModulePage from '@/components/ModulePage.vue';

const NEBULA_BUILD = !!process.env.VUE_APP_NEBULA_BUILD;

function postFilter(data) {
    // добавить макс бонус DroneShipment
    const ShipmentDrone = { ...data.ShipmentDrone };

    if (!NEBULA_BUILD) {
        ShipmentDrone.DroneShipmentBonusMax = ShipmentDrone.DroneShipmentBonus
            .map((e, i) => ((ShipmentDrone?.SpawnCapacity || ShipmentDrone.drone.JobCapacity)[i] - 1) * e);
        delete ShipmentDrone.PreventUseOnWsJumpgate;
        data.ShipmentDrone = ShipmentDrone;
    }

    return data;
}
</script>
