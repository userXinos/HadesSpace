<!--suppress TypeScriptValidateTypes -->
<template>
  <div>
    <template v-if="isObject(items) || (Array.isArray(items) && items.every(isObject))">
      <div class="wrapper">

        <div
          v-for="(item, name) of (itemsToArray as {[k: string]: unknown, TID: string, TID_Description: string}[])"
          :key="name"
          class="item"
        >
          <div class="body">
            <div class="meta">
              <div class="text-side">
                <div
                  v-if="name || item.TID"
                  :id="parentId ? `${parentId}-${name}` : item.Name"
                  class="title"
                >
                  <a :href="parentId ? `#${parentId}-${name}` : `#${item.Name}`">
                    {{ activeVariant ? t(activeVariant.titleLocKey, [format.key(item.TID || name)]) : format.key(item.TID || name) }}
                  </a>
                </div>
                <p
                  v-if="activeVariant"
                  class="description"
                >
                  {{ formatDescr(activeVariant.descriptionKey) }}
                </p>
                <p
                  v-else-if="item.TID_Description && (parent?.TID_Description ? parent.TID_Description !== item.TID_Description : true) && $te(item.TID_Description)"
                  class="description"
                >
                  {{ formatDescr(item.TID_Description) }}
                </p></div>

              <div
                v-if="item.PrefabModel || item.Icon || item.Model"
                class="icon"
              >
                <icon
                  :name="item.PrefabModel || item.Icon || item.Model"
                  :dir="iconDir || ICON_DIR_LIST[name] || ICON_DIR_LIST.default"
                />
                <div
                  v-if="variants && variants.length"
                  class="variant-switch"
                >
                  <button
                    v-for="variantOption in variants"
                    :key="variantOption.id"
                    type="button"
                    class="variant-btn"
                    :class="[variantOption.id, {active: activeVariantId === variantOption.id}]"
                    :title="t(variantOption.titleLocKey, [format.key(item.TID || name)])"
                    :aria-label="t(variantOption.titleLocKey, [format.key(item.TID || name)])"
                    :aria-pressed="activeVariantId === variantOption.id"
                    @click.stop="emit('toggle-variant', variantOption.id)"
                  >
                    <icon
                      :name="item.PrefabModel || item.Icon || item.Model"
                      :dir="iconDir || ICON_DIR_LIST[name] || ICON_DIR_LIST.default"
                    />
                  </button>
                </div>
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
                v-for="([value, filtered], key) in scalarCharacteristics(item)"
                :key="key"
                :class="{filtered}"
                class="line"
              >
                <!--suppress HtmlUnknownTag -->
                <DataHeadStats
                  :item-key="key"
                  :items="value"
                  :format="format"
                  :parent-id="`${parentId}-${name}`"
                  :parent="item"
                />
              </li>

              <template v-if="activeVariant && variantCharacteristics.length">
                <li
                  class="variant-separator"
                  aria-hidden="true"
                />
                <li
                  v-for="{ key, value, filtered } in variantCharacteristics"
                  :key="`variant-${key}`"
                  :class="{filtered}"
                  class="line variant-characteristic"
                >
                  <template v-if="key !== '_statsByStar'">
                    <b>
                      <DataStatTooltip :k="key">
                        {{ format.key(key) }}
                      </DataStatTooltip>
                    </b><template v-if="$store.state.userSettings.showKeys"> ({{ key }})</template>:
                    <span
                      :class="statsStyleName(key)"
                      class="value stats-style"
                    >{{ format.value(key, value) }}</span>
                  </template>
                  <DataStatByStar
                    v-else
                    :items="value"
                    :format="format"
                  />
                </li>
              </template>

              <li
                v-for="([value, filtered], key) in tableCharacteristics(item)"
                :key="key"
                :class="{filtered}"
                class="line"
              >
                <DataStatByStar
                  :items="value"
                  :format="format"
                />
              </li>
            </ul>

            <DataStatByStar
              v-if="getGraceStats(source)"
              class="grace-stats"
              :items="getGraceStats(source)"
              :format="format"
            />
          </div>
        </div>

      </div>
    </template>

    <template v-else>
      <b>
        <DataStatTooltip
          v-if="itemKey"
          :k="itemKey"
        >
          {{ format.key(itemKey) }}
        </DataStatTooltip>
      </b>
      <template v-if="$store.state.userSettings.showKeys"> ({{ itemKey }})</template>:

      <v-node
        v-if="typeof format.value(itemKey as string, items) === 'function'"
        :render="format.value(itemKey as string, items)"
      />
      <span
        v-else
        :class="statsStyleName(itemKey as string)"
        class="value stats-style"
      >
        {{ format.value(itemKey, items) }}
      </span>

      <slot />

    </template>

  </div>
</template>

<script lang="ts">
import { useStore } from 'vuex';

