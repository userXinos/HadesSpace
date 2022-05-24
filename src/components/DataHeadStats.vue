<template>
  <div>
    <template v-if="isObject(items) || (Array.isArray(items) && items.every(isObject))">
      <div class="wrapper">

        <div
          v-for="(item, name) of itemsToArray"
          :key="name"
          class="item"
        >
          <div class="body">
            <div class="text-side">
              <div
                v-if="name || item.TID"
                :id="parentId ? `${parentId}-${name}` : item.Name"
                class="title"
              >
                <a :href="parentId ? `#${parentId}-${name}` : `#${item.Name}`">
                  {{ format.key(name || item.TID) }}
                </a>
              </div>
              <p
                v-if="item.TID_Description && (parent.TID_Description ? parent.TID_Description !== item.TID_Description : true)"
                class="description"
              >
                {{ formatDescr(item.TID_Description) }}
              </p>

              <template v-if="Array.isArray(item) && item.every((e) => e !== Object(e))">
                {{ format.value(name, item) }}
              </template>
              <ul
                v-else
                class="characteristics"
              >
                <li
                  v-for="([value, filtered], key) in getCharacteristics(item)"
                  :key="key"
                  :class="{'line': true, filtered}"
                >
                  <Stats
                    :item-key="key"
                    :items="value"
                    :format="format"
                    :parent-id="`${parentId}-${name}`"
                    :parent="item"
                  />
                </li>
              </ul>
            </div>
            <div
              v-if="item.Icon || item.Model"
              class="icon"
            >
              <icon
                :name="item.Icon || item.Model"
                :dir="iconDir || iconDirList[name] || iconDirList.default"
              />
            </div>
          </div>
        </div>

      </div>
    </template>

    <template v-else>
      <b>{{ format.key(itemKey) }}</b>:

      <v-node
        v-if="typeof format.value(itemKey, items) === 'function'"
        :render="format.value(itemKey, items)"
      />
      <template v-else>
        {{ format.value(itemKey, items) }}
      </template>

    </template>

  </div>
</template>

<script>
import { h } from 'vue';
import Icon from '@/components/Icon.vue';
import Store from '@Store/index';

import objectArrayify from '@/js/objectArrayify';
import hk from '@Regulation/hideKeys.js';


const ICON_DIR_LIST = {
    drone: 'game/Ships',
    modules: 'game/Modules',
    default: 'game/Modules',
};

function VNode({ render }) {
    return render(h);
}
export function getCharsWithHideStatus(d) {
    const res = objectArrayify(d, {
        map: ([k, value]) => [
            k,
            [
                value,
                hk.global.includes(k) || hk.byPath.includes(`${d.Name}.${k}`),
            ],
        ],
        filter: ([k, [, remove]]) => (
            hk.meta.includes(k) ? false : (Store.state.userSettings.disableFilters ? true : !remove)
        ),
    });

    if (d.projectile) { // перенести вниз
        const { projectile } = res;
        delete res.projectile;
        res.projectile = projectile;
    }
    return res;
}

export default {
    name: 'Stats',
    components: { Icon, VNode },
    props: {
        items: {
            type: null,
            requested: true,
            default: () => [],
        },
        itemKey: {
            type: String,
            requested: false,
            default: null,
        },
        parentId: {
            type: String,
            requested: true,
            default: null,
        },
        parent: {
            type: Object,
            requested: false,
            default: () => ({ TID_Description: null }),
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
            iconDirList: ICON_DIR_LIST,
            getCharacteristics: getCharsWithHideStatus,
        };
    },
    computed: {
        itemsToArray() {
            if (Array.isArray(this.items)) {
                return this.items;
            }
            if (Object.values(this.items).every((e) => this.isObject(e) || Array.isArray(e))) {
                return this.items;
            }
            return [this.items];
        },
    },
    methods: {
        isObject(o) {
            return (typeof o === 'object' && !Array.isArray(o) && o !== null);
        },
        formatDescr(descrKey) {
            const customDescrKey = descrKey.endsWith('_DESCR') ? descrKey.replace('_DESCR', '_CUSTOM_DESCR') : null;
            const descr = this.$t(descrKey, ['X', 'Y', 'Z']).replace(/<[^>]*>/g, '');
            const customDescr = (customDescrKey && this.$te(customDescrKey)) ? this.$t(customDescrKey) : null;

            return (customDescr) ? `${descr}\n\n${customDescr}` : descr;
        },
    },
};
</script>

<style scoped lang="scss">
$mw: 900px;

.wrapper {
    margin-top: 2%;
    display: flex;
    gap: 2%;

    @media screen and (max-width: $mw) {
        flex-direction: column;
    }

    .item {
        background-color: #2b2b2b;
        width: 100%;

        @media screen and (max-width: $mw) {
            width: auto;
            margin-top: 3%;
        }

        .body {
            display: flex;

            .text-side {
                flex: 9;
                padding: 2%;

                .title {
                    margin-bottom: 1%;
                    font-size: 170%;

                    @media screen and (max-width: $mw) {
                        font-size: 140%;
                    }
                    a {
                        color: #ccd7de;
                    }
                }
                .description {
                    white-space: pre-line;
                    font-size: 120%;
                    margin: 0 0 1%;

                    @media screen and (max-width: $mw) {
                        font-size: 90%;
                    }
                }
                .characteristics {
                    list-style-type: none;

                    .line {
                        font-size: 100%;
                        padding: 4px 0;

                        @media screen and (max-width: $mw) {
                            font-size: 90%;
                        }
                        &.filtered {
                            background-color: rgba(220,20,60, 0.2);
                        }
                    }
                }
            }
            .icon {
                flex: 2;
                margin: 1%;
                max-width: 140px;

                @media screen and (max-width: $mw) {
                    max-width: none;
                }
            }

        }
    }
}
// sub-item
.line {
    .wrapper {
        margin: 0;

        .item {
            background-color: #171717;

            .body .text-side {
                // padding: 0 0 0 1%;
            }
            .icon {
                max-width: 100px;
            }
        }
    }
}
</style>
