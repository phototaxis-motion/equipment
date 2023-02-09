<script setup>
import { useDateFormat } from '@vueuse/core'
import { ref, onMounted, watchEffect } from 'vue'
import dayjs from 'dayjs';

const prop = defineProps({
  date: {
    type: Date,
    default: new Date()
  },
  edit: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
})
const emit = defineEmits(['update'])
const formattedDate = useDateFormat(prop.date, 'YYYY-MM-DD')
const editValue = ref(null)
const reset = () => {
  editValue.value = dayjs(prop.date)
}
onMounted(reset)
watchEffect(() => emit('update', editValue.value && editValue.value.toDate()))
</script>
<template>
  <div>
    <div v-if="!edit"> {{ formattedDate }}</div>
    <a-date-picker v-else v-model:value="editValue" mode="date" size="small" format="YYYY-MM-DD" :disabled="disabled" />
  </div>
</template>
