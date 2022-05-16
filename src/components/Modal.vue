<template>
  <div>

    <teleport
      :disabled="!open"
      to="#modals"
    >
      <transition name="background">
        <div
          v-if="open"
          class="background fixed"
        />
      </transition>
    </teleport>

    <teleport
      :disabled="!open"
      to="#modals"
    >
      <transition name="content-wrapper">
        <div
          v-if="open"
          class="content-wrapper fixed"
          @click.self="onClose"
        >

          <slot name="default">
            <div :class="['content', `size-${size}`]">

              <div class="head">
                <div
                  class="close-button"
                  @click="onClose"
                />
                <slot name="head">
                  <h2> {{ title }} </h2>
                </slot>
              </div>

              <div class="body">
                <slot name="body" />
              </div>

            </div>
          </slot>

        </div>
      </transition>
    </teleport>

  </div>
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
        open: {
            type: Boolean,
            requested: true,
            default: false,
        },
        size: {
            type: String,
            default: SIZES.medium,
        },
        title: {
            type: String,
            default: undefined,
        },
    },
    emits: ['update:open'],
    watch: {
        open() {
            if (this.open) {
                const scrollBarWidth = window.innerWidth - document.body.offsetWidth;

                document.documentElement.setAttribute('no-scroll', '');
                document.documentElement.style.setProperty('--scroll-bar-width', `${scrollBarWidth}px`);
            } else {
                document.documentElement.removeAttribute('no-scroll');
                document.documentElement.style.removeProperty('--scroll-bar-width');
            }
        },
    },
    created() {
        this.$router.beforeResolve( () => {
            if (this.open) {
                this.onClose();
                return false;
            }
        });
    },
    methods: {
        onClose() {
            this.$emit('update:open', false);
        },
    },
};
</script>

<style scoped lang="scss">
@import "../style/vars";

$mv: 1000px;
$border-color: #aee3fc;

.fixed {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 5;
    width: 100%;
    height: 100%;
}

.background {
    background-color: rgba(0, 0, 0, 0.6);

    &-enter-active, &-leave-active {
        transition: background-color 0.5s linear;
    }

    &-enter-from, &-leave-to {
        background-color: rgba(0, 0, 0, 0.0);

    }
}

.content-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;

    .content {
        background: $background;
        border: $border-color solid 3px;
        justify-self: center;
        border-radius: 5px;

        &.size {
            &-MEDIUM {
                width: 90%;
                height: 80%;
                max-width: 500px;
            }
        }

        .head {
            padding-bottom: 5%;
            position: relative;

            .close-button {
                position: absolute;
                right: 0;
                background: url(../img/icons/close.svg) no-repeat;
                width: 62px;
                height: 40px;
                margin-top: -2px;
                cursor: pointer;
            }
            h2 {
                padding-top: 15px;
            }
        }

        .body {
            padding: 5%;
        }
    }

    &-enter-active, &-leave-active {
        transform: scale(1);
        transition: 700ms ease, transform 350ms
    }
    &-enter-from, &-leave-to {
        transform: scale(0.6);
        transition: 550ms ease, transform 300ms;
    }
    &-leave-to {
        opacity: 0;
        transition: 550ms ease, opacity 200ms;
    }
}
</style>
