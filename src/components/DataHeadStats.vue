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
                :id="`${parentId}-${name}`"
                class="title"
              >
                <a :href="`#${parentId}-${name}`">{{ format.key(name || item.TID) }}</a>
              </div>
              <p
                v-if="item.TID_Description"
                v-t="item.TID_Description"
                class="description"
              />

              <template v-if="Array.isArray(item) && item.every((e) => e !== Object(e))">
                {{ format.value(name, item) }}
              </template>
              <ul
                v-else
                class="characteristics"
              >
                <li
                  v-for="(value, key) in getCharacteristics(item)"
                  :key="key"
                  class="line"
                >
                  <Stats
                    :item-key="key"
                    :items="value"
                    :format="format"
                    :parent-id="`${parentId}-${name}`"
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
                :dir="iconDirList[name] || iconDirList.default"
              />
            </div>
          </div>
        </div>

      </div>
    </template>

    <template v-else>
      <b>{{ format.key(itemKey) }}</b>: {{ format.value(itemKey, items) }}
    </template>

  </div>
</template>

<script>
import Icon from '@/components/Icon.vue';

import objectArrayify from '@Scripts/objectArrayify.js';
import ignoringKeys from '@Regulation/ignoringKeys.js';

const ICON_DIR_LIST = {
    drone: 'game/Ships',
    modules: 'game/Modules',
    default: 'game/Modules',
};

export default {
    name: 'Stats',
    components: { Icon },
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
        format: {
            type: Object,
            requested: true,
            default: () => ({ key: () => null, value: () => null }),
        },
    },
    data() {
        return {
            iconDirList: ICON_DIR_LIST,
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
                        font-size: 180%;
                    }
                    a {
                        color: #ccd7de;
                    }
                }
                .description {
                    font-size: 120%;
                    margin: 0 0 1%;

                    @media screen and (max-width: $mw) {
                        font-size: 100%;
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
                    }
                }
            }
            .icon {
                flex: 2;
                margin: 2%;
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
