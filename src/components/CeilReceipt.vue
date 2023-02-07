<script setup>
import { computed, ref, onMounted } from 'vue'
import { CopyOutlined } from '@ant-design/icons-vue';
import { useClipboard } from '@vueuse/core'

const prop = defineProps({
  edit: {
    type: Boolean,
    default: false
  },
  receipt: {
    type: String
  }
})

const editValue = ref('')
const selectHandler = () => {
}
const reset = () => {
  editValue.value = prop.receipt
}
const { text, copy, copied, isSupported } = useClipboard({ editValue })
onMounted(reset)
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
      <a-input v-model:value="editValue" size="small" style="width: calc(100% - 50px)" />
      <a-tooltip title="複製連結">
        <a-button size="small" @click='copy(editValue)'>
          <template #icon>
            <CopyOutlined />
          </template>
        </a-button>
      </a-tooltip>
    </a-input-group>
  </div>
</template>