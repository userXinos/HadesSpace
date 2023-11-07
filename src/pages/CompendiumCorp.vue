<template>
  <div>
    <CompendiumPage>
      <div class="container">
        <div
          class="filter"
          :class="{'disable': filteredMembers.length > filteredByRoleCache.length}"
        >
          <div>
            <button
              v-t="'FILTER'"
              class="btn-tech-filter"
              @click="openSelectorByTech = true"
            />
          </div>
          <div class="select">
            <select
              @change="filterRoleId = $event.target.value"
            >
              <option
                v-for="role in data.roles"
                :key="role.id"
                :value="role.id"
                :selected="filterRoleId == role.id"
              > {{ role.name }}
              </option>
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
            @click="memberClick(mem)"
          >
            <div class="meta">
              <div class="avatar">
                <img
                  :src="getDiscordAvatarUrl(mem.userId, mem.avatar)"
                  :alt="`${mem.name} avatar`"
                  @error="(e) => e.target.src = memberImage"
                ></div>
              <p>{{ mem.name }}</p>
            </div>
            <div class="sort-tech">
              <ul>
                <li
                  v-for="(elem, k) in getTechForDisplay(mem)"
                  :key="k"
                >
                  <div>
                    <Icon
                      :name="elem.icon.name"
                      :dir="elem.icon.dir"
                    />
                    <span
                      :k="k"
                      class="level"
                    >
                      {{ elem.level }}
                    </span>
                  </div>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
    </CompendiumPage>

    <Modal
      v-model:open="openSelectorByTech"
      :title="'Code'"
      :size="SIZES.LARGE"
    >
      <template #body>
        <div class="modal-filter-tech">
          <button
            class="button accent"
            @click="filterTech.splice(0)"
          >{{ $t('RESET_ALL') }}</button>

          <div class="sections-group other">
            <section
              class="type"
              name="user-info"
            >
              <h3 v-t="'TID_OBJECT_ACTION_PLAYER_INFO'" />
              <ul>
                <li
                  v-for="({icon}, key) of userInfo"
                  :key="key"
                  class="item"
                >
                  <div
                    :class="{'mute': isSelectedTechItem(key)}"
                    @click="() => techItemClick({Name: key})"
                  >
                    <Icon
                      :name="icon.name"
                      :dir="icon.dir"
                    />
                  </div>
                </li>
              </ul>
            </section>
          </div>
          <TechList
            :on-click="techItemClick"
            :is-muted="isSelectedTechItem"
          />
        </div>
      </template>
    </Modal>

    <Modal
      v-model:open="openMemTechList"
      :title="modalMem.title"
      :size="SIZES.LARGE"
    >
      <template #body>
        <TechList
          :level-map="modalMem.lvlMap"
        />
      </template>
    </Modal>

  </div>
</template>

<!--suppress TypeScriptCheckImport, TypeScriptUnresolvedReference -->
<script setup lang="ts">
import { CorpData, CorpMember, getTechIndex } from 'bot_client';
import { onMounted, reactive, Ref, ref, watch } from 'vue';

import { getDiscordAvatarUrl } from '../utils/getDiscordUrl';
import client from '../utils/compendium';

import Modal, { SIZES } from '@/components/Modal.vue';
import Icon from '@/components/Icon.vue';
import TechList from '@/components/CompendiumTechList.vue';
import CompendiumPage from '../components/CompendiumPage.vue';

import memberImage from '@Img/icons/member.png';
import shipsData from '@Data/capital_ships.js';
import spaceBuildingsData from '@Data/spacebuildings.js';
import modulesData from '@Data/modules.js';
import objectArrayify from '../utils/objectArrayify';
import { getTechFromIndex } from 'bot_client/src/module_types';

const DISPLAY_USER_TECH_ITEMS = 5;
const MAX_ITEMS_PAGE = 50;

interface UserInfo {
  [k: string]: {
    icon: Icon.Props,
    formatter: (user: CorpMember) => string
      check: (user: CorpMember) => boolean
  }
}

const userInfo: UserInfo = {
    LocalTime: {
        icon: { name: 'time', dir: 'icons/compendium' },
        check: (user) => user.timeZone,
        formatter: ({ timeZone }) => (
            timeZone.startsWith('UTC') ? timeZone :
                new Date().toLocaleString(undefined, { timeZone: timeZone, timeStyle: 'short' })
        ),
    },
    AfkFor: {
        icon: { name: 'afk', dir: 'icons/compendium' },
        check: (user) => user.afkFor,
        formatter: ({ afkFor }) => afkFor,
    },
    CargoCap: {
        icon: { name: 'cargo', dir: 'icons/compendium' },
        check: ({ tech }) => tech[getTechIndex('Transport')]?.[0] && tech[getTechIndex('TransportCapacity')]?.[0],
        formatter: ({ tech }) => {
            const [t] = tech[getTechIndex('Transport')];
            const [cap] = tech[getTechIndex('TransportCapacity')];

            if (t && cap) {
                return shipsData.Transport.JobCapacity[t] + modulesData.TransportCapacity.ExtraTradeSlots[cap];
            }
            return 0;
        },
    },
} as UserInfo;
const isFetching = ref(false);
const openSelectorByTech = ref(false);
const openMemTechList = ref(false);
const filterRoleId = ref<string>('');
const filterTech = reactive<string[]>([]);
const data: Ref<CorpData> = ref({});
const filteredMembers: Ref<CorpMember[]> = ref([]);
const modalMem = reactive({
    title: '',
    lvlMap: undefined,
});

