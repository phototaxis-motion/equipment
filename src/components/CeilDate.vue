<script setup>
import { useDateFormat } from '@vueuse/core'
import { ref, onMounted } from 'vue'
import dayjs from 'dayjs';

const prop = defineProps({
  date: {
    type: Date,
    default: new Date()
  },
  edit: {
    type: Boolean,
    default: false
  }
})
const formattedDate = useDateFormat(prop.date, 'YYYY-MM-DD')
const editValue = ref(null)
const reset = () => {
  editValue.value = dayjs(prop.date)
}
onMounted(reset)

</script>
<template>
  <div>
    <div v-if="!edit"> {{ formattedDate }}</div>
    <a-date-picker v-else v-model:value="editValue" mode="date" size="small" format="YYYY-MM-DD" />
  </div>
</template>
