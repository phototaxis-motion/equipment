<script setup>
import { ref, reactive, onMounted, inject, getCurrentInstance } from 'vue';
const prop = defineProps({
  edit: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
})
const emit = defineEmits(['startEdit', 'submit', 'cancel', 'delete'])
const self = getCurrentInstance()
const state = reactive({
  loading: false
})
const submitHandler = () => {
  state.loading = true
  emit("submit", self)
}
defineExpose({ state })
</script>
<template>
  <div style="display: flex;">
    <template v-if="!edit">
      <a-button @click="emit('startEdit')" size="small">編輯</a-button>
      <a-button size="small" @click="emit('delete')" danger>刪除</a-button>
    </template>
    <template v-else>
      <a-button type="primary" :loading="state.loading" @click="submitHandler" size="small">{{
        state.loading ?
          '' : '確定'
      }}</a-button>
      <a-button size="small" @click="emit('cancel')">取消</a-button>
    </template>
  </div>
</template>