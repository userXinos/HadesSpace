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

<script lang="ts">
import { defineComponent } from 'vue';
import Modal from '@/components/Modal.vue';

export default defineComponent({
    name: 'Confirm',
    components: { Modal },
    emits: ['setShow'],
    data() {
        return {
            text: '',
            show: false,
            confirm: (() => null) as (value: unknown) => void|null,
            defeat: (() => null) as () => void|null,
        };
    },
    created() {
        this.$emit('setShow', this.open.bind(this));
    },
    methods: {
        modalUpdate() {
            this.close(this.defeat);
        },
        open(text: string) {
            this.show = true;
            this.text = text;

            return new Promise(((resolve, reject) => {
                this.confirm = resolve;
                this.defeat = reject;
            }));
        },
        close(cb: (v?: unknown) => void) {
            cb();
            this.show = false;
            this.confirm = () => null;
            this.defeat = () => null;
        },
    },

});
</script>

<style scoped lang="scss">
@import "../style/vars";

$accent-color: #aee3fc;

.wrap {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 5;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    pointer-events: none;

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
