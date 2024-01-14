<!--eslint-disable vue/no-mutating-props-->

<template>
  <div class="container">
    <div class="config-category">
      <p v-t="'CONFIG'" />

      <div class="flex-end">
        <button
          :class="`button ${buttonCopy.color}`"
          @click="copyConfig"
        > {{ buttonCopy.text }} </button>
        <button
          v-t="'CREATE'"
          class="button green"
          @click="onCreateNew"
        />
      </div>
    </div>

    <div class="select">
      <p
        v-t="'LIST'"
        class="name"
      />
      <select v-model="instance.store.selected">
        <option
          v-for="(v, index) in instance.store.configs"
          :key="index"
          :value="index"
        >
          {{ v.name }}
        </option>
      </select>
    </div>

    <div class="input">
      <p
        v-t="'TID_CHANGE_NAME_TITLE'"
        class="name"
      />
      <input
        v-model="instance.store.configs[instance.store.selected].name"
        :placeholder="$t('TID_CORP_NAME_LABEL')"
      >
    </div>

    <div class="flex-end margin-bottom">
      <button
        v-t="'TID_SOCIAL_DELETE_MESSAGE'"
        class="button red"
        @click="removeConfig"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useStore } from 'vuex';

import MultiConfig from '@Utils/MultiConfig';
import types from '@/store/types';
export interface Props {
    instance: MultiConfig<object>
    onCreateNew: () => void
    dataToString?: object
}

const store = useStore();
const { t } = useI18n();
const props = defineProps<Props>();
const buttonCopy = ref({ text: t('COPY'), color: 'yellow' });
const currentUrl = computed(() => `${location.origin}${location.pathname}`);

function copyConfig(): void {
    const d = MultiConfig.stringifyUrl(props.dataToString ?? props.instance.selectedConfig);

    navigator.clipboard.writeText(`${currentUrl.value}?d=${d}`)
        .then(() => {
            buttonCopy.value = { text: t('COPIED'), color: 'green' };
            setTimeout(() => buttonCopy.value = { text: t('COPY'), color: 'yellow' }, 2000);
        })
        .catch((err) => {
            buttonCopy.value = { text: t('TID_DLG_TITLE_ERROR'), color: 'red' };
            alert(err.message);
            console.error(err);
        });
}
async function removeConfig(): Promise<void> {
    const { name } = props.instance.store.configs[props.instance.store.selected];
    await store.dispatch(types.OPEN_CONFIRM, t('REMOVE_CONFIG', [name]))
        .then(() => {
            props.instance.removeSelected();
        })
        .catch(() => {}); // eslint-disable-line @typescript-eslint/no-empty-function
}
</script>

<style scoped lang="scss">
@use "../style/vars";
@import "../style/userInput";

.container {
    border-radius: 5px;
    padding: 1%;
}
.config-category {
    display: flex;
    justify-content: space-between;
    padding-bottom: 5%;

    @media screen and (max-width: 500px){
        flex-direction: column;
    }

    p {
        font-size: 140%;

        @media screen and (max-width: 500px){
            padding-bottom: 20px;
        }

    }
}
.flex-end {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
}
</style>
