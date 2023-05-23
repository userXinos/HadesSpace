<template>
  <div class="container-wrap">
    <div class="container">

      <v-title
        :data="title"
        :format="format"
        :icon-dir="iconDir"
      />

      <v-table
        v-if="Object.keys(table.head).length > 0"
        v-bind="Object.assign(tableOpts, {data: table, format})"
      >
        <!--         eslint-disable vue/max-attributes-per-line         -->
        <template v-if="$slots['table-head']" #head="p"><slot name="table-head" v-bind="p" /></template>
        <template v-if="$slots['table-body']" #body="p"><slot name="table-body" v-bind="p" /></template>
      </v-table>

    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, Ref, watch } from 'vue';
import router from '@Utils/Vue/router';

import VTable from './DataTable.vue';
import VTitle from './DataHead.vue';

import key from '@Handlers/key';
import value from '@Handlers/value';
import isHide from '@Handlers/isHide';

import headersOrder from '@Regulation/headersOrder.js';

export interface Props {
    data: object
    tableOpts?: object
    sort?: boolean
    iconDir?: string
}
interface DataTable {
    head: Record<string, unknown[]>
    body: Record<string, unknown[]>
}
interface DataTitle {
    [k: string]: {[k: string]: unknown}|unknown[]
}

const props = withDefaults(defineProps<Props>(), {
    tableOpts: () => ({}),
    sort: true,
    iconDir: '',
});
const table: Ref<DataTable> = ref({ head: {}, body: {} });
const title: Ref<DataTitle> = ref({ });

const dataName = computed(() => {
    const { value: t } = title;
    return (t && 'default' in t) ? (t.default as Record<string, string>).Name : undefined;
});
const format = {
    key: (k: string) => key(k, router.currentRoute.name as string),
    value: (k: string, v: unknown) => value(k, v, dataName.value),
};

watch(() => props.data, () => {
    table.value = { head: {}, body: {} };
    title.value = {};

    packagingData(props.data);
});

packagingData(props.data);


function packagingData(obj: Record<string, unknown>, category = 'default') {
    const preTable = [] as [string, unknown][];
    const preTitle = [] as [string, unknown][];

    Object.entries(obj).forEach(([key, value]) => {
        if (value === undefined || value === null) {
            console.warn(`key: "${key}" is ${value}.`);
            preTitle.push([key, '-']);
            return;
        }
        if (value.constructor === Object) {
            packagingData(value as Record<string, unknown>, key);
        } else if (Array.isArray(value)) {
            if (isHide(key, null, { asMeta: false, asTitle: true })) {
                title.value[key] = value as unknown[];
            } else {
                preTable.push([key, value]);
            }
        } else {
            preTitle.push([key, value]);
        }
    });
    buildTitle(category, preTitle);
    buildTable(category, preTable);
}
function buildTitle(category: string, pre:[string, unknown][]) {
    // TODO перенести фильтры из Head сюда
    const { value } = title;
    pre.forEach(([k, v]) => {
        if (!value[category]) {
            value[category] = {};
        }
        (value[category] as Record<string, unknown>)[k] = v;
    });
}
function buildTable(category: string, pre: [string, unknown][]) {
    const { head, body } = table.value;
    const { Name } = props.data;
    const keys = pre.map(([k]: [string, unknown]) => k);

    pre
        .filter(([k]: [string, unknown]) => (keys.includes(`_${k}`)) ? true : !isHide(k, Name))
        .sort(([a]: [string, unknown], [b]: [string, unknown]) => props.sort ? headersOrder.indexOf(a) - headersOrder.indexOf(b) : 0)
        .forEach(([key, value]) => {
            if (Array.isArray(head[category])) {
                head[category].push(key);
                body[category].push(value);
            } else {
                head[category] = [key];
                body[category] = [value];
            }
        });
}
</script>
<style scoped lang="scss">
.container-wrap {
    margin: 3%;
    display: flex;
    justify-content: center;

    .container {
        width: 100%;
    }
}
</style>
