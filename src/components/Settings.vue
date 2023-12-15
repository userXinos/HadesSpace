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

          <div
            v-if="contact"
            class="info-banner"
          >
            <div>
              <img
                src="@Img/icons/info.png"
                alt="info icon"
              >
            </div>
            <i18n-t
              keypath="EXTERNAL_LOCALE_NOTE"
              tag="p"
            >
              <template #github>
                <a :href="`${homepage}/issues/new?template=bug_report_lang_${languageCode}.yml`">
                  GitHub issue
                </a>
              </template>
              <template #contact>
                <a :href="contact.link">
                  {{ contact.name }}
                </a>
              </template>
            </i18n-t>
          </div>
          <select
            v-model="languageCode"
            @change="changeLanguage"
          >
            <option
              v-for="language in (languages as {Code: string, Name: string}[])"
              :key="language.Code"
              :value="language.Code"
            >
              {{ language.Name }}
            </option>
          </select>
        </div>

        <div class="switch">
          <div>
            <p
              v-t="'DISABLE_FILTERS'"
              class="name"
            />
            <p
              v-t="'DISABLE_FILTERS_NOTE'"
              class="description"
            />
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

<script setup lang="ts">
import { computed, Ref, ref } from 'vue';
import { useStore } from 'vuex';

import Modal from '@/components/Modal.vue';
import Changelog from '@/components/Changelog.vue';
import types from '@/store/modules/userSettings/types';

import languages from '@/../i18n/dist/index.json';
import { homepage } from '../../package.json';

const store = useStore();
const isOpenModal = ref(false);
const showChangelog = ref(false);
const languageCode: Ref<string> = ref(store.state.userSettings.language);
const isDebug = process.env.NODE_ENV === 'development';

const contact = computed(() => (
    Object.values(languages).find((v) => v.Code == languageCode.value && 'contact' in v)?.contact
));

function changeLanguage() {
    store.commit(types.SET_LANGUAGE, languageCode.value);
}
function switchDisableFilters() {
    store.commit(types.SWITCH_DISABLE_FILTERS);
}
function switchShowKeys() {
    store.commit(types.DEBUG_SWITCH_SHOW_KEYS);
}
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

.select {
  margin-bottom: 4%;
}

.info-banner {
  display: flex;
  justify-content: center;
  align-items: stretch;
  background-color: #163c4f;
  margin-bottom: 2%;
  border-radius: 5px;

  div:first-child {
    background-color: #102f3f;
    display: flex;
    align-items: center;
    padding: 10px;
    border-bottom-left-radius: 5px;
    border-top-left-radius: 5px;

    img {
      width: 20px;
      height: 20px;
    }
  }
  p {
    padding: 10px;
    font-size: 90%;
  }
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
