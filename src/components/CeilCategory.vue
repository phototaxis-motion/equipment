<script setup>
import { computed } from 'vue'
const prop = defineProps({
  edit: {
    type: Boolean,
    default: false
  },
  category: {
    type: String
  }
})
// TODO value key 統整
const categories = [
  {
    label: '電腦',
    color: 'green',
    key: 'pc'
  }, {
    label: '設備',
    color: 'blue',
    key: 'eq'
  }, {
    label: '辦公',
    color: 'pink',
    key: 'of'
  }
]
const defaultConfig = {
  label: '未分類',
  color: 'gray',
}

const config = computed(() => {
  const tag = categories.find((t) => t.key === prop.category)
  return tag || defaultConfig
})
</script>
<template>
  <div>
    <a-tag v-if="!edit" :color="config.color">
      {{ config.label }}
    </a-tag>
    <p v-else>edit...</p>
  </div>
</template>