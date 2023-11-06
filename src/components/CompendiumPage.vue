<template>
  <div>

    <div class="header">
      <div class="content">
        <div
          v-if="isFetching && !user"
          class="logged fetching"
        >
          <div class="avatar">
            <img
              :src="memberImage"
              alt="memberImage avatar"
            ></div>
          <p />
        </div>
        <div
          v-if="user"
          class="logged"
        >
          <div class="avatar">
            <img
              :src="getAvatarUrl(user.id, user.avatar)"
              :alt="`${user.username} avatar`"
              @error="(e) => e.target.src = memberImage"
            ></div>
          <p>{{ user.username }}</p>
        </div>
        <div
          v-if="!isFetching && !user"
          class="not-logged"
        >
          <span>{{ 'Not logged' }}</span>
          <button
            class="button accent"
            @click="openCodeReqModal = true"
          > {{ 'login' }}
          </button>
        </div>
      </div>
    </div>

    <slot />

    <div class="footer">
      <div class="content">
        <p>Powered by <a
          href="https://hs-compendium.com/"
          target="_blank"
        >HS Compendium</a></p>
      </div>
    </div>

    <Modal
      v-model:open="openCodeReqModal"
      :title="'Code'"
      :size="SIZES.SMALL"
    >
      <template #body>
        <div class="input">
          <p class="name">
            <span>Code</span>
            <span class="error-msg">{{ error }}</span>
          </p>
          <input v-model="reqCode">
        </div>

        <div
          class="code-req-btn-wrap"
          :class="{'disable': isFetching}"
        >
          <button
            v-t="'TID_OK'"
            class="button accent"
            @click="applyReqCode"
          />
        </div>
      </template>
    </Modal>

    <Confirm @setShow="(func) => {userConfirm = func;}" />

  </div>
</template>

<!--suppress TypeScriptCheckImport -->
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { Identity, User } from 'bot_client';

import client, { init as clientInit } from '@Utils/compendium';
import getAvatarUrl from '@Utils/getDiscordAvatarUrl';
import memberImage from '@Img/icons/member.png';

import Modal, { SIZES } from '@/components/Modal.vue';
import Confirm from '@/components/TheConfirm.vue';

const REQ_CODE_PATTERN = /[a-zA-Z0-9]{4}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{4}/;
const openCodeReqModal = ref(false);
const reqCode = ref('');
const error = ref('');
const isFetching = ref(false);
const user = ref<User|null>(null);

let userConfirm: (q: string) => Promise<void> = (() => Promise.prototype); // eslint-disable-line prefer-const

onMounted(async () => {
    isFetching.value = true;
    await clientInit();
    const u = client.getUser();
    isFetching.value = false;

    if (!u) {
        openCodeReqModal.value = true;
    } else {
        user.value = u;
    }
});

async function applyReqCode() {
    let ident: Identity;

    if (!reqCode.value) {
        error.value = 'Cannot be empty';
        return;
    }
    if (!REQ_CODE_PATTERN.test(reqCode.value)) {
        error.value = 'Incorrect code';
        return;
    }
    isFetching.value = true;

    try {
        ident = await client.checkConnectCode(reqCode.value);
    } catch (e) {
        error.value = e.toString();
        console.error(e);
        isFetching.value = false;
        return;
    }

    isFetching.value = false;
    openCodeReqModal.value = false;

    const drop = await userConfirm(`Confirm your login from ${ident.guild.name} as ${ident.user.username}`)
        .catch(() => {
            openCodeReqModal.value = true;
            return true;
        });

    if (!drop) {
        isFetching.value = true;
        await client.connect(ident);
        user.value = client.getUser() as User;
        isFetching.value = false;
    }
}
</script>


<style scoped lang="scss">
@import "../style/userInput";

.header {
  margin-top: 1%;

  @media screen and (max-width: 1000px){
    margin-top: 2%;
  }

  .content {
    margin: 0 5%;
    display: flex;
    justify-content: end;

    @media screen and (max-width: 1000px){
      margin: 0 1%;
    }

    .logged, .not-logged {
      display: flex;
      align-items: center;
      padding: 0.5%;
      min-width: 15%;
      border-radius: 10px;
    }

    .fetching {
      background: linear-gradient(to left, $background, $background-elements 18%, $background);
      background-size: 40vw;
      animation: bg-pos-move 5s infinite forwards linear;
      opacity: .8;
      pointer-events: none;

      p {
        border: solid 5px #8a9396;
        width: 200px;
        border-radius: 10px;
      }
    }

    .logged {
      display: flex;
      align-items: center;
      gap: 2%;
      border: solid 2px $background-elements;

      .avatar {
        width: 15%;
        margin-right: 4%;

        img {
          width: 100%;

          &:before  {
            //width: 40%;
            content: "";
            background: url("@Img/icons/member.png") center 100% no-repeat;
          }
        }
      }
    }
    .not-logged {
      background-color: #b94054;
      justify-content: space-between;

      span {
        font-size: 120%;
      };
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
.code-req-btn-wrap {
  display: flex;
  justify-content: end;
}
.error-msg {
  font-size: 70%;
  color: red;
  margin-left: 10px;
  font-style: italic;
}
.disable {
  opacity: .4;
  cursor: not-allowed;
  pointer-events: none;
}

@keyframes bg-pos-move {
  to { background-position: 1000% 0; }
}
</style>
