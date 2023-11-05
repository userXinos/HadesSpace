<template>
  <div class="container">
    <div class="filter">
      <div>
        <button
          class="btn-tech-filter"
          @click="openSelectorByTech = true"
        >{{ 'select tech' }}</button>
      </div>
      <div>
        <select
          @change="filterRoleId = $event.target.value"
        >
          <option
            v-for="role in data.roles"
            :key="role.id"
            :value="role.id"
            :selected="filterRoleId == role.id"
          > {{ role.name }} </option>
        </select>
      </div>
    </div>
    <ul
      class="members-list"
      :class="{'animated-fetch': isFetching}"
    >
      <li
        v-for="mem in filteredMembers"
        :key="mem.userId"
        class="member"
      >
        <div class="meta">
          <div class="avatar">
            <img
              :src="getAvatarUrl(mem.userId, mem.avatar)"
              :alt="`${mem.name} avatar`"
              @error="(e) => e.target.src = memberImage"
            ></div>
          <p>{{ mem.name }}</p>
        </div>
        <div class="sort-tech">
          <ul>
            <li
              v-for="(elem, k) in getTechForDisplay(mem.tech)"
              :key="k"
            >
              <div>
                <Icon
                  :name="elem.icon.name"
                  :dir="elem.icon.dir"
                />
                <span class="level">
                  {{ elem.level }}
                </span>
              </div>
            </li>
          </ul>
        </div>
      </li>
    </ul>

    <Modal
      v-model:open="openSelectorByTech"
      :title="'Code'"
      :size="SIZES.LARGE"
    >
      <template #body>
        <div class="wrap-tech-list">
          <TechList
            :on-click="techItemClick"
            :is-muted="isSelectedTechItem"
          />
        </div>
      </template>
    </Modal>

  </div>
</template>

<!--suppress TypeScriptCheckImport -->
<script setup lang="ts">
import { Compendium, TechLevels, CorpData, CorpMember, getTechIndex } from 'bot_client';
import { onMounted, onUnmounted, reactive, Ref, ref, watch } from 'vue';

import getAvatarUrl from '../utils/getDiscordAvatarUrl';

import Modal, { SIZES } from '@/components/Modal.vue';
import Icon from '@/components/Icon.vue';
import TechList from '@/components/CompendiumTechList.vue';

import memberImage from '@Img/icons/member.png';
import shipsData from '@Data/capital_ships.js';
import spaceBuildingsData from '@Data/spacebuildings.js';
import modulesData from '@Data/modules.js';


const DISPLAY_USER_TECH_ITEMS = 6;

const client = new Compendium();
const isFetching = ref(false);
const openSelectorByTech = ref(false);
const filterRoleId = ref<string>('');
const filterTech = reactive<string[]>([]);
const data: Ref<CorpData> = ref({});
const filteredMembers: Ref<CorpMember[]> = ref([]);

let filteredByRoleCache: CorpMember[];

client.on('connected', (ident: Identity) => {
    console.log(`Connected: ${ident.user.username}, Guild: ${ident.guild.name}`);
    isFetching.value = false;
});
client.on('connectfailed', (e: string) => {
    console.log(`Connect failed: ${e}`);
});
client.on('disconnected', () => {
    console.log(`Disconnected`);
});
client.on('sync', (tl: TechLevels) => {
    console.log(`Tech Levels synced: rs=${tl[701].level}`);
});

onMounted(async () => {
    isFetching.value = true;
    await client.initialize();

    if (!client.getUser()) {
        // openCodeReqModal.value = true;
    } else {
        const resp = await client.corpdata();
        data.value = resp;
        filteredByRoleCache = filteredMembers.value = resp.members;
    }
    isFetching.value = false;
});
onUnmounted(() => {
    client.shutdown();
});

watch(filterRoleId, async (value) => {
    isFetching.value = true;
    filteredByRoleCache = await client.corpdata(value).then((r) => r.members);
    filteredMembers.value = filteredByRoleCache;
    isFetching.value = false;
    filterByTech(filterTech);
});
watch(() => filterTech, filterByTech, { deep: true });


