<script setup>
const prop = defineProps({
  edit: {
    type: Boolean,
    default: false
  },
})
const emit = defineEmits(['startEdit', 'submit', 'cancel', 'delete'])
</script>
<template>
  <div style="display: flex;">
    <template v-if="!edit">
      <a-button @click="emit('startEdit')" size="small">編輯</a-button>
      <a-button size="small" @click="emit('delete')" danger>刪除</a-button>
    </template>
    <template v-else>
      <a-button type="primary" @click="emit('submit')" size="small">確定</a-button>
      <a-button size="small" @click="emit('cancel')">取消</a-button>
    </template>
  </div>
</template>