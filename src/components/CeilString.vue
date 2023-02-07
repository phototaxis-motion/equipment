<script setup>
import { computed, ref, onMounted } from 'vue'
import { CaretDownOutlined } from '@ant-design/icons-vue';

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
  }
})

const editValue = ref('')
const selectHandler = () => {
}
const reset = () => {
  editValue.value = prop.value
}
onMounted(reset)
</script>
<template>
  <div>
    <a-space v-if="!edit">
      {{ value }}
    </a-space>
    <a-input v-else-if="!long" v-model:value="editValue" />
    <a-textarea v-else v-model:value="editValue"></a-textarea>
  </div>
</template>