<script setup>
import { computed, ref, onMounted, watchEffect } from 'vue'
import { CaretDownOutlined } from '@ant-design/icons-vue';

const emit = defineEmits(['update'])
const prop = defineProps({
  edit: {
    type: Boolean,
    default: false
  },
  value: {
    type: String
  },
  long: {
    type: [String, Boolean],
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
})

const editValue = ref('')
const selectHandler = () => {
}
const reset = () => {
  editValue.value = prop.value
}
onMounted(reset)
watchEffect(() => emit('update', editValue.value))
</script>
<template>
  <div>
    <a-space v-if="!edit">
      {{ value }}
    </a-space>
    <a-input v-else-if="!long" v-model:value="editValue" :disabled="disabled" />
    <a-textarea v-else v-model:value="editValue" :disabled="disabled"></a-textarea>
  </div>
</template>