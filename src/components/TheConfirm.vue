<template>
  <modal
    title="Confirm"
    :open="show"
    @update:open="modalUpdate"
  >
    <transition>
      <div class="wrap">
        <div
          v-if="show"
          class="container"
        >
          {{ text }}
          <div class="buttons">
            <button
              v-t="'TID_CANCEL'"
              @click="close(defeat)"
            />
            <button
              v-t="'TID_OK'"
              @click="close(confirm)"
            />
          </div>
        </div>
      </div>
    </transition>
  </modal>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useStore } from 'vuex';
import Modal from '@/components/Modal.vue';

import types from '@/store/types';

const store = useStore();
const text = ref('');
const show = ref(false);
let confirm: (value?: unknown) => void;
let defeat: (reason?: unknown) => void;

store.dispatch(types.REGISTER_CONFIRM, open);

function modalUpdate() {
    close(defeat);
}
function open(t: string) {
    show.value = true;
    text.value = t;

    return new Promise(((resolve, reject) => {
        confirm = resolve;
        defeat = reject;
    }));
}
function close(cb: (v?: unknown) => void) {
    cb();
    show.value = false;
    confirm = () => null;
    defeat = () => null;
}
</script>

<style scoped lang="scss">
@import "../style/vars";

$accent-color: #aee3fc;

.wrap {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    pointer-events: none;
    z-index: 1;

    @media screen and (max-width: 1000px){
        align-items: center;
    }

    .container {
        background: $background;
        border: $accent-color solid 1px;
        border-radius: 10px;
        pointer-events: all;
        height: 15%;
        width: 80%;
        max-width: 450px;
        max-height: 120px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 20px 20px;
        font-size: 20px;
        margin-top: 10%;

        .buttons {
            display: flex;
            justify-content: flex-end;

            button {
                height: 40px;
                width: 80px;
                font-size: 80%;
                margin: 0 1%;
                border-radius: 10px;
                cursor: pointer;
                border-style: solid;

                &:first-child {
                    background: none;
                    border-color: $accent-color;
                    color: $accent-color;
                }
                &:last-child {
                    background-color: $accent-color;
                    border-color: $accent-color;
                    color: $background;
                }
            }
        }
    }
}

//.v-enter-active, .v-leave-active {
//
//}
//.v-enter-from, .v-leave-to {
//
//}

</style>
