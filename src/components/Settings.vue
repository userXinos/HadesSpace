<template>
  <div>
    <div
      class="button"
      @click="isOpenModal = true"
    >
      <div class="icon" />
      <span class="name">Settings</span>
    </div>

    <Modal
      v-model:open="isOpenModal"
      :title="$te('TID_SETTINGS_DLG_LANGUAGE') ? $t('TID_SETTINGS_DLG_TITLE') : ''"
    >
      <template #body>

        <div class="select">
          <p class="name"> {{ $t('TID_SETTINGS_DLG_LANGUAGE') }} </p>
          <select
            v-model="languageCode"
            @change="changeLanguage"
          >
            <option
              v-for="language in languages"
              :key="language.Code"
              :value="language.Code"
            >
              {{ language.Name }}
            </option>
          </select>
        </div>

        <div class="switch">
          <div>
            <p class="name"> Disable filters </p>
            <p class="description">Disable all characteristic filters used to hide unimportant information</p>
          </div>
          <input
            id="disable-filters"
            class="checkbox"
            type="checkbox"
            :checked="$store.state.userSettings.disableFilters"
            @change="switchDisableFilters"
          >
          <label
            for="disable-filters"
            class="label"
          />
        </div>

        <template v-if="isDebug">

          <div class="switch">
            <div>
              <p class="name"> [Debug] Show keys </p>
              <p class="description" />
            </div>
            <input
              id="show-keys"
              class="checkbox"
              type="checkbox"
              :checked="$store.state.userSettings.showKeys"
              @change="switchShowKeys"
            >
            <label
              for="show-keys"
              class="label"
            />
          </div>

        </template>

        <div
          class="button"
          @click="showChangelog = true"
        >{{ $t('OPEN_CHANGELOG') }}</div>

      </template>

    </Modal>

    <changelog
      :is-open="showChangelog"
      :title="''"
      @close="showChangelog = false"
    />

  </div>

</template>

<script>
import Modal from '@/components/Modal.vue';
import Changelog from '@/components/Changelog';
import types from '@Store/modules/userSettings/types';

import languages from '@Data/languages.js';

export default {
    name: 'Settings',
    components: { Changelog, Modal },
    data() {
        return {
            isOpenModal: false,
            showChangelog: false,

            languages,
            languageCode: this.$store.state.userSettings.language,
            isDebug: process.env.NODE_ENV === 'development',
        };
    },
    methods: {
        changeLanguage() {
            this.$store.commit(types.SET_LANGUAGE, this.languageCode);
        },
        switchDisableFilters() {
            this.$store.commit(types.SWITCH_DISABLE_FILTERS);
        },
        switchShowKeys() {
            this.$store.commit(types.DEBUG_SWITCH_SHOW_KEYS);
        },
    },
};
</script>

<style scoped lang="scss">
@use "sass:map";
@import "../style/vars";
@import "../style/userInput";

$mv: 1000px;

.name {
    font-size: 120%;
    padding-bottom: 2%;
}

.button {
    cursor: pointer;
    display: flex;
    justify-content: left;
    align-items: center;

    .icon {
        background: url("../img/icons/settings.svg") no-repeat;
        width: 40px;
        height: 40px;

        @media screen and (max-width: $mv) {
            width: 28px;
            height: 28px;
            padding-bottom: 2%;
            margin-left: 3%;
        }
    }
     .name {
         display: none;
         font-size: 140%;
         padding-left: 15px;

         @media screen and (max-width: $mv) {
             display: block;
         }
     }

}
</style>
