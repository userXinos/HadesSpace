<template>
  <teleport
    :disabled="!isOpen"
    to="#modals"
  >
    <div
      v-show="isOpen"
      class="layer"
    >

      <transition
        key="layer-background"
        name="background"
      >
        <div
          v-if="isOpen"
          class="background"
          @click.self="onClose"
        />
      </transition>

      <transition
        key="layer-content"
        name="content"
      >
        <div
          v-if="isOpen"
          key="modal-children"
          :class="['content', `size-${size}`]"
        >
          <div class="head"><h2><slot name="head" /></h2></div>
          <div class="body"><slot name="body" /></div>

        </div>
      </transition>

    </div>

  </teleport>
</template>

<script>
export const SIZES = {
    small: 'SMALL',
    medium: 'MEDIUM',
    large: 'LARGE',
};

export default {
    name: 'Modal',
    props: {
        isOpen: {
            type: Boolean,
            requested: true,
            default: false,
        },
        onClose: {
            type: Function,
            requested: true,
            default: () => null,
        },
        size: {
            type: String,
            requested: true,
            default: SIZES.medium,
        },
    },
    updated() {
        document.documentElement.style.overflow = (this.isOpen) ? 'hidden' : 'auto';
    },
};
</script>

<style scoped lang="scss">
@import "../style/vars";

$mv: 1000px;

.layer {
    display: grid;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 5;
    height: 100%;
    width: 100%;
    align-items: center;

    .background, .content {
        grid-column: 1;
        grid-row: 1;
    }
    .background {
        height: 100%;
        width: 100%;
        background-color: rgba(0, 0, 0, 0.8);

        &-enter-active, &-leave-active {
            transition: background-color 0.5s linear;
        }

        &-enter-from, &-leave-to {
            background-color: rgba(0, 0, 0, 0.0);

        }
    }

    .content {
        background: $background;
        border: $border-color solid 2px;
        justify-self: center;

        &.size {
            &-MEDIUM {
                width: 90%;
                height: 80%;
                max-width: 500px;
            }
        }

        .head h2 {
            padding-top: 30px;
            padding-bottom: 20px;
        }

        .body {
            padding: 5%;
        }

        &-enter-active, &-leave-active {
            transform: scale(1);
            transition: 700ms ease, transform 350ms
        }
        &-enter-from {
            transform: scale(0.6);
            transition: 550ms ease, transform 300ms
        }
    }

}
</style>
