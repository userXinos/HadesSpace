<template>
  <div>
    <div class="general">
      <stats
        :items="data.default"
        :format="format"
        :icon-dir="iconDir"
      />
    </div>

    <div
      v-if="Object.keys(other).length"
      class="other"
    >
      <stats
        :parent-id="data.default.Name"
        :parent="data.default"
        :items="other"
        :format="format"
      />
    </div>
  </div>

</template>

<script>
import Stats from '@/components/DataHeadStats.vue';

export default {
    name: 'Head',
    components: { Stats },
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
    computed: {
        other() {
            const res = { ...this.data };
            delete res.default;
            return res;
        },
    },
};
</script>

<style scoped lang="scss">
$mw: 900px;

.general {
    ::v-deep(.wrapper) {
        .item {
            background: none;

            .body {
                .text-side {
                    padding: 0;

                    .title {
                        font-size: 200%;

                        @media screen and (max-width: $mw) {
                            font-size: 180%;
                        }
                    }
                    .description {
                        font-size: 140%;

                        @media screen and (max-width: $mw) {
                            font-size: 100%;
                        }
                    }
                    .characteristics {
                        .line {
                            font-size: 140%;

                            @media screen and (max-width: $mw) {
                                font-size: 90%;
                            }
                        }
                    }
                }
                > .icon {
                    flex: 1;
                    margin: 10px 0 0;
                    max-width: 140px;

                    @media screen and (max-width: $mw) {
                        flex: 2;
                        max-width: none;
                    }
                }
            }
        }
    }
}
</style>
