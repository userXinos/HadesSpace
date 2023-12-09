<template>
  <VData
    v-if="table"
    :data="table"
  >
    <div class="info-banner">
      <div>
        <img
          src="@Img/icons/info.png"
          alt="info icon"
        >
      </div>
      <i18n-t
        keypath="COMMUNITY_CONTENT"
        tag="p"
        for="here"
      >
        <a
          :href="`${homepage}/tree/master/community/tables/${props.fileName}.md`"
          target="_blank"
        >{{ $t('here') }}</a>
      </i18n-t>
    </div>
  </VData>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { createMarkdownArrayTable } from 'parse-markdown-table';
import VData from '@/components/Data.vue';
import { homepage } from '../../package.json';

const table = ref();
export interface Props {
    fileName: string
}

const props = defineProps<Props>();

onMounted(async () => {
    const md = await import((`../../community/tables/${props.fileName}.md`)).then((resp) => fetch(resp.default)).then((resp) => resp.text());

    const arrayTable = await createMarkdownArrayTable(md);
    const json: Record<string, unknown[]> = {};

    for (const header of arrayTable.headers) {
        json[header] = [];
    }

    for await (const row of arrayTable.rows) {
        arrayTable.headers.forEach((header, index) => {
            if (index == 0) {
                return;
            }
            const val = row[index];
            const num = parseInt(val);

            json[header].push(isNaN(num) ? val : num);
        });
    }
    table.value = {
        Name: props.fileName,
        ...json,
    };
});


</script>

<style scoped lang="scss">
.info-banner {
    display: flex;
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
</style>
