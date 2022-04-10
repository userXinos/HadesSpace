<template>
  <div>

    <div class="general">
      <div class="body">
        <div class="text-side">
          <div
            v-if="args.default.TID"
            :id="args.default.Name"
            class="title"
          >
            <a
              v-t="args.default.TID"
              :href="`#${args.default.Name}`"
            />
          </div>
          <p
            v-if="args.default.TID_Description"
            v-t="args.default.TID_Description"
            class="description"
          />
          <ul class="characteristics">
            <li
              v-for="(value, key) in getCharacteristics(args.default)"
              :key="key"
              class="line"
            >
              <b>{{ formatKey(key) }}</b>: {{ formatValue(key, value) }}
            </li>
          </ul>
        </div>
        <div
          v-if="iconDir"
          class="icon"
        >
          <icon
            :name="args.default.Icon || args.default.Model"
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
              v-if="args.default.TID"
              :id="`#${args.default.Name}-${name}`"
              class="title"
            >
              <a :href="`#${args.default.Name}-${name}`">{{ formatKey(name) }}</a>
            </div>
            <p
              v-if="args[name].TID_Description && args[name].TID_Description != args.default.TID_Description"
              v-t="args[name].TID_Description"
              class="description"
            />
            <ul class="characteristics">
              <li
                v-for="(value, key) in getCharacteristics(item)"
                :key="key"
                class="line"
              >
                <b>{{ formatKey(key) }}</b>: {{ formatValue(key, value) }}
              </li>
            </ul>
          </div>
          <div
            v-if="(args[name].Icon || args[name].Model) && name in iconDirList"
            class="icon"
          >
            <icon
              :name="args[name].Icon || args[name].Model"
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

import value from '@Handlers/value.js';
import key from '@Handlers/key.js';
import ignoringKeys from '@Regulation/ignoringKeys.js';

const ICON_DIR_LIST = {
    drone: 'game/Ships',
};

export default {
    name: 'Head',
    components: { Icon },
    props: {
        args: {
            type: Object,
            default: () => ({ default: {} }),
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

        this.other = { ...this.args };
        delete this.other.default;
    },
    methods: {
        getCharacteristics(d) {
            const res = { ...d };
            ignoringKeys.meta.forEach((k) => delete res[k]);
            return res;
        },
        formatKey(...args) {
            return key(...args, this.formatterOpts);
        },
        formatValue(...args) {
            return value(...args, this.formatterOpts);
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
            margin: 1% 0;

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

.other {
    margin-top: 2%;
    display: flex;
    gap: 3%;

    .item {
        padding: 2%;
        background-color: #2b2b2b;
        width: 100%;

        @media screen and (max-width: $mw) {
            width: auto;
            margin-top: 3%;
        }
    }

    .item .body .text-side {
        .title {
            font-size: 170%;
        }
        .description {}
        .characteristics .line {
            font-size: 100%;
        }
    }

    @media screen and (max-width: $mw) {
        flex-direction: column;
    }
}

//.general {
//  display: flex;
//  justify-content: space-between;
//  height: 100%;
//  padding-bottom: 1%;
//}
//
//.other {
//  display: flex;
//  justify-content: space-between;
//
//  @media screen and (max-width: $mw) {
//    flex-direction: column;
//  }
//
//  .characteristics {
//    background-color: #2b2b2b;
//    margin: 0 10px;
//    width: 100%;
//    padding: 15px;
//
//    @media screen and (max-width: $mw) {
//      width: auto;
//      margin: 0 0 10px;
//
//      &:last-child {
//        margin: 0;
//      }
//    }
//    .line {
//      padding: 4px 0;
//    }
//  }
//}
</style>
