<script setup>
import { useDateFormat } from '@vueuse/core'
const prop = defineProps({
  date: {
    type: Date,
    default: new Date()
  }
})
const formattedDate = useDateFormat(prop.date, 'YYYY-MM-DD')

</script>
<template>
  <div>
    <span v-if="!edit"> {{ formattedDate }}</span>
  </div>
</template>