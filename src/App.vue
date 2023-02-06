<script setup>
import Demo from './components/Demo.vue'
import CeilCategory from './components/CeilCategory.vue'
import CeilOperation from './components/CeilOperation.vue'
import CeilDate from './components/CeilDate.vue'
import { reactive, ref, computed } from 'vue'
import _columns from './js/colums'
import data from './js/devData'
const dataSource = reactive(data)

const columnsData = reactive(_columns)
const columns = computed(() => {
  return columnsData.filter((col => checkedList.value.includes(col.title)))
})

const handleTableChange = (pag, filters, sorter) => {
  // 這邊去處理所以動作
  console.log(pag, filters, sorter)
}

// Columns Filter
const plainOptions = _columns.map(col => (col.title))
const checkedList = ref(plainOptions)
const onCheckboxChange = (e) => {
}

// Edit Mode
const editStartHandler = (row) => {
  row.edit = true
}
</script>

<template>
  <a-checkbox-group v-model:value="checkedList" :options="plainOptions" @change="onCheckboxChange" />

  <a-table size="large" :dataSource="dataSource" :columns="columns" @change="handleTableChange">
    <template #bodyCell="{ column, record }">
      <CeilCategory v-if="column.dataIndex === 'category'" :category="record.category" :edit="record.edit" />
      <CeilOperation v-else-if="column.dataIndex === 'operation'" :edit="record.edit" @start-edit="record.edit = true"
        @cancel="record.edit = false" />
      <CeilDate v-else-if="column.dataIndex === 'date'" :edit="record.edit" />
    </template>
  </a-table>
  <Demo></Demo>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