import objectArrayify from '@Utils/objectArrayify';
import isHide from '@Handlers/isHide';
import postfixes, { regex as postfixesRegex } from '@Regulation/postfixes.mjs';
import formatValueRulesTime from '@Regulation/formatValueRulesTime.mjs';

const EXCLUDE_KEYS_FROM_TIME = ['UnlockTime'];
const starKeys = formatValueRulesTime
    .map(([keys]) => (keys as string[]).filter((k) => !EXCLUDE_KEYS_FROM_TIME.includes(k)))
    .flat();

interface GetCharacteristicsOut {
    [k: string]: [unknown, boolean],
    _statsByStar: [{[k: string]: unknown}, boolean]
}

function getCharacteristics(d: Record<string, unknown>): GetCharacteristicsOut {
    const store = useStore();

    const res: GetCharacteristicsOut = objectArrayify(d, {
        map: ([k, value]) => [
            k,
            [value, isHide(k, d.Name as string)],
        ],
        filter: ([k, [, remove]]) => (
            k.startsWith('_') || isHide(k, null, { asMeta: true, asTitle: false }) ? false : (store?.state?.userSettings?.disableFilters ? true : !remove)
        ),
    }) as GetCharacteristicsOut;

    const keys = Object.keys(res);
    const checkOtherPostfix = (key: string) => {
        const regex = new RegExp(`${key}_?(${postfixes.join('|')})$`);
        return keys.some((k) => regex.test(k));
    };

    // eslint-disable-next-line guard-for-in
    for (const key in res) {
        const hasPostfix = postfixesRegex.test(key);

        if (hasPostfix || (starKeys.includes(key) && checkOtherPostfix(key))) {
            if (!('_statsByStar' in res)) {
                (res as GetCharacteristicsOut)._statsByStar = [{}, false];
            }
            res._statsByStar[0][key] = res[key][0]; // eslint-disable-line prefer-destructuring
            delete res[key];
        }
        if (hasPostfix) {
            const parentKey = key.replace(postfixesRegex, '');
            if (parentKey && res[parentKey] && !(parentKey in res._statsByStar[0])) {
                res._statsByStar[0][parentKey] = res[parentKey][0]; // eslint-disable-line prefer-destructuring
                delete res[parentKey];
            }
        }
    }

    if (d.projectile) { // перенести вниз
        const { projectile } = res;
        delete res.projectile;
        res.projectile = projectile;
    }
    return res;
}
</script>

<script setup lang="ts">
import { h, computed } from 'vue';
import Icon from '@/components/Icon.vue';
import DataStatTooltip from '@/components/DataStatTooltip.vue';
import DataStatByStar from '@/components/DataStatByStar.vue';
import { useI18n } from 'vue-i18n';

import statsStyleName from '@Handlers/statsStyleName';
import type { ModuleVariant } from '@Utils/moduleVariants';
import { getEffectDurationByStar } from '@Utils/moduleVariants';
import { getGraceDescriptions } from '@Utils/graceDescriptions';

export interface Props {
    items: unknown[] | unknown | { [k:string]: object|unknown[] },
    format: { key: (k: string) => string, value: (k: string, v: unknown) => string }
    itemKey?: string|null
    parentId?: string|null
    parent?: {[k: string]: unknown, TID?: string, TID_Description?: string}
    iconDir?: string
    source?: Record<string, unknown>|null
    variants?: ModuleVariant[]|null
    activeVariantId?: string|null
}

const ICON_DIR_LIST = {
    drone: 'game/Ships',
    modules: 'game/Modules',
    default: 'game/Modules',
};

const { t, te } = useI18n();
const props = withDefaults(defineProps<Props>(), {
    itemKey: null,
    parentId: null,
    parent: () => ({ ID_Description: null }),
    iconDir: '',
    source: null,
    variants: null,
    activeVariantId: null,
});
const emit = defineEmits<{(e: 'toggle-variant', id: string): void}>();
const activeVariant = computed(
    () => props.variants?.find((variant) => variant.id === props.activeVariantId) ?? null,
);
const variantCharacteristics = computed(() => {
    const variant = activeVariant.value;
    if (!variant) {
        return [];
    }

    const scalars: Record<string, unknown> = { Name: variant.data.Name };

    variant.fields.forEach((key) => {
        if (key !== 'QEffectDurationF' && key !== 'DroneExtraModule' && !Array.isArray(variant.data[key])) {
            scalars[key] = variant.data[key];
        }
    });

    return Object.entries(getCharacteristics(scalars))
        .map(([key, [value, filtered]]) => ({ key, value, filtered }));
});

function getItemCharacteristics(item: Record<string, unknown>) {
    const percent = Number(activeVariant.value?.data.QEffectDurationF);

    if (!Number.isFinite(percent)) {
        return getCharacteristics(item);
    }

    return getCharacteristics({
        ...item,
        ...getEffectDurationByStar(item, percent),
    });
}

