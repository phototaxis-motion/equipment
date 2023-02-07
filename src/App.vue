<script setup>
import Demo from './components/Demo.vue'
import CeilCategory from './components/CeilCategory.vue'
import CeilOperation from './components/CeilOperation.vue'
import CeilDate from './components/CeilDate.vue'
import CeilReceipt from './components/CeilReceipt.vue'
import CeilPrice from './components/CeilPrice.vue'
import CeilState from './components/CeilState.vue'
import CeilString from './components/CeilString.vue'
import CeilPhoto from './components/CeilPhoto.vue'
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
  <a-layout-header>
    <a-checkbox-group v-model:value="checkedList" :options="plainOptions" @change="onCheckboxChange" />
  </a-layout-header>
  <a-layout class="app-table">
    <a-layout-content>
      <a-table size="large" :dataSource="dataSource" :columns="columns" @change="handleTableChange">
        <template #bodyCell="{ column, record }">
          <!-- Category -->
          <CeilCategory v-if="column.dataIndex === 'category'" :category="record.category" :edit="record.edit" />
          <!-- ID: static -->
          <span v-else-if="column.dataIndex === 'id'">{{ record.id }}</span>
          <!-- Date -->
          <CeilDate v-else-if="column.dataIndex === 'date'" :edit="record.edit" />
          <!-- Operation -->
          <CeilOperation v-else-if="column.dataIndex === 'operation'" :edit="record.edit"
            @start-edit="record.edit = true" @cancel="record.edit = false" />
          <!-- Receipt -->
          <CeilReceipt v-else-if="column.dataIndex === 'receipt'" :edit="record.edit" :receipt="record.receipt" />
          <!-- Price -->
          <CeilPrice v-else-if="column.dataIndex === 'price'" :edit="record.edit" :price="record.price" key="price" />
          <!-- Salvage -->
          <CeilPrice v-else-if="column.dataIndex === 'salvage'" :edit="record.edit" :price="record.salvage"
            key="salvage" />
          <CeilState v-else-if="column.dataIndex === 'state'" :edit="record.edit" :state="record.state" />
          <CeilPhoto v-else-if="column.dataIndex === 'photo'" :edit="record.edit" :id="record.id" load />
          <CeilString v-else :value="record[column.dataIndex]" :edit="record.edit"
            :long="['format'].includes(column.dataIndex)" />
        </template>
      </a-table>
    </a-layout-content>
  </a-layout>
</template>

<style lang="scss" scoped>
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

.ant-layout-header {
  background: transparent;
}

.app-table {}
</style>
