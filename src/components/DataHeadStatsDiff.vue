<!--suppress ALL -->
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
                <div v-if="name != 'data'">
                  {{ format.key(name || item.TID) }}  ({{ item.Name }})
                </div>
              </div>

              <template v-if="Array.isArray(item) && item.every((e) => e !== Object(e))">
                {{ format.value(name, item) }}
              </template>
              <ul
                v-else
                class="characteristics"
              >
                <li
                  v-for="([value, charsStatus, filtered], key) in getCharacteristics(item)"
                  :key="key"
                  :class="{'line': true, filtered}"
                >
                  <Stats
                    :item-key="key"
                    :items="value"
                    :format="format"
                    :parent-id="`${parentId}-${name}`"
                    :parent="item"
                    :status="charsStatus"
                  />
                </li>
              </ul>
            </div>
            <div
              v-if="item.PrefabModel || item.Icon || item.Model"
              class="icon"
            >
              <icon
                :name="item.PrefabModel || item.Icon || item.Model"
                :dir="iconDir || iconDirList[name] || iconDirList.default"
              />
            </div>
          </div>
        </div>

      </div>
    </template>

    <template v-else>
      <span :class="`status-${status || parent[itemKey]?.status}`">
        <template v-if="itemKey != 'data'">
          <b>{{ parentId != 'en-data' ? format.key(itemKey) : itemKey }}</b>
          <template v-if="$store.state.userSettings.showKeys"> ({{ itemKey }})</template>
          :
        </template>
        <v-node
          v-if="typeof format.value(itemKey, items) === 'function'"
          :render="format.value(itemKey, items)"
        />
        <span
          v-else
          :item-key="itemKey"
          class="value"
        >
          <template v-if="Array.isArray(items)">
            {{
              items
                .map((e) => format.value(keyFormatter, e))
                .map(e => (parentId == 'en-data') ? `"${e}"`: e)
                .join(items.length == 2 ? ' >> ' : ', ')
            }}
          </template>
          <template v-else>{{ format.value(keyFormatter, items) }}</template>
        </span>
      </span>

      <slot />

    </template>

  </div>
</template>

<script>
import { h } from 'vue';
import Icon from '@/components/Icon.vue';

import objectArrayify from '@Utils/objectArrayify';
import isHide from '@Handlers/isHide';

const ICON_DIR_LIST = {
    drone: 'game/Ships',
    modules: 'game/Modules',
    default: 'game/Modules',
};

function isObject(o) {
    return (typeof o === 'object' && !Array.isArray(o) && o !== null);
}
function VNode({ render }) {
    return render(h);
}
export function getCharsWithHideStatus(d) {
    const res = objectArrayify(d, {
        map: ([k, value]) => [
            k,
            [
                (typeof value == 'object' && 'data' in value) ? value.data : value,
                ('status' in d) ? d.status : null,
                isHide(k, d.Name),
            ],
        ],
        filter: ([k]) => (
            !(k.startsWith('_') || isHide(k, null, { asMeta: true }))
        ),
    });

    for (const key in res) {
        if (typeof res[key][0] == 'object') {
            const keys = Object.keys(res[key][0]);

            if (keys.every((k) => isObject(res[key][0]?.[k]) && 'data' in res[key][0][k])) {
                keys.forEach((k) => res[k] = [...Object.values(res[key][0][k]), ...res[key].slice(2)]);
                delete res[key];
            }
        }
    }

    if (res.projectile) { // перенести вниз
        const { projectile } = res;
        delete res.projectile;
        res.projectile = projectile;
    }

    return res;
}

export default {
    name: 'Stats',
    components: { Icon, VNode },
    inject: {
        additionalStatsContent: {
            default: null,
        },
    },
    props: {
        items: { type: null, required: true },
        itemKey: { type: String, default: null },
        parentId: { type: String, default: null },
        parent: { type: Object, default: () => ({ TID_Description: null }) },
        format: { type: Object, required: true },
        iconDir: { type: String, default: '' },
        status: { type: String, default: '' },
    },
    data() {
        return {
            isObject,
            iconDirList: ICON_DIR_LIST,
            getCharacteristics: getCharsWithHideStatus,
            minimumFormatting: (this?.parent?.Name == 'en'),
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
        keyFormatter() {
            return (this.itemKey == 'data') ? this.parentId.split('-').pop() : this.itemKey;
        },
    },
    methods: {
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
@use "../style/statsStyle";

@import "../style/vars";

$mw: 900px;

.wrapper {
    margin-top: 2%;
    display: flex;
    gap: 2%;

    @media screen and (max-width: $mw) {
        flex-direction: column;
    }

    .item {
        background-color: #2e3f46;
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
                width: 98%;

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
                        padding: 2px 0;

                        @media screen and (max-width: $mw) {
                            font-size: 90%;
                        }
                        &.filtered {
                            background-color: rgba(220,20,60, 0.2);
                        }

                        .status-deleted {
                            &, b, .value {
                                color: #a14145;
                            }
                        }
                        .status-added {
                            &, b, .value {
                                color: #42a15f;
                            }
                        }
                        .status-modified {
                            &, b, .value {
                                color: #dacc5e;
                            }
                        }

                        //@function format($key) {
                        //    @return 'span.value[item-key="#{$key}"]'
                        //}
                        //@include statsStyle.statsIcons(get-function("format"), inline-flex);
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
            background-color: #202b2f;

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
