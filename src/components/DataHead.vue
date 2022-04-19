<template>
  <div>
    <div class="general">
      <div class="body">
        <div class="text-side">
          <div
            v-if="data.default.TID"
            :id="data.default.Name"
            class="title"
          >
            <a
              v-t="data.default.TID"
              :href="`#${data.default.Name}`"
            />
          </div>
          <p
            v-if="data.default.TID_Description"
            class="description"
          >
            {{ formatDescr(data.default.TID_Description) }}
          </p>
          <ul class="characteristics">
            <li
              v-for="(value, key) in getCharacteristics(data.default)"
              :key="key"
              class="line"
            >
              <b>{{ format.key(key) }}</b>:
              <v-node
                v-if="typeof format.value(key, value) === 'function'"
                :render="format.value(key, value)"
              />
              <template v-else>
                {{ format.value(key, value) }}
              </template>
            </li>
          </ul>
        </div>
        <div
          v-if="iconDir"
          class="icon"
        >
          <icon
            :name="data.default.Icon || data.default.Model"
            :dir="iconDir"
          />
        </div>
      </div>
    </div>

    <div
      v-if="Object.keys(other).length"
      class="other"
    >
      <Stats
        :parent-id="data.default.Name"
        :items="other"
        :format="format"
      />
    </div>
  </div>

</template>

<script>
import Icon from './Icon.vue';
import Stats from '@/components/DataHeadStats.vue';

import objectArrayify from '@Scripts/objectArrayify.js';
import ignoringKeys from '@Regulation/ignoringKeys.js';
import { h } from 'vue';

function VNode({ render }) {
    return render(h);
}

// TODO избавится от дублирования логики с Stats
export default {
    name: 'Head',
    components: { Icon, Stats, VNode },
    props: {
        data: {
            type: Object,
            requested: true,
            default: () => ({ default: {} }),
        },
        format: {
            type: Object,
            requested: true,
            default: () => ({ key: () => null, value: () => null }),
        },
        iconDir: {
            type: String,
            default: '',
        },
    },
    data() {
        return {
            other: {},
        };
    },
    created() {
        this.other = { ...this.data };
        delete this.other.default;
    },
    methods: {
        getCharacteristics(d) {
            const res = objectArrayify(d, {
                filter: ([k]) => (
                    !ignoringKeys.global.includes(k) &&
                    !ignoringKeys.byPath.includes(`${d.Name}.${k}`) &&
                    !ignoringKeys.meta.includes(k)
                ),
            });

            if (d.projectile) { // перенести вниз
                const { projectile } = res;
                delete res.projectile;
                res.projectile = projectile;
            }
            return res;
        },
        formatDescr(key) {
            return this.$t(key, ['X', 'Y', 'Z']).replace(/<[^>]*>/g, '');
        },
    },
};
</script>

<style scoped lang="scss">
$mw: 900px;

.body {
    display: flex;

    .text-side {
        flex: 9;

        .title {
            margin-bottom: 1%;
            font-size: 200%;

            @media screen and (max-width: $mw) {
                font-size: 180%;
            }
            a {
                color: #ccd7de;
            }
        }
        .description {
            font-size: 140%;
            margin: 0 0 1%;

            @media screen and (max-width: $mw) {
                font-size: 100%;
            }
        }
        .characteristics {
            list-style-type: none;

            li.line {
                font-size: 130%;
                padding: 4px 0;

                .description {
                    white-space: normal;
                }

                @media screen and (max-width: $mw) {
                    font-size: 90%;
                }
            }
            &:last-child {
                margin-right: 0;
            }
            &:first-child {
                margin-left: 0;
            }
        }
    }
    .icon {
        flex: 1;
        margin: 2%;
        max-width: 140px;

        @media screen and (max-width: $mw) {
            flex: 2;
            max-width: none;
        }
    }

}
</style>
