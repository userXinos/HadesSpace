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
              <b>{{ format.key(key) }}</b>: {{ format.value(key, value) }}
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
      <div
        v-for="(item, name) in other"
        :key="name"
        class="item"
      >
        <div class="body">
          <div class="text-side">
            <div
              :id="`${data.default.Name}-${name}`"
              class="title"
            >
              <a :href="`#${data.default.Name}-${name}`">{{ format.key(name) }}</a>
            </div>

            <div
              v-if="Array.isArray(item)"
              class="sub-item"
            >
              <template v-if="item.every((e) => typeof e === 'object' && e !== null)">
                <div
                  v-for="(subItem, subName) of item"
                  :key="subName"
                  class="item"
                >
                  <div class="body">
                    <div class="text-side">
                      <div
                        :id="`${data.default.Name}-${name}-${subName}`"
                        class="title"
                      >
                        <a :href="`#${data.default.Name}-${name}-${subName}`">{{
                          format.key(subItem.TID)
                        }}</a>
                      </div>
                      <p
                        v-if="subItem.TID_Description"
                        v-t="subItem.TID_Description"
                        class="description"
                      />
                      <ul class="characteristics">
                        <li
                          v-for="(value, key) in getCharacteristics(subItem)"
                          :key="key"
                          class="line"
                        >

                          <div
                            v-if="value.constructor == Object"
                            class="sub-item"
                          >
                            <div class="item">
                              <div class="body">
                                <div class="text-side">
                                  <div
                                    :id="`${data.default.Name}-${name}-${subName}-${key}`"
                                    class="title"
                                  >
                                    <a :href="`#${data.default.Name}-${name}-${subName}-${key}`">{{
                                      format.key(subItem.TID)
                                    }}</a>
                                  </div>
                                  <p
                                    v-if="value.TID_Description"
                                    v-t="value.TID_Description"
                                    class="description"
                                  />
                                  <ul class="characteristics">
                                    <li
                                      v-for="(v, k) in getCharacteristics(value)"
                                      :key="k"
                                      class="line"
                                    >
                                      <b>{{ format.key(k) }}</b>: {{ format.value(k, v) }}
                                    </li>
                                  </ul>
                                </div>
                                <div
                                  v-if="value.Icon || value.Model"
                                  class="icon"
                                >
                                  <icon
                                    :name="value.Icon || value.Model"
                                    dir="game/Modules"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>

                          <template v-else>
                            <b>{{ format.key(key) }}</b>: {{ format.value(key, value) }}
                          </template>
                        </li>
                      </ul>
                    </div>
                    <div
                      v-if="subItem.Icon || subItem.Model"
                      class="icon"
                    >
                      <icon
                        :name="subItem.Icon || subItem.Model"
                        dir="game/Modules"
                      />
                    </div>
                  </div>
                </div>
              </template>
              <template v-else>
                {{ format.value(name, item) }}
              </template>
            </div>

            <template v-else>
              <p
                v-if="data[name].TID_Description && data[name].TID_Description != data.default.TID_Description"
                v-t="data[name].TID_Description"
                class="description"
              />
              <ul class="characteristics">
                <li
                  v-for="(value, key) in getCharacteristics(item)"
                  :key="key"
                  class="line"
                >
                  <b>{{ format.key(key) }}</b>: {{ format.value(key, value) }}
                </li>
              </ul>
            </template>
          </div>
          <div
            v-if="(data[name].Icon || data[name].Model) && name in iconDirList"
            class="icon"
          >
            <icon
              :name="data[name].Icon || data[name].Model"
              :dir="iconDirList[name]"
            />
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import Icon from './Icon.vue';

import objectArrayify from '@Scripts/objectArrayify.js';
import ignoringKeys from '@Regulation/ignoringKeys.js';

const ICON_DIR_LIST = {
    drone: 'game/Ships',
    modules: 'game/Modules',
};

export default {
    name: 'Head',
    components: { Icon },
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
            iconDirList: ICON_DIR_LIST,
        };
    },
    created() {
        this.formatterOpts = {
            $t: this.$t.bind(this),
            $te: this.$te.bind(this),
        };

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
        flex: 7;

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
            font-size: 150%;
            margin: 0 0 1%;

            @media screen and (max-width: $mw) {
                font-size: 100%;
            }
        }
        .characteristics {
            list-style-type: none;

            li.line {
                font-size: 130%;
                white-space: nowrap;
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

        @media screen and (max-width: $mw) {
            flex: 2;
        }
    }

}

.other, .sub-item {
    margin-top: 2%;
    display: flex;
    gap: 2%;

    .item  {
        background-color: #2b2b2b;
        width: 100%;

        @media screen and (max-width: $mw) {
            width: auto;
            margin-top: 3%;
        }

        .sub-item {
            flex-wrap: wrap;

            .item {
                margin-bottom: 1%;

                .body {
                    background-color: #171717;

                    .text-side {
                        padding: 1%;

                        .title {
                            font-size: 130%;
                        }
                    }
                }
            }
        }
    }

    .item .body .text-side {
        padding: 2%;

        .title {
            font-size: 170%;
        }
        .description {
            font-size: 120%;
        }
        .characteristics .line {
            font-size: 100%;
        }
    }

    @media screen and (max-width: $mw) {
        flex-direction: column;
    }
}
</style>
