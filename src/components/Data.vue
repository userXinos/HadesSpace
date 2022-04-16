<template>
  <div class="container">

    <v-title
      :data="title"
      :format="format"
      :icon-dir="iconDir"
    />

    <v-table
      v-if="table != null"

      :data="table"
      :format="format"
      v-bind="tableOpts"
    >
      <!--         eslint-disable vue/max-attributes-per-line         -->
      <template #head="p"><slot name="table-head" v-bind="p" /></template>
      <template #body="p"><slot name="table-body" v-bind="p" /></template>
    </v-table>

  </div>
</template>

<script>
import VTable from './DataTable.vue';
import VTitle from './DataHead.vue';

import key from '@Handlers/key.js';
import value from '@Handlers/value.js';

import ignoringKeys from '@Regulation/ignoringKeys.js';

export default {
    name: 'Data',
    components: { VTable, VTitle },
    props: {
        data: {
            type: Object,
            default: undefined,
            request: true,
        },
        tableOpts: {
            type: Object,
            default: () => ({}),
        },
        iconDir: {
            type: String,
            default: '',
        },
    },
    data() {
        return {
            table: {
                head: {},
                body: {},
            },
            title: {},
            format: {
                key: (k) => key(k, this.formatOpts),
                value: (k, v) => value(k, v, this.title.default.Name, this.formatOpts),
            },
        };
    },
    created() {
        this.packagingData(this.data);
        this.formatOpts = {
            $t: this.$t.bind(this),
            $te: this.$te.bind(this),
        };
    },
    methods: {
        packagingData(obj, category = 'default') {
            const { table: { head, body }, title } = this;
            const { Name } = this.data;

            Object.entries(obj).forEach(([key, value]) => {
                if (value.constructor === Object) {
                    this.packagingData(value, key);
                } else if (Array.isArray(value)) {
                    if (ignoringKeys.forceTitle.includes(key)) {
                        title[key] = value;
                    } else {
                        if (ignoringKeys.global.includes(key) || ignoringKeys.byPath.includes(`${Name}.${key}`)) {
                            return; // в Head ещё один фильтр для углублённой сортировки, в таблицах - проще сразу тут
                        }
                        if (Array.isArray(head[category])) {
                            head[category].push(key);
                            body[category].push(value);
                        } else {
                            head[category] = [key];
                            body[category] = [value];
                        }
                    }
                } else {
                    if (!title[category]) {
                        title[category] = {};
                    }
                    title[category][key] = value;
                }
            });
            if (category === 'default' && Object.keys(head).length === 0) {
                this.table = null;
            }
        },
    },
};
</script>
<style scoped lang="scss">
.container {
  margin: 5% 0;
}
</style>
