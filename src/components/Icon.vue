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

<script>
import CustomIcon from '@/js/CustomIcon';

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

export default {
    name: 'Icon',
    props: {
        name: {
            type: [String, CustomIcon],
            default: '',
            requested: true,
        },
        dir: {
            type: String,
            default: null,
            requested: true,
        },
    },
    data() {
        return {
            isCustom: this.name.constructor === CustomIcon,
            isCerberus: this.name.includes('Cerberus'),
            isProjectiles: this.name.includes('projectiles/'),
            type: TYPES[this.dir] || null,

            bgClasses: {},
            iconStyle: {},
            iconClasses: {},
        };
    },
    computed: {
        url() {
            if (!this.name) {
                return '';
            }
            const { dir } = this;
            let { name } = this;

            if (this.isCustom) {
                if (!this.customType) {
                    return '';
                }
                name = this.customType;
            }

            if (isNebulaBuild) {
                if (this.isProjectiles && !name.includes('_DrkNeb')) {
                    name += '_DrkNeb';
                }
                if (this.isCerberus) {
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
                console.error(`Not found icon: ${name}`);
                return require(`../img/icons/connection.png`);
            }
        },
        customType() {
            if (!this.isCustom) {
                return null;
            }
            const n = this.name.name;
            return (n in CUSTOM_TYPES) ? n : null;
        },
    },
    created() {
        const nebulaSpaceBuildsNoBG = ['warpLaneHub', 'timeModulator'];

        this.bgClasses = {
            'module-bg': this.type === 'Module' && !this.isProjectiles,
            'space-building-bg': this.type === 'SpaceBuilding' && !this.isCerberus && (isNebulaBuild ? !nebulaSpaceBuildsNoBG.includes(this.name) : true),
            'round-bg': this.type === 'Star' || 'TimeModulator' === this.customType,
            'art-bg': this.name === 'art',
            'warp-line-bg': this.customType == 'WarpLane',
        };
        this.iconStyle = {
            backgroundImage: `url('${this.url}')`,
            width: (this.type === 'SpaceBuilding' && isNebulaBuild) ? '70%' : null,
        };
        this.iconClasses = {
            'ship': this.type === 'Ship',
            'cerberus': this.isCerberus,
            'warp-line-body': this.customType == 'WarpLane',
            'big-size': this.type == 'Distinction' || (this.type === 'specialIcon' && this.name !== 'art'),
        };
    },
};
</script>

<style scoped lang="scss">
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
