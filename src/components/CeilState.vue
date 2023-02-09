<script setup>
import { computed, ref, onMounted, watchEffect } from 'vue'
import { CaretDownOutlined } from '@ant-design/icons-vue';

const emit = defineEmits(['update'])
const prop = defineProps({
  edit: {
    type: Boolean,
    default: false
  },
  state: {
    type: String
  },
  disabled: {
    type: Boolean,
    default: false
  },
})
// TODO value key 統整
const states = [
  {
    label: '使用中',
    color: 'green',
    key: 'inuse'
  }, {
    label: '報廢',
    color: 'red',
    key: 'scrap'
  }, {
    label: '維修',
    color: 'blue',
    key: 'maintenance'
  }
]
const defaultConfig = {
  label: '未分類',
  color: 'gray',
}
const editValue = ref('')
const editoTag = computed(() => {
  const tag = states.find((t) => t.key === editValue.value)
  return editValue && tag || null
})
const config = computed(() => {
  const tag = states.find((t) => t.key === prop.state)
  return tag || defaultConfig
})

const selectHandler = ({ key }) => {
  editValue.value = key
}
const reset = () => {
  editValue.value = prop.state
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
          <a-menu-item v-for="button in states" :key="button.key">
            <a-tag :color="button.color">
              {{ button.label }}
            </a-tag>
          </a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>
  </div>
</template>