<template>
  <div class="main">
    <div>
      <div class="container-name">{{ $t('TID_SHIP_UPGRADE_DLG_TITLE') }}</div>
      <div class="container">
        <router-link class="item-link" to="/trade">
          <div class="item">
            <div class="item-icon">
              <div class="icon-background module-bg">
                <span
                    class="icon"
                    :style="{
                    'background-image': `url( ${require('../img/Modules/Mod_TransportAutopilot_Icon.png')} )`
                  }"
                ></span>
              </div>
            </div>
            <div class="item-text">{{ $t('typeModTrade') }}</div>
          </div>
        </router-link>
        <router-link class="item-link" to="/mining">
          <div class="item">
            <div class="item-icon">
              <div class="icon-background module-bg">
                <span
                    class="icon"
                    :style="{
                    'background-image': `url( ${require('../img/Modules/Mod_MiningBoost_Icon.png')} )`
                  }"
                ></span>
              </div>
            </div>
            <div class="item-text">{{ $t('typeModMining') }}</div>
          </div>
        </router-link>
        <router-link class="item-link" to="/weapon">
          <div class="item">
            <div class="item-icon">
              <div class="icon-background module-bg">
                <span
                    class="icon"
                    :style="{
                    'background-image': `url( ${require('../img/Modules/Mod_Barrage_Icon.png')} )`
                  }"
                ></span>
              </div>
            </div>
            <div class="item-text">{{ $t('typeModWeapon') }}</div>
          </div>
        </router-link>
        <router-link class="item-link" to="/shield">
          <div class="item">
            <div class="item-icon">
              <div class="icon-background module-bg">
                <span
                    class="icon"
                    :style="{
                    'background-image': `url( ${require('../img/Modules/Mod_PassiveShield_Icon.png')} )`
                  }"
                ></span>
              </div>
            </div>
            <div class="item-text">{{ $t('typeModShield') }}</div>
          </div>
        </router-link>
        <router-link class="item-link" to="/support">
          <div class="item">
            <div class="item-icon">
              <div class="icon-background module-bg">
                <span
                    class="icon"
                    :style="{
                    'background-image': `url( ${require('../img/Modules/Mod_Destiny_Icon.png')} )`
                  }"
                ></span>
              </div>
            </div>
            <div class="item-text">{{ $t('typeModSupport') }}</div>
          </div>
        </router-link>
      </div>
      <div class="container-name">{{ $t('sections') }}</div>
      <div class="container">
        <router-link class="item-link" to="/yellowstar#sectors">
          <div class="item">
            <div class="item-icon">
              <span
                  :style="{'background-image': `url( ${require('../img/icons/planet.png')})`}"
              ></span>
            </div>
            <div class="item-text">{{ $t('planets') }}</div>
          </div>
        </router-link>
        <router-link class="item-link" to="/ships">
          <div class="item">
            <div class="item-icon">
              <span
                  class="ships"
                  :style="{'background-image': `url( ${require('../img/Ships/Miner_lv6.png')})`}"
              ></span>
            </div>
            <div class="item-text">{{ $t('TID_PRODUCTION_DLG_SHIPS') }}</div>
          </div>
        </router-link>
        <router-link class="item-link" to="/cerberus">
          <div class="item">
            <div class="item-icon">
              <span
                  class="ships cerberus"
                  :style="{
                  'background-image': `url( ${require('../img/Ships/Fighter_Cerberus6_lv1.png')} `
                }"
              ></span>
            </div>
            <div class="item-text">{{ $t('cerberus') }}</div>
          </div>
        </router-link>
        <router-link class="item-link" to="/stars">
          <div class="item">
            <div class="item-icon">
              <span
                  :style="{'background-image': `url( ${require('../img/Stars/star_red.png')})`}"
              ></span>
            </div>
            <div class="item-text">{{ $t('stars') }}</div>
          </div>
        </router-link>
        <router-link class="item-link" to="/spacebuildings">
          <div class="item">
            <div class="item-icon">
              <div class="icon-background spaceBuildings-bg">
                <span
                    class="icon"
                    :style="{
                    'background-image': `url( ${require('../img/SpaceBuildings/shipyard.png')} )`
                  }"
                ></span>
              </div>
            </div>
            <div class="item-text">{{ $t('TID_PRODUCTION_DLG_STATIONS') }}</div>
          </div>
        </router-link>
        <router-link class="item-link" to="/redstar#Artifacts">
          <div class="item">
            <div class="item-icon">
              <div class="icon-background art-bg">
                <span
                    class="icon"
                    :style="{'background-image': `url( ${require('../img/icons/art.png')})`}"
                ></span>
              </div>
            </div>
            <div class="item-text">{{ $t('TID_OBJECT_ACTION_ARTIFACTS') }}</div>
          </div>
        </router-link>
        <router-link class="item-link" to="/alliancelevels">
          <div class="item">
            <div class="item-icon">
              <span
                  :style="{'background-image': `url( ${require('../img/icons/relic_icon.png')})`}"
              ></span>
            </div>
            <div class="item-text">{{ $t('TID_CORP_LEVELS_LABEL') }}</div>
          </div>
        </router-link>
        <router-link class="item-link" to="/playergoals">
          <div class="item">
            <div class="item-icon"></div>
            <div class="item-text">{{ $t('TID_EMPIRE_OBJECTIVES') }}</div>
          </div>
        </router-link>
        <router-link class="item-link" to="/achievements">
          <div class="item">
            <div class="item-text">
              {{ $t('TID_PLAYER_INFO_DLG_TAB_ACHIEVEMENTS') }}
            </div>
          </div>
        </router-link>
      </div>
      <div class="container-name">{{ $t('other') }}</div>
      <div class="container">
        <router-link class="item-link" to="/planetscalc">
          <div class="item">
            <div class="item-icon">
              <span
                  :style="{'background-image': `url( ${require('../img/icons/calc.png')})`}"
              ></span>
            </div>
            <div class="item-text">{{ $t('planetscalc') }}</div>
          </div>
        </router-link>
        <a
            class="item-link"
            href="https://github.com/Raerten/HSAccs"
            target="_blank"
        >
          <div class="item">
            <div class="item-icon">
              <span
                  :style="{'background-image': `url( ${require('../img/icons/github_logo.png')})`}"
              ></span>
            </div>
            <div class="item-text">
              {{ $t('switchAccs') }} <span>(by Raerten)</span>
            </div>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  metaInfo() {
    return {
      title: 'Hades\' Star Data',
    };
  },
};
</script>

<style scoped src="../css/catalog.css"></style>
