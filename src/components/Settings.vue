<template>
  <div>
    <div
      class="button"
      @click="open"
    >
      <div class="icon" />
      <span class="name">Settings</span>
    </div>

    <Modal
      :is-open="isOpenModal"
      :on-close="close"
    >
      <template #head> {{ $t('TID_SETTINGS_DLG_TITLE') }} </template>

      <template #body>

        <div class="select">
          <p class="name"> {{ $t('TID_SETTINGS_DLG_LANGUAGE') }} </p>
          <select
            v-model="languageCode"
            class="select"
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

      </template>

    </Modal>
  </div>

</template>

<script>
import Modal from '@/components/Modal.vue';
import types from '@/store/modules/userSettings/types.js';

import languages from '@Data/languages.js';

export default {
    name: 'Settings',
    components: { Modal },
    data() {
        return {
            isOpenModal: false,

            languages,
            languageCode: this.$store.state.userSettings.language,
        };
    },
    created() {
        this.$router.afterEach((to, form) => {
            if (form.hash === '#modal') {
                this.isOpenModal = false;
            }
        });
    },
    methods: {
        close() {
            this.isOpenModal = false;
            this.$router.back();
        },
        open() {
            this.isOpenModal = true;
            this.$route.hash !== '#modal' ? this.$router.push('#modal') : (this.isOpenModal = true);
        },

        changeLanguage() {
            this.$store.commit(types.setLanguage, this.languageCode);
        },
        switchDisableFilters() {
            this.$store.commit(types.switchDisableFilters);
        },
    },
};
</script>

<style scoped lang="scss">
@use "sass:map";
@import "../css/vars";

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
        background: url("../img/icons/settings.svg") no-repeat center;
        padding: 23px 26px;

        @media screen and (max-width: $mv) {
            padding: 10px 20px;
        }
    }
     .name {
         display: none;
         font-size: 140%;

         @media screen and (max-width: $mv) {
             display: block;
         }
     }

}

.select {
    margin-bottom: 7%;

    .select {
        width: 100%;
        background: $background-elements;
        border: $border-color solid 2px;
        padding: 2%;

        //option:hover {
        //    background-color: map.get($table, hover) !important;
        //}
    }
}

.switch { // credits:  https://codepen.io/mburnette/pen/LxNxNg
    $size: 20px;

    display: flex;
    align-items: center;
    justify-content: space-between;

    .label {
        cursor: pointer;
        width: $size * 4;
        height: $size + 10px;
        border: red solid 1px;
        display: block;
        border-radius: 100px;
        position: relative;

        &:after {
            content: '';
            position: absolute;
            top: 5px;
            left: 5px;
            width: $size;
            height: $size;
            background: #fff;
            border-radius: 90px;
            transition: 0.3s;
        }
        &:active:after {
            width: $size * 2;
        }
    }

    .checkbox {
        &[type=checkbox] {
            visibility: hidden;
        }
        &:checked + .label {
            background: #9fe5ff;
            border-color: #9fe5ff;
        }
        &:checked + .label:after {
            left: calc(100% - 5px);
            transform: translateX(-100%);
        }
    }
}
</style>
