<template>
  <Modal
    :open="isOpen"
    :size="modalSize"
    :title="titleKey ? $t(titleKey) : null"
    @update:open="$emit('close')"
  >
    <template #body>
      <p class="ver">{{ $t('CURRENT_VERSION') }}: {{ version }}</p>
      <vue-markdown
        :source="text"
        class="content"
      />
    </template>
  </Modal>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

import Modal, { SIZES } from '@/components/Modal.vue';
import VueMarkdown from 'vue-markdown-render';

export default defineComponent({
    name: 'Changelog',
    components: { VueMarkdown, Modal },
    props: {
        isOpen: {
            type: Boolean,
            required: true,
        },
        titleKey: {
            type: String,
            default: 'UPDATED',
        },
    },
    emits: ['close'],
    setup() {
        return {
            text: ref(''),
            modalSize: SIZES.LARGE,
            version: process.env.VERSION,
        };
    },
    mounted() {
        import('../../CHANGELOG.md').then((m) => this.text = m.default);
    },
});
</script>

<style scoped lang="scss">
@import "../style/vars";

$mv: 1000px;

.ver {
    padding-bottom: 1%;
    font-size: 120%;
}
div.content {
    @media screen and (max-width: $mv){
        font-size: 70%;
    }

    ::v-deep(h2)  {
        padding-top: 1%;
    }
    ::v-deep(h3)  {
        padding-top: 0.5%;
        padding-left: 1%;
    }

    ::v-deep(ul)  {
        padding-left: 2%;
    }
}
</style>
