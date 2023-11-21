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
};
const DISABLE_BG = ['warpLaneHub'];
const PERSONAL_BG = {
    'Fighter_Cerberus3_DrkNeb_lv1': 'interceptor',
    'Fighter_DrkNeb_Cerberus4_lv1': 'phoenix',
    'Cerberus_Destroyer_DrkNeb_lv1': 'destroyer',

    'Transport_DrkNeb_lv1': 'transport',
    'Transport_DrkNeb_lv2': 'transport',
    'Transport_DrkNeb_lv3': 'transport',
    'Transport_DrkNeb_lv4': 'transport',
    'Transport_DrkNeb_lv5': 'transport',
    'Transport_DrkNeb_lv6': 'transport',
    'Transport_DrkNeb_lv7': 'transport',
    'Miner_DrkNeb_lv1': 'miner',
    'Miner_DrkNeb_lv2': 'miner',
    'Miner_DrkNeb_lv3': 'miner',
    'Miner_DrkNeb_lv4': 'miner',
    'Miner_DrkNeb_lv5': 'miner',
    'Miner_DrkNeb_lv6': 'miner',
    'Miner_DrkNeb_lv7': 'miner',

};

const props = defineProps<Props>();
const isCerberus = (props.name.includes('Cerberus'));
const isProjectiles = (props.name.includes('projectiles/'));
const isSpecialIcon = (props.dir.includes('icons'));
const type = TYPES[props.dir] || null;
const url = getUrl();

const bgClasses = DISABLE_BG.includes(props.name) ? {} : {
    'module': type === 'Module' && !isProjectiles,
    'space-building': type === 'SpaceBuilding' && !isCerberus,
    'art': props.name === 'art',
    'before': props.name in PERSONAL_BG,
    [PERSONAL_BG[props.name]]: props.name in PERSONAL_BG,
};
const iconClasses = {
    'ship': type === 'Ship',
    'projectiles': isProjectiles,
    'cerberus': isCerberus,
    'big-size': type == 'Star' || type == 'Distinction' || (isSpecialIcon && props.name !== 'art'),
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
        return new URL(`../img/${dir}/${name}.png`, import.meta.url).href;
    } catch (err) {
        console.error(`[ICON] Not found: ${name}`);
        return new URL(`../img/icons/connection.png`, import.meta.url).href;
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


.icon.ship {
    width: 40px;
    transform: rotate(45deg);
    padding: 10px;
    filter: opacity(0.5) drop-shadow(0.1px 0px 0px $color-player);
}
.icon.cerberus {
    filter: opacity(0.5) drop-shadow(0.1px 0px 0px $color-cerberus);
}
.icon.projectiles {
    transform: rotate(45deg);
    filter: opacity(0.5) drop-shadow(0.1px 0px 0px $border-color);
}
.icon.big-size {
    height: 100%;
    width: 80%;
}
.icon.medium-size {
    width: 70%
}

.icon-background.module {
    background-image: url(../img/game/background/Module.png);
}
.icon-background.space-building {
    background-image: url(@Img/game/background/SpaceBuilding.png);
}
.icon-background.art {
    background-image: url(../img/game/background/Artifact.png);
    opacity: 0.9;
    background-size: auto 100%;
}
.icon-background.before:before {
    content: "";
    position: absolute;
    width: 110%;
    height: 127.65%;
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
.before.transport:before, .before.miner:before {
  filter: opacity(0.6);
  transform: rotate(45deg);
}
.before.transport:before {
  background: #f5dc3e;
  width: 24%;
  height: 47%;
  top: 21%;
  right: 35%;
}
.before.miner:before {
  background: #8c65fc;
  width: 34%;
  height: 40%;
  bottom: 15%;
  right: 45%;
  border-radius: 30px;
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
