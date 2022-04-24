<template>
  <div>
    <div
      class="button"
      @click="open"
    >
      <div class="icon" />
      <span>Settings</span>
    </div>

    <Modal
      :is-open="isOpenModal"
      :on-close="close"
    >
      <template #head> {{ $t('TID_SETTINGS_DLG_TITLE') }} </template>

      <template #body>

        <div class="select">
          <p> {{ $t('TID_SETTINGS_DLG_LANGUAGE') }} </p>
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
    },
};
</script>

<style scoped lang="scss">
@use "sass:map";
@import "../css/vars";

$mv: 1000px;

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
     span {
         display: none;
         font-size: 140%;

         @media screen and (max-width: $mv) {
             display: block;
         }
     }

}

.select {
    p {
        font-size: 120%;
        padding-bottom: 2%;
    }
    select {
        width: 100%;
        background: $background-elements;
        border: $border-color solid 2px;
        padding: 2%;

        //option:hover {
        //    background-color: map.get($table, hover) !important;
        //}
    }
}
</style>
