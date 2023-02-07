<script setup>
import { computed, ref, onMounted } from 'vue'
import { CaretDownOutlined } from '@ant-design/icons-vue';

const prop = defineProps({
  edit: {
    type: Boolean,
    default: false
  },
  price: {
    type: Number
  }
})

const editValue = ref(0)
const selectHandler = () => {
}
const reset = () => {
  editValue.value = prop.price
}
onMounted(reset)
</script>
<template>
  <div>
    <a-space v-if="!edit">
      {{ price }}
    </a-space>
    <a-input v-else suffix="NTD" v-model:value="editValue" type="number" min="0" />
  </div>
</template>