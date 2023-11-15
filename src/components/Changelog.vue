<template>
  <Modal
    :open="isOpen"
    :size="SIZES.LARGE"
    :title="titleKey ? $t(titleKey) : undefined"
    @update:open="$emit('close')"
  >
    <template #body>
      <p class="ver">{{ $t('CURRENT_VERSION') }}: {{ VERSION }}</p>
      <vue-markdown
        :source="text"
        class="content"
      />
    </template>
  </Modal>
</template>

<!--suppress TypeScriptCheckImport -->
<script setup lang="ts">
import { ref, onMounted } from 'vue';

import Modal, { SIZES } from '@/components/Modal.vue';
import VueMarkdown from 'vue-markdown-render';


export interface Props {
    isOpen: boolean
    titleKey?: string
}
withDefaults(defineProps<Props>(), {
    titleKey: 'UPDATED',
});

const text = ref('');
const { VERSION } = process.env;

defineEmits(['close']);
onMounted(() => {
    import('../../CHANGELOG.md').then((m) => text.value = m.default);
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
        padding-left: 5%;
    }
}
</style>
