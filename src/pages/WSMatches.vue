<template>
  <div>
    <Pagination
      v-model="page"
      :max-page="response?.MaxPage || 1"
    />

    <ul class="list">
      <li
        v-for="match of matches"
        :key="genKey(match)"
      >
        <div>
          <p class="corp-names">
            <span>{{ match.Corp1Name }}</span>
            <span class="vs-icon" />
            <span>{{ match.Corp2Name }}</span>
          </p>
          <p class="score">
            <span>{{ match.Corp1Score }}</span>
            <span> - </span>
            <span>{{ match.Corp2Score }}</span>
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
          href="https://mentalisit.sytes.net:8443/wsmatches"
          target="_blank"
        >mentalisit.sytes.net:8443</a>
          API
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import sec2str, { sec2biggestTime } from '@Utils/sec2str';
import Pagination from '@/components/Pagination.vue';

const API_ENDPOINT = new URL('https://mentalisit.sytes.net:8443/wsmatches');
API_ENDPOINT.searchParams.set('limit', '50');

interface Response {
    MaxPage: number,
    matches: Match[]
}
interface Match {
    Corp1Name: string
    Corp2Name: string
    Corp1Score: string
    Corp2Score: string
    DateEnded: Date
}

const nowDate = new Date();
const response = ref<Response>();
const matches = computed<Match[]>(() =>
    (response.value?.matches || []).map((e) => ({ ...e, DateEnded: new Date(e.DateEnded) })),
);
const page = ref(1);

watch(page, () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    updateData();
}, { immediate: true });

function genKey(match: Match) {
    return `${match.Corp1Name}${match.Corp2Name}${match.DateEnded.toString()}`;
}
async function updateData() {
    API_ENDPOINT.searchParams.set('page', page.value.toString());
    response.value = await fetch(API_ENDPOINT)
        .then((r) => r.json());
}
</script>

<style scoped lang="scss">
@import "../style/vars";

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
        font-size: 150%;

         span {
           color: $border-color;
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
