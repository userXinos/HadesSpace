<template>
  <div>

    <div class="general">
      <div class="body">
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
            v-for="(value, key) in characteristics.default"
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

    <div class="other">
      <ul
        v-for="(item, name) in characteristics.other"
        :key="name"
        class="characteristics"
      >
        <li class="header">
          <a
            v-t="name"
            :href="`#${args.default.Name}-${name}`"
          />
        </li>
        <li
          v-if="args[name].TID_Description && args[name].TID_Description != args.default.TID_Description"
          v-t="args[name].TID_Description"
          class="description"
        />
        <li
          v-for="(value, key) in item"
          :key="key"
          class="line"
        >
          <b>{{ formatKey(key) }}</b>: {{ formatValue(key, value) }}
        </li>
      </ul>
    </div>

  </div>
</template>

<script>
import Icon from './Icon.vue';

import value from '@Handlers/value.js';
import key from '@Handlers/key.js';
import ignoringKeys from '@Regulation/ignoringKeys.js';
import objectArrayify from '@Scripts/objectArrayify.js';

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
            characteristics: {
                default: {},
                other: {},
            },
        };
    },
    created() {
        this.formatterOpts = {
            $t: this.$t.bind(this),
            $te: this.$te.bind(this),
        };

        this.characteristics.default = objectArrayify(this.args.default, {
            filter: ([name]) => !ignoringKeys.global.includes(name),
        });
        this.characteristics.other = objectArrayify(this.args, {
            filter: ([name]) => name !== 'default',
            map: ([key, value]) => [
                key,
                objectArrayify(value, {
                    filter: ([name]) => !ignoringKeys.global.includes(name),
                }),
            ],
        });
    },
    methods: {
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

.general {
  display: flex;
  justify-content: space-between;
  height: 100%;
  padding-bottom: 1%;

  .body {
    flex-basis: 90%;

    @media screen and (max-width: $mw) {
      flex-basis: 80%;
    }

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
    .characteristics .line {
      padding: 4px 0;
    }
  }
  .icon {
    flex-basis: 10%;

    @media screen and (max-width: $mw) {
      flex-basis: 20%;
    }
  }
}

.other {
  display: flex;
  justify-content: space-between;

  @media screen and (max-width: $mw) {
    flex-direction: column;
  }

  .characteristics {
    background-color: #2b2b2b;
    margin: 0 10px;
    width: 100%;
    padding: 15px;

      .description {
          font-size: 140%;
          padding-bottom: 1%;

          @media screen and (max-width: $mw) {
              font-size: 100%;
          }
      }

    @media screen and (max-width: $mw) {
      width: auto;
      margin: 0 0 10px;

      &:last-child {
        margin: 0;
      }
    }
    .line {
      padding: 4px 0;
    }
  }
}
.characteristics {
  font-size: 80%;
  list-style-type: none;

  li.header {
    font-size: 180%;
    padding-bottom: 8px;

    @media screen and (max-width: $mw) {
      font-size: 120%;
    }
  }
  li.line {
    font-size: 130%;
    white-space: nowrap;

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
</style>