function scalarCharacteristics(item: Record<string, unknown>) {
    return Object.fromEntries(
        Object.entries(getItemCharacteristics(item))
            .filter(([key]) => key !== '_statsByStar'),
    );
}

function tableCharacteristics(item: Record<string, unknown>) {
    return Object.fromEntries(
        Object.entries(getItemCharacteristics(item))
            .filter(([key]) => key === '_statsByStar'),
    );
}

function getGraceStats(source?: Record<string, unknown> | null) {
    const moduleName = source?.Name;
    const entries = typeof moduleName === 'string' ? getGraceDescriptions(moduleName) : [];

    if (!entries.length) {
        return null;
    }

    const stats: Record<string, unknown> = {};

    entries.forEach(({ star, descriptionKey, time }) => {
        stats[`TID_Description_${star}`] = descriptionKey;
        stats[`LaserGraceTimesPerST_${star}`] = time;
    });

    return stats;
}
const itemsToArray = computed(() => {
    if (Array.isArray(props.items)) {
        return props.items;
    }
    if (isObject(props.items) && Object.values(props.items as unknown[]).every((e) => isObject(e) || Array.isArray(e))) {
        return props.items;
    }
    return [props.items];
});

function isObject(o: unknown): boolean {
    return (typeof o === 'object' && !Array.isArray(o) && o !== null);
}
function formatDescr(descrKey: string): string {
    const customDescrKey = descrKey.endsWith('_DESCR') ? descrKey.replace('_DESCR', '_CUSTOM_DESCR') : undefined;
    const descr = t(descrKey, ['X', 'Y', 'Z']).replace(/<[^>]*>/g, '');
    const customDescr = (customDescrKey && te(customDescrKey)) ? t(customDescrKey) : null;

    return (customDescr) ? `${descr}\n\n${customDescr}` : descr;
}

function VNode({ render }) {
    return render(h);
}
</script>

<style scoped lang="scss">
@import "../style/vars";

$mw: 900px;

.wrapper {
    margin-top: 1%;
    display: flex;
    gap: 2%;

    @media screen and (max-width: $mw) {
        flex-direction: column;
    }

    .item {
        background-color: #2e3f46;
        width: 100%;
        border-radius: 10px;

        @media screen and (max-width: $mw) {
            width: auto;
            margin-top: 3%;
            border-radius: 7px;
        }

        .body {
            padding: 2%;
            width: 96%;

            .meta {
                display: flex;

                .text-side {
                    flex: 9;

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
                        padding-bottom: 3%;

                        @media screen and (max-width: $mw) {
                            font-size: 90%;
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

                    .variant-switch {
                        display: flex;
                        justify-content: center;
                        gap: 6px;
                        margin-top: 8px;

                        .variant-btn {
                            position: relative;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            box-sizing: border-box;
                            width: 30%;
                            aspect-ratio: 1;
                            padding: 0;
                            overflow: hidden;
                            border: 1px solid #ccd7de;
                            border-radius: 7px;
                            cursor: pointer;
                            transition: transform 0.15s, box-shadow 0.15s;
                            will-change: transform;

                            :deep(.main) {
                                position: absolute;
                                inset: 0;
                                display: block;
                                width: 100%;
                                height: 100%;
                            }

                            :deep(.container) {
                                height: 100%;
                                padding-top: 0;
                            }

                            :deep(.icon-background) {
                                background: none !important;
                                opacity: 1;
                            }

                            :deep(.icon) {
                                width: 82%;
                                height: 82%;
                            }

                            &.light {
                                background: #fff;

                                :deep(.icon) {
                                    filter: brightness(0);
                                }
                            }

                            &.dark {
                                background: #000;
                            }

                            &:hover,
                            &.active {
                                transform: scale(1.08);
                            }

                            &:hover {
                                box-shadow: 0 0 0 2px rgba(76, 120, 133, 0.55);
                            }

                            &.active {
                                box-shadow: 0 0 0 2px #4c7885;
                            }
                        }
                    }
                }
            }
            .characteristics {
                list-style-type: none;

                .variant-separator {
                    height: 0.8em;
                }

                .line {
                    font-size: 100%;
                    padding: 2px 0;

                    @media screen and (max-width: $mw) {
                        font-size: 90%;
                    }
                    &.filtered {
                        background-color: rgba(220,20,60, 0.2);
                    }

                    &.variant-characteristic b {
                        color: #9fb4be;
                    }

                    span.value.stats-style {
                        display: inline-flex;
                    }
                }
            }

        }
    }
}
.grace-stats {
    margin-top: 1.5em;
}
// sub-item
.line {
    .wrapper {
        margin: 0;

        .item {
            background-color: #202b2f;

            .body .meta .icon {
                max-width: 100px;
            }
        }
    }
}
</style>
