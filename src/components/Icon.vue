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

const isNebulaBuild = !!process.env.VUE_APP_NEBULA_BUILD;
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

const nebulaSpaceBuildsNoBG = ['warpLaneHub', 'timeModulator'];
const bgClasses = {
    'module-bg': type === 'Module' && !isProjectiles,
    'space-building-bg': type === 'SpaceBuilding' && !isCerberus && (isNebulaBuild ? !nebulaSpaceBuildsNoBG.includes(props.name) : true),
    'round-bg': 'TimeModulator' === customType,
    'art-bg': props.name === 'art',
    'warp-line-bg': customType == 'WarpLane',
};
const iconStyle = {
    backgroundImage: `url('${url}')`,
    width: (type === 'SpaceBuilding' && isNebulaBuild) ? '70%' : null,
};
const iconClasses = {
    'ship': type === 'Ship',
    'cerberus': isCerberus,
    'warp-line-body': customType == 'WarpLane',
    'big-size': type == 'Distinction' || (type === 'specialIcon' && name !== 'art'),
    'circle': type === 'Star',
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

    if (isNebulaBuild) {
        if (isProjectiles && !name.includes('_DrkNeb')) {
            name += '_DrkNeb';
        }
        if (isCerberus) {
            if (name.includes('_lv1')) {
                name = name.replace('_lv1', '');
            } else if (!name.startsWith('Battleship') && !name.startsWith('CerberusStation') && !name.endsWith('Carrier')) {
                name += '_lv1';
            }
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
    height: 80%;
    width: 80%;
}
.circle {
    background-color: $border-color;
    border-radius: 50%;
    width: 85%;
    height: 100%;
}
.module-bg {
    background-image: url(../img/game/background/Module.png);
}
.space-building-bg {
    background-image: url(@Img/game/background/SpaceBuilding.png);
}
.round-bg {
    background-image: url(../img/game/SpaceBuildings/TimeModulatorBackground.png);
    background-size: auto 100%;
}
.art-bg {
    background-image: url(../img/game/background/Artifact.png);
    opacity: 0.9;
    background-size: auto 100%;
}
.warp-line-bg {
    background-image: url(../img/game/SpaceBuildings/WarpLaneBG.png);
}
.warp-line-body {
    background-size: 210%;
}

</style>