let filteredByRoleCache: CorpMember[] = [];

filteredMembers.value = Array.from({ length: 10 }, (i) => ({ userId: i, name: '', avatarUrl: '' }) as CorpMember);

client.on('connected', () => fetchCorp());
client.on('disconnected', () => {
    filteredByRoleCache = [];
    filteredMembers.value = Array.from({ length: 10 }, (i) => ({ userId: i, name: '', avatarUrl: '' }) as CorpMember);
    filterRoleId.value = '';
    filterTech.splice(0);
});
onMounted(() => {
    if (client.getUser()) {
        fetchCorp();
    }
});

watch(filterRoleId, async (value) => {
    isFetching.value = true;
    filteredByRoleCache = await client.corpdata(value).then((r) => r.members);
    filteredMembers.value = filteredByRoleCache;
    isFetching.value = false;
    filterByTech(filterTech);
});
watch(() => filterTech, filterByTech, { deep: true });


async function fetchCorp() {
    isFetching.value = true;
    const resp = await client.corpdata();

    data.value = resp;
    filteredByRoleCache = resp.members;
    filteredMembers.value = resp.members.slice(0, MAX_ITEMS_PAGE);
    isFetching.value = false;
}
async function techItemClick(item: object) {
    if (isSelectedTechItem(item.Name)) {
        filterTech.splice(filterTech.indexOf(item.Name), 1);
    } else {
        filterTech.push(item.Name);
    }
}
function isSelectedTechItem(id: string) {
    return filterTech.includes(id);
}
function memberClick(mem: CorpMember) {
    if (filteredByRoleCache.length) {
        modalMem.title = mem.name;
        // noinspection TypeScriptValidateTypes
        modalMem.lvlMap = objectArrayify(mem.tech, {
            map: ([k, v]) => [getTechFromIndex(k), v[0]],
        });
        openMemTechList.value = true;
    }
}
function filterByTech(value: string[]) {
    filteredMembers.value = filteredByRoleCache
        .filter((mem) => {
            return value.every((fK) => {
                return mem.tech[getTechIndex(fK)]?.[0] || userInfo[fK]?.check(mem);
            });
        })
        .slice(0, MAX_ITEMS_PAGE);
}
function getTechForDisplay(member: CorpMember): Record<string, {level: number|string, icon :Icon.Props}> {
    if (!filterTech.length) {
        return {};
    }
    const result = {};

    const levels = Object.fromEntries(
        filterTech
            .map((k) => {
                if (k in userInfo) {
                    return [k, userInfo[k].formatter(member)];
                }
                return [k, member.tech[getTechIndex(k)][0]];
            })
            .sort(([, a], [, b]) => b - a)
            .slice(0, DISPLAY_USER_TECH_ITEMS),
    );

    // eslint-disable-next-line guard-for-in
    for (const key in levels) {
        const val = result[key] = {
            icon: { dir: '', name: '' } as Icon.Props,
            level: levels[key],
        };

        if (key in modulesData) {
            val.icon.dir = 'game/Modules';
            val.icon.name = modulesData[key].Icon;
        } else if (key in shipsData) {
            val.icon.dir = 'game/Ships';
            val.icon.name = shipsData[key].Model[5]; // eslint-disable-line prefer-destructuring
        } else if (key in userInfo) {
            val.icon = userInfo[key].icon;
        } else {
            val.icon.dir = 'game/SpaceBuildings';
            val.icon.name = spaceBuildingsData[key].PrefabModel;
        }
    }
    return result;
}
</script>

<style scoped lang="scss">
@import "../style/vars";
@import "../style/userInput";
@import "../style/CompendiumTechList";

.container {
  max-width: 680px;
  margin: 2% auto 0;
}

.modal-filter-tech {
  .button {
    margin-bottom: 1%;

    @media screen and (max-width: 600px){
      font-size: 70%;
    }
  }
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
  padding: 0 2%;
  gap: 5%;


  .btn-tech-filter {
    font-size: 130%;
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
    cursor: pointer;

    &:hover {
      background-color: #27353a;
    }

    .meta {
      display: flex;
      align-items: center;
      flex: 2;

      p {
        margin-left: 15px;
      }

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
      flex: 3;
      display: flex;
      justify-content: center;

      li {
        list-style: none;
        width: 50px;
        margin: 0 5px;
        cursor: pointer;
        position: relative;

        @media screen and (max-width: 960px){
          width: 30px;
        }
        @media screen and (max-width: 350px){
          width: 25px;
        }

        .level {
          position: absolute;
          top: 60%;
          right: 0;
          font-size: 80%;
          width: 15px;
          height: 15px;
          background-color: $border-color;
          color: $background;
          text-align: center;
          border-radius: 5px;
          padding-top: 2px;
        }

        & [k="LocalTime"] {
          width: 36px;
          right: -8px;
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
