<template>
  <div class="container-wrap">
    <div class="container">

      <v-title
        :data="title"
        :source="data"
        :format="format"
        :icon-dir="iconDir"
        :variants="variants"
        :active-variant-id="activeVariant?.id ?? null"
        @toggle-variant="toggleVariant"
      />

      <slot />

      <v-table
        v-if="variantTable"
        key="variant"
        v-bind="variantTableProps"
      />

      <v-table
        v-if="Object.keys(table.head).length > 0"
        key="base"
        v-bind="baseTableProps"
      >
        <!--         eslint-disable vue/max-attributes-per-line         -->
        <template v-if="$slots['table-head']" #head="p"><slot name="table-head" v-bind="p" /></template>
        <template v-if="$slots['table-body']" #body="p"><slot name="table-body" v-bind="p" /></template>
      </v-table>

    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useRouter } from 'vue-router';

import VTable from './DataTable.vue';
import VTitle from './DataHead.vue';

import key from '@Handlers/key';
import value from '@Handlers/value';
import isHide from '@Handlers/isHide';

import headersOrder from '@Regulation/headersOrder.js';
import globals from '@Data/globals.js';
import type { ModuleVariant } from '@Utils/moduleVariants';
import type { Raw } from '@Utils/tableMask';

export interface Props {
    data: object
    tableOpts?: object
    sort?: boolean
    iconDir: string
    variants?: ModuleVariant[] | null
}
interface DataTable {
    head: Record<string, unknown[]>
    body: Record<string, unknown[]>
}
interface DataTitle {
    [k: string]: {[k: string]: unknown}|unknown[]
}

const router = useRouter();
const props = withDefaults(defineProps<Props>(), {
    tableOpts: () => ({}),
    sort: true,
    iconDir: '',
    variants: null,
});
const table = ref<DataTable>({ head: {}, body: {} });
const title = ref<DataTitle>({ });
const activeVariantId = ref<string | null>(null);

const dataName = computed(() => {
    const { value: t } = title;
    return (t && 'default' in t) ? (t.default as Record<string, string>).Name : undefined;
});
const format = {
    key: (k: string) => key(k, router.currentRoute.value.name as string),
    value: (k: string, v: unknown) => value(k, v, dataName.value),
};

// Light/Dark variants replace the whole card content: heading, stats and table.
const activeVariant = computed<ModuleVariant | null>(
    () => props.variants?.find((variant) => variant.id === activeVariantId.value) ?? null,
);
const variantTable = computed<Raw | null>(() => {
    const variant = activeVariant.value;
    if (!variant) {
        return null;
    }

    const keys = variant.fields.filter((field) => Array.isArray(variant.data[field]));
    if (!keys.length) {
        return null;
    }

    const maxQuantumLevel = Number((globals as { MaxQuantumLevel?: number }).MaxQuantumLevel) || 0;
    const levelCount = Math.max(
        maxQuantumLevel,
        ...keys.map((key) => (variant.data[key] as unknown[]).length),
        1,
    );
    const normalize = (values: unknown[]) => Array.from(
        { length: levelCount },
        (_, index) => values[index] ?? '',
    );

    return {
        head: { default: keys },
        body: { default: keys.map((key) => normalize(variant.data[key] as unknown[])) },
    };
});
const variantTableProps = computed(() => {
    const hide = (k: string) => isHide(k, dataName.value ?? null);

    return Object.assign({ lvlColKey: 'LVL', colLvlStartAt: 1 }, {
        data: variantTable.value,
        format,
        isHide: hide,
    });
});
const baseTableProps = computed(() => {
    const hide = (k: string) => isHide(k, dataName.value ?? null);
    const opts: Record<string, unknown> = {
        ...props.tableOpts,
        data: table.value,
        format,
        isHide: hide,
    };
    // tableOpts may define colLvlStartAt as a getter that reads its own data.
    // Re-bind that getter to this per-card object instead of mutating the
    // shared options object (all module cards receive the same one).
    const levelStart = Object.getOwnPropertyDescriptor(props.tableOpts, 'colLvlStartAt');

    if (levelStart?.get) {
        Object.defineProperty(opts, 'colLvlStartAt', {
            enumerable: true,
            configurable: true,
            get: () => levelStart.get?.call(opts),
        });
    }

    return opts;
});

function toggleVariant(id: string) {
    activeVariantId.value = (activeVariantId.value === id) ? null : id;
}

watch(() => props.data, () => {
    activeVariantId.value = null;
    table.value = { head: {}, body: {} };
    title.value = {};

    packagingData(props.data);
});
watch(() => props.variants, () => {
    activeVariantId.value = null;
});

packagingData(props.data);


function packagingData(obj: Record<string, unknown>, category = 'default', isSubCategory = false) {
    const preTable = [] as [string, unknown][];
    const preTitle = [] as [string, unknown][];

    if (isSubCategory) {
        if (!title.value[category]) {
            title.value[category] = [];
        }
        Object.entries(obj).forEach(([key, value]) => {
            if (Array.isArray(value)) {
                if (isHide(key, null, { asMeta: false, asTitle: true })) {
                    return;
                }
                preTable.push([key, value]);
                delete obj[key];
            }
        });
        title.value[category].push(obj);
    } else {
        Object.entries(obj).forEach(([key, value]) => {
            if (value === undefined || value === null) {
                console.warn(`key: "${key}" is ${value}.`);
                preTitle.push([key, '-']);
                return;
            }
            if (value.constructor === Object) {
                packagingData(value as Record<string, unknown>, key);
            } else if (Array.isArray(value)) {
                if (value.every((e) => e?.constructor === Object)) {
                    value.forEach((subValue) => packagingData(subValue as Record<string, unknown>, key, true));
                    return;
                }
                if (isHide(key, null, { asMeta: false, asTitle: true })) {
                    title.value[key] = value as unknown[];
                } else {
                    preTable.push([key, value]);
                }
            } else {
                preTitle.push([key, value]);
            }
        });
    }
    buildTitle(category, preTitle);
    buildTable(category, preTable);
}
function buildTitle(category: string, pre:[string, unknown][]) {
    const { value } = title;

    pre.forEach(([k, v]) => {
        if (!value[category]) {
            value[category] = {};
        }
        value[category][k] = v;
    });
}
function buildTable(category: string, pre: [string, unknown][]) {
    const { head, body } = table.value;

    pre
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
