<template>
  <div>
    <ul class="list">
      <li
        v-for="({key}) of items"
        :key="key"
      >
        <div v-if="key in matches">
          <p class="corp-names">
            <span>{{ matches[key].Corporation1Name }}</span>
            <span class="vs-icon" />
            <span>{{ matches[key].Corporation2Name }}</span>
          </p>
          <p class="score">
            <span>{{ matches[key].Corporation1Score }}</span>
            <span> - </span>
            <span>{{ matches[key].Corporation2Score }}</span>
          </p>
          <p v-if="(matches[key].DateEnded - nowDate) > 0">
            <!--suppress TypeScriptValidateTypes -->
            <span>{{ $t('TID_WS_PREPARATION_ENDS_IN', [sec2str((matches[key].DateEnded - nowDate) / 1000)]) }}</span>
          </p>
          <p
            v-else
            v-t="'TID_WS_ENDED'"
          />
        </div>
        <div
          v-else
          class="match-fetching"
        >
          <p class="corp-names">
            <span />
            <span class="vs-icon" />
            <span />
          </p>
          <p><span /></p>
          <p><span /></p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive } from 'vue';
import sec2str from '@Utils/sec2str';

const API_ENDPOINT = 'https://add-cors-to-requests.userxinos.workers.dev/https://storage.googleapis.com/hades-star-public-xq8f-d4rg-v0d9/';
interface Item {
    key: string
    generation: string
    metaGeneration: string
    lastModified: Date
    etag: string
    size: number
}
interface Match {
    Corporation1Name: string
    Corporation1Id: string
    Corporation2Name: string
    Corporation2Id: string
    Corporation1Score: string
    Corporation2Score: string
    DateEnded: string
}

const nowDate = new Date();
const items = reactive<Item[]>([]);
const matches = reactive<Record<Item['key'], Match>>({});

onMounted(async () => {
    const resp = await fetch(API_ENDPOINT).then((response) => response.text());
    const parsed = new DOMParser().parseFromString(resp, 'text/xml');

    for (const child of parsed.firstElementChild.children) {
        if (child.localName == 'Contents') {
            items.push({
                key: child.children[0].textContent,
                generation: child.children[1].textContent,
                metaGeneration: child.children[2].textContent,
                lastModified: new Date(child.children[3].textContent),
                etag: child.children[4].textContent,
                size: parseInt(child.children[5].textContent),
            });
        }
    }
    // items.splice(10);
    fetchMatch(0);
});

function fetchMatch(startIndex: number): void {
    items.slice(startIndex).forEach(({ key }) => {
        fetch(new URL(key, API_ENDPOINT)).then(async (resp) => {
            const json = await resp.json();

            matches[key] = {
                ...json,
                Corporation1Score: parseInt(json.Corporation1Score),
                Corporation2Score: parseInt(json.Corporation2Score),
                DateEnded: new Date(json.DateEnded),
            };
        });
    });
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
