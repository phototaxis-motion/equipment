<script setup>
import { computed, ref, onMounted, watchEffect } from 'vue'
import { CaretDownOutlined } from '@ant-design/icons-vue';

const emit = defineEmits(['update'])
const prop = defineProps({
  edit: {
    type: Boolean,
    default: false
  },
  price: {
    type: [Number, String]
  },
  disabled: {
    type: Boolean,
    default: false
  },
})

const editValue = ref(0)
const selectHandler = () => {
}
const reset = () => {
  editValue.value = +prop.price
}
onMounted(reset)
watchEffect(() => emit('update', editValue.value))
</script>
<template>
  <div>
    <a-space v-if="!edit">
      {{ price }}
    </a-space>
    <a-input v-else suffix="NTD" v-model:value="editValue" type="number" min="0" :disabled="disabled" />
  </div>
</template>