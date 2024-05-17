<template>
  <div>

    <div class="filters">
      <div>
        <p
          v-t="'TID_OTHER_PLAYER_INFO_PAGE_CORP_SECTION'"
          class="label"
        />
        <MultiSelect
          v-model="filterCorp"
          :options="corps"
          display-field="Name"
        />
      </div>
    </div>

    <Pagination
      v-model="page"
      :max-page="response?.MaxPage || 1"
    />

    <ul class="list">
      <li
        v-for="match of matches"
        :key="match.MatchId"
      >
        <div>
          <p class="corp-names">
            <span>{{ match.Corporation1Name }}</span>
            <span class="vs-icon" />
            <span>{{ match.Corporation2Name }}</span>
          </p>
          <p class="score">
            <span class="corp-info">{{ getCorpStat(match.Corporation1Id) }}</span>
            <span>{{ match.Corporation1Score }}</span>
            <span> - </span>
            <span>{{ match.Corporation2Score }}</span>
            <span class="corp-info">{{ getCorpStat(match.Corporation2Id) }}</span>
          </p>
          <p v-if="(match.DateEnded - nowDate) > 0">
            <!--suppress TypeScriptValidateTypes -->
            <span>{{ $t('TID_WS_PREPARATION_ENDS_IN', [sec2str((match.DateEnded - nowDate) / 1000)]) }}</span>
          </p>
          <p v-else>
            <!--suppress TypeScriptValidateTypes -->
            <span>
              {{ $t('TID_WS_ENDED') }}
              {{ `(${$t('TID_SOCIAL_TIMESTAMP', [sec2biggestTime((nowDate - match.DateEnded) / 1000)])})` }}
            </span>
          </p>
        </div>
      </li>
    </ul>

    <Pagination
      v-model="page"
      :max-page="response?.MaxPage || 1"
    />

    <div class="footer">
      <div class="content">
        <p>Powered by <a
          href="https://ws.mentalisit.myds.me"
          target="_blank"
        >ws.mentalisit.myds.me</a>
          API
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import sec2str, { sec2biggestTime } from '@Utils/sec2str';
import Pagination from '@/components/Pagination.vue';
import MultiSelect from '@/components/MultiSelect.vue';

interface Response<T> {
    MaxPage: number
    matches: T[]
}
interface Match {
    Corporation1Name: string
    Corporation2Name: string
    Corporation1Score: number
    Corporation2Score: number
    DateEnded: Date
    MatchId: string
}
interface Corp {
    Name: string
    Id: string
}

const API_ENDPOINT = 'https://ws.mentalisit.myds.me/';
const matchesUrl = new URL('matches', API_ENDPOINT);
const corpUrl = new URL('corps', API_ENDPOINT);

const nowDate = new Date();
const response = ref<Response<Match>>();
const corps = ref<Corp[]>([]);
const matches = computed<Match[]>(() =>
    (response.value?.matches || []).map((e) => ({ ...e, DateEnded: new Date(e.DateEnded) })),
);
const page = ref(1);
const filterCorp = ref([]);

matchesUrl.searchParams.set('limit', '50');

watch(page, () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    matchesUrl.searchParams.set('page', page.value.toString());
    fetchData();
}, { immediate: true });

watch(filterCorp, () => {
    if (filterCorp.value.length == 0) {
        matchesUrl.searchParams.delete('filter');
    } else {
        matchesUrl.searchParams.set('filter', JSON.stringify({ corp: filterCorp.value }));
    }
    page.value = 1;
    fetchData();
}, { deep: true });

onMounted(async () => {
    corps.value = await fetch(corpUrl)
        .then((r) => r.json())
        .then((j) => j.matches);
});

async function fetchData() {
    response.value = await fetch(matchesUrl)
        .then((r) => r.json());
}
function getCorpStat(id: string) {
    const corp = corps.value.find((e) => e.Id == id);

    if (corp) {
        const [w, l, d, e] = Object.entries(corp)
            .filter(([k]) => !['Name', 'Id'].includes(k))
            .map(([, v]) => v);
        return `[W:${w}/L:${l}/D:${d}/E:${e}]`;
    }
}
</script>

<style scoped lang="scss">
@import "../style/vars";

.filters {
    padding: 20px 0;
   display: flex;
    align-items: center;
    justify-content: center;

    .label {
        padding: 10px 0;
    }

    .multiselect {
        width: 300px;
        background: $background-elements;

        :deep(.multiselect_btn) {
            border: 2px solid $border-color;
            border-radius: 5px;
        }
    }
}
.list {
  margin: 2% auto;
  max-width: 400px;

  li {
    list-style: none;
    margin: 2% 0;

    > div {
      background-color: $background-elements;
      width: 100%;
      text-align: center;
      border-radius: 10px;
      padding: 1% 0;

      p {
        margin: 2% 0;
      }

      .score {
          display: flex;
          align-items: start;
          justify-content: center;
          gap: 8px;

         span:not(.corp-info) {
             font-size: 150%;
             color: $border-color;
         }
          span.corp-info {
              font-size: 90%;

          }
      }

      .corp-names {
        display: flex;

        span:not(.vs-icon) {
          flex: 1;

          &:first-child {
            text-align: right;
          }
          &:last-child {
            text-align: left;
          }
        }

        .vs-icon {
          background: url("@Img/game/Stars/star_white.png") center no-repeat;
          background-size: 100% auto;
          padding: 10px;
          margin: 0 4%;
        }
      }
    }
  }
}

.footer {
    .content {
        max-width: max-content;
        margin: 0 auto;

        p {
            padding: 10px;
            text-align: center;
        }
    }
}

.match-fetching {
  background: linear-gradient(to left, $background, $background-elements 18%, $background);
  background-size: 50vw;
  animation: bg-pos-move 10s infinite forwards linear;
  opacity: .8;
  pointer-events: none;
  height: 108px;

  p:not(.corp-names) {
    display: flex;
    height: 20px;
    padding: 0 30%;

    span {
      flex: 1;
      background-color: #2e3f45;
      border-radius: 10px;
    }
  }
  .corp-names {
    padding: 0 10%;

    span {
      background-color: #2e3f45;
      border-radius: 10px;
    }
  }
}

@keyframes bg-pos-move {
  to { background-position: 1000% 0; }
}
</style>
