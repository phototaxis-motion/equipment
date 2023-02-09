<script setup>
import { computed, ref, onMounted, watchEffect } from 'vue'
import { CaretDownOutlined } from '@ant-design/icons-vue';

const prop = defineProps({
  edit: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  category: {
    type: String
  }
})
const emit = defineEmits(['update'])
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
const editValue = ref('')
const editoTag = computed(() => {
  const tag = categories.find((t) => t.key === editValue.value)
  return editValue && tag || null
})
const config = computed(() => {
  const tag = categories.find((t) => t.key === prop.category)
  return tag || defaultConfig
})

const selectHandler = ({ key }) => {
  editValue.value = key
}
const reset = () => {
  editValue.value = prop.category
}
onMounted(reset)
watchEffect(() => emit('update', editValue.value))
</script>
<template>
  <div>
    <a-tag v-if="!edit" :color="config.color">
      {{ config.label }}
    </a-tag>
    <a-dropdown v-else :disabled="disabled">
      <a-tag v-if="editoTag" :color="editoTag && editoTag.color">
        {{ editoTag.label }}
        <caret-down-outlined />
      </a-tag>
      <a v-else href="javascript:;">Click</a>
      <template #overlay>
        <a-menu @click="selectHandler">
          <a-menu-item v-for="button in categories" :key="button.key">
            <a-tag :color="button.color">
              {{ button.label }}
            </a-tag>
          </a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>
  </div>
</template>