<template>
  <div class="main">
    <div class="container">
      <div
        class="icon-background"
        :class="bgClasses"
      >
        <span
          class="icon"
          :style="iconStyle"
          :class="iconClasses"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

export interface Props {
    name: string
    dir: string
}

const TYPES = {
    'game/Modules': 'Module',
    'game/Ships': 'Ship',
    'game/SpaceBuildings': 'SpaceBuilding',
    'game/Stars': 'Star',
    'game/Distinctions': 'Distinction',
    'icons': 'specialIcon',
};
const DISABLE_BG = ['warpLaneHub'];
const PERSONAL_BG = {
    'Fighter_Cerberus3_DrkNeb_lv1': 'interceptor',
    'Fighter_DrkNeb_Cerberus4_lv1': 'phoenix',
    'Cerberus_Destroyer_DrkNeb_lv1': 'destroyer',
};

const props = defineProps<Props>();
const isCerberus = (props.name.includes('Cerberus'));
const isProjectiles = (props.name.includes('projectiles/'));
const type = TYPES[props.dir] || null;
const url = getUrl();

const bgClasses = DISABLE_BG.includes(props.name) ? {} : {
    'module-bg': type === 'Module' && !isProjectiles,
    'space-building-bg': type === 'SpaceBuilding' && !isCerberus,
    'art-bg': props.name === 'art',
    'before-bg': props.name in PERSONAL_BG,
    [PERSONAL_BG[props.name]]: props.name in PERSONAL_BG,
};
const iconClasses = {
    'ship': type === 'Ship',
    'projectiles': isProjectiles,
    'cerberus': isCerberus,
    'big-size': type == 'Star' || type == 'Distinction' || (type === 'specialIcon' && props.name !== 'art'),
    'medium-size': type === 'SpaceBuilding',
};
const iconStyle = {
    backgroundImage: `url('${url}')`,
};

function getUrl() {
    if (!props.name) {
        return '';
    }
    const { dir } = props;
    let { name } = props;

    if (isCerberus && name.includes('_lv1')) {
        name = name.replace('_lv1', '');

        // random names in game
        switch (name) {
        case 'Fighter_Cerberus3_DrkNeb':
            name = 'Fighter_Cerberus_DrkNeb';
            break;
        case 'Cerberus_Destroyer_DrkNeb':
            name = 'Fighter_DrkNeb_Cerberus3';
            break;
        case 'Cerberus_DrkNeb_Swarm':
            name = 'Cerberus_DrkNeb_swarm1';
            break;
        }
    }

    try {
        return require(`@Img/${dir}/${name}.png`);
    } catch (err) {
        console.error(`[ICON] Not found: ${name}`);
        return require(`../img/icons/connection.png`);
    }
}
</script>

<style scoped lang="scss">
@import "../style/vars";

$color-player: #6bd7ff;
$color-cerberus: #f66d8f;

.main {
    display: inline-block;
    position: relative;
    width: 100%;

    .container {
        padding-top: 85%;
    }
}

.icon-background {
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0.8;
    background-size: 100%;
    background-repeat: no-repeat;
    background-position: center;

    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;

    .icon {
        background-position: center;
        background-size: contain;
        background-repeat: no-repeat;
        width: 50%;
        height: 60%;
    }
}

// icons
.ship {
    width: 40px;
    transform: rotate(45deg);
    padding: 10px;
    filter: opacity(0.5) drop-shadow(0.1px 0px 0px $color-player);
}
.cerberus {
    filter: opacity(0.5) drop-shadow(0.1px 0px 0px $color-cerberus);
}
.projectiles {
    transform: rotate(45deg);
    filter: opacity(0.5) drop-shadow(0.1px 0px 0px $border-color);
}
.big-size {
    height: 100%;
    width: 80%;
}
.medium-size {
    width: 70%
}

// backgrounds
.module-bg {
    background-image: url(../img/game/background/Module.png);
}
.space-building-bg {
    background-image: url(@Img/game/background/SpaceBuilding.png);
}
.art-bg {
    background-image: url(../img/game/background/Artifact.png);
    opacity: 0.9;
    background-size: auto 100%;
}
.before-bg:before {
    content: "";
    position: absolute;
    width: 110%;
    height: 125%;
    background-repeat: no-repeat;
    background-size: auto 100%;

    @media screen and (max-width: 1000px) {
        width: 90%;
        height: 105%;
    }
    @media screen and (max-width: 500px) {
        width: 120%;
        height: 135%;
    }
}
.interceptor {
    &:before {
        background-image: url(../img/game/background/InterceptorRings.png);
        filter: opacity(0.5) drop-shadow(0.1px 0px 0px $color-cerberus);
        animation: rotate 20s linear infinite;
    }
    &:hover:before {
        filter: opacity(0.5) drop-shadow(0.1px 0px 0px red);
        animation-duration: 5s;
    }
}
.phoenix:before {
    background-image: url(../img/game/background/AreaShieldRing01.png), url(../img/game/background/ShipShield.png);
    filter: opacity(0.5) drop-shadow(0.1px 0px 0px $color-cerberus);
}
.destroyer:before {
    background-image: url(../img/game/background/vengeanceIndicator.png);
    filter: opacity(0.5) drop-shadow(0.1px 0px 0px red);
}


@keyframes rotate {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}
</style>
