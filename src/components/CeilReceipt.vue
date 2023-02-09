<script setup>
import { computed, ref, onMounted, watchEffect } from 'vue'
import { CopyOutlined } from '@ant-design/icons-vue';
import { useClipboard } from '@vueuse/core'

const emit = defineEmits(['update'])
const editValue = ref('')
const prop = defineProps({
  edit: {
    type: Boolean,
    default: false
  },
  receipt: {
    type: String
  },
  disabled: {
    type: Boolean,
    default: false
  },
})

const selectHandler = () => {
}
const reset = () => {
  editValue.value = prop.receipt
}
const { text, copy, copied, isSupported } = useClipboard({ editValue })
onMounted(reset)
watchEffect(() => emit('update', editValue.value))
</script>
<template>
  <div>
    <a-space v-if="!edit">
      <a :href="receipt" target="_blank">Link</a>
      <a-tooltip title="複製連結">
        <a-button :disabled="!receipt" size="small" @click='copy(receipt)'>
          <template #icon>
            <CopyOutlined />
          </template>
        </a-button>
      </a-tooltip>
    </a-space>
    <a-input-group v-else compact size="small">
      <a-input v-model:value="editValue" size="small" style="width: calc(100% - 50px)" :disabled="disabled" />
      <a-tooltip title="複製連結">
        <a-button size="small" @click='copy(editValue)' :disabled="disabled">
          <template #icon>
            <CopyOutlined />
          </template>
        </a-button>
      </a-tooltip>
    </a-input-group>
  </div>
</template>