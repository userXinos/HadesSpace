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
import CustomIcon from '@Utils/CustomIcon';

export interface Props {
    name: string|CustomIcon
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
const CUSTOM_TYPES = {
    WarpLane: [],
    TimeModulator: [],
};

const props = defineProps<Props>();
const isCustom = (props.name.constructor === CustomIcon);
const isCerberus = (props.name.includes('Cerberus'));
const isProjectiles = (props.name.includes('projectiles/'));
const type = TYPES[props.dir] || null;
const customType = getCustomType();
const url = getUrl();

const spaceBuildsNoBG = ['warpLaneHub', 'timeModulator'];
const bgClasses = {
    'module-bg': type === 'Module' && !isProjectiles,
    'space-building-bg': type === 'SpaceBuilding' && !isCerberus && (!spaceBuildsNoBG.includes(props.name as string)),
    'art-bg': props.name === 'art',
    'interceptor': props.name === 'Fighter_Cerberus3_DrkNeb_lv1',
};
const iconStyle = {
    backgroundImage: `url('${url}')`,
};
const iconClasses = {
    'ship': type === 'Ship',
    'cerberus': isCerberus,
    'big-size': type == 'Star' || type == 'Distinction' || (type === 'specialIcon' && props.name !== 'art'),
    'width70': type === 'SpaceBuilding',
};

function getCustomType() {
    if (!isCustom) {
        return null;
    }
    const n = props.name.name;
    return (n in CUSTOM_TYPES) ? n : null;
}
function getUrl() {
    if (!props.name) {
        return '';
    }
    const { dir } = props;
    let { name } = props;

    if (isCustom) {
        if (!customType) {
            return '';
        }
        name = customType;
    }

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
}

.icon {
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
    width: 50%;
    height: 60%;
}

.ship {
    width: 40px;
    transform: rotate(45deg);
    padding: 10px;
    filter: opacity(0.5) drop-shadow(0.1px 0px 0px #6bd7ff);
}
.cerberus {
    filter: opacity(0.5) drop-shadow(0.1px 0px 0px #f66d8f);
}

.big-size {
    height: 100%;
    width: 80%;
}
.width70 {
    width: 70%
}
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
.interceptor::before {
    content: "";
    position: absolute;
    width: 85%;
    height: 100%;
    filter: opacity(0.5) drop-shadow(0.1px 0px 0px #f66d8f);
    background-image: url(../img/game/background/InterceptorRings.png);
    background-repeat: no-repeat;
    background-size: auto 100%;
    animation: rotate 20s linear infinite;
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