filteredMembers.value = Array.from({ length: 10 }, (i) => ({
    userId: i,
    name: '',
    avatarUrl: '',
}) as CorpMember);


function techItemClick(item: object) {
    if (isSelectedTechItem(item.Name)) {
        filterTech.splice(filterTech.indexOf(item.Name), 1);
    } else {
        filterTech.push(item.Name);
    }
}
function isSelectedTechItem(id: string) {
    return filterTech.includes(id);
}
function filterByTech(value: string[]) {
    isFetching.value = true;
    filteredMembers.value = filteredByRoleCache.filter((mem) => {
        return value.every((techKey) => {
            return getTechIndex(techKey) in mem.tech;
        });
    });
    isFetching.value = false;
}
function getTechForDisplay(userTech: TechLevels) {
    if (filterTech.length) {
        const result = {};

        const levels = Object.fromEntries(
            filterTech
                .map((k) => [k, userTech[getTechIndex(k)][0]]) // I'm sure filterTech these indexes exist
                .sort(([, a], [, b]) => b - a)
                .slice(0, DISPLAY_USER_TECH_ITEMS),
        );

        // eslint-disable-next-line guard-for-in
        for (const key in levels) {
            const val = result[key] = {
                icon: { dir: '', name: '' },
                level: levels[key],
            };

            if (key in modulesData) {
                val.icon.dir = 'game/Modules';
                val.icon.name = modulesData[key].Icon;
            } else if (key in shipsData) {
                val.icon.dir = 'game/Ships';
                val.icon.name = shipsData[key].Model[5]; // eslint-disable-line prefer-destructuring
            } else {
                val.icon.dir = 'game/SpaceBuildings';
                val.icon.name = spaceBuildingsData[key].PrefabModel;
            }
        }
        return result;
    }
}
</script>

<style scoped lang="scss">
@use "sass:map";

@import "../style/vars";
@import "../style/userInput";

.container {
    max-width: 680px;
    margin: 2% auto 0;
}

.wrap-tech-list {
    :deep(.other) {
        section[name="alliance"] {
            display: none;
        }
    }
    :deep(.item .mute) {
        border: solid 2px #a8ddfd;
        padding: 2px;
        border-radius: 10px;
    }
}

.filter {
    display: flex;
    justify-content: space-between;


    select, .btn-tech-filter {
        font-size: 110%;
        background-color: $background-elements;
        border-color: $border-color;
        border-style: solid;
        border-radius: 5px;
        padding: 5px;
        cursor: pointer;

        &:hover {
            background-color: #32474d;
        }
    }
}

.members-list {
    margin-top: 2%;
    padding: 0 2%;

    .member {
        list-style: none;
        background-color: $background-elements;
        margin: 1% 0;
        padding: 2%;
        border-radius: 10px;
        display: flex;
        justify-content: space-between;

        .meta {
            display: flex;
            align-items: center;
            gap: 2%;

            .avatar {
                width: 40px;
                height: 40px;

                img {
                    width: 100%;

                    &:before  {
                        width: 100%;
                        height: 100%;
                        content: "";
                        background: url("@Img/icons/member.png") center 100% no-repeat;
                    }
                }
            }
        }

        .sort-tech ul {
            display: flex;
            gap: 20px;
            justify-content: center;
            align-items: center;

            li {
                list-style: none;
                width: 40px;
                margin: 12px;
                cursor: pointer;
                position: relative;

                @media screen and (max-width: 960px){
                    margin: 6px;
                }

                .level {
                    position: absolute;
                    top: 75%;
                    right: 0;
                    font-size: 80%;
                    width: 20px;
                    height: 19px;
                    background-color: $border-color;
                    color: $background;
                    text-align: center;
                    border-radius: 5px;
                    padding-top: 2px;
                }
            }
        }
    }
}

.animated-fetch {
    .member {
        background: linear-gradient(to left, $background, $background-elements 18%, $background);
        background-size: 50vw;
        animation: bg-pos-move 10s infinite forwards linear;
        opacity: .8;
        pointer-events: none;
    }
}

@keyframes bg-pos-move {
    to { background-position: 1000% 0; }
}
</style>
