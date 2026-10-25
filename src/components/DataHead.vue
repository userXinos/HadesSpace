<template>
  <div>
    <div class="general">
      <stats
        :items="data.default"
        :source="source"
        :format="format"
        :icon-dir="iconDir"
        :variants="variants"
        :active-variant-id="activeVariantId"
        @toggle-variant="emit('toggle-variant', $event)"
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

<script setup lang="ts">
import { computed } from 'vue';

import Stats from '@/components/DataHeadStats.vue';
import type { ModuleVariant } from '@Utils/moduleVariants';

export interface Props {
    data: {[k: string]: unknown, default: unknown},
    format: {value: (k: string, v: unknown) => unknown, key: (k: string) => string}
    iconDir: string
    source?: Record<string, unknown> | null
    variants?: ModuleVariant[] | null
    activeVariantId?: string | null
}

const props = defineProps<Props>();
const emit = defineEmits<{(e: 'toggle-variant', id: string): void}>();
const activeVariant = computed(
    () => props.variants?.find((variant) => variant.id === props.activeVariantId) ?? null,
);
const other = computed(() => {
    const res = { ...props.data };
    const extraModules = activeVariant.value?.extraModules ?? [];

    delete res.default;

    if (extraModules.length) {
        res.modules = Array.isArray(res.modules) ?
            [...res.modules, ...extraModules] :
            extraModules;
    }

    return res;
});

</script>

<style scoped lang="scss">
$mw: 900px;

.general {
    ::v-deep(.wrapper) {
        .item {
            background: none;

            .body {
                width: 100%;
                padding: 0;


                .meta {
                    .text-side {
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
                    }

                    > .icon {
                        flex: 1;

                        @media screen and (max-width: $mw) {
                            flex: 2;
                            max-width: none;
                        }
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
        }
    }
}
</style>
