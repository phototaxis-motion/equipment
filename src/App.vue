<script setup>
import CeilCategory from './components/CeilCategory.vue'
import CeilOperation from './components/CeilOperation.vue'
import CeilDate from './components/CeilDate.vue'
import CeilReceipt from './components/CeilReceipt.vue'
import CeilPrice from './components/CeilPrice.vue'
import CeilState from './components/CeilState.vue'
import CeilString from './components/CeilString.vue'
import CeilPhoto from './components/CeilPhoto.vue'
import ButtonAddItem from './components/ButtonAddItem.vue'
import { reactive, ref, computed, onMounted } from 'vue'
// import {  } from '@vueuse/core'

import _columns from './js/colums'
import data from './js/devData'
import { useDatabase, addItem } from './js/useDatabase'
import { getImageUrlById } from './js/useStorage'
import { getDatabase, ref as dbRef, child, get as dbGet } from "firebase/database";

const preOperateDate = data.map(d => {
  return { ...d, _update: {}, date: new Date(d.date) }
})
const dataSource = reactive(preOperateDate)
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
const editStartHandler = (record) => {
  record._update = {}
  record.edit = true
  console.log(record)
}
const editUpdateHandler = (record, key, value) => {
  record._update[key] = value
  // console.log({ record, key, value })
}
const editCancelHandler = (record) => {
  record.edit = false
}
const editSubmitHandler = (record, opCeil) => {
  setTimeout(() => {
    opCeil.exposed.state.loading = false
    record.edit = false
  }, 1000);

}
const addItemHandler = async (callback, data) => {
  const newRef = await addItem(data)
  const url = await getImageUrlById('test')
  console.log(data)
  setTimeout(callback, 1000)
} // TODO

onMounted(async () => {
  const db = useDatabase()
  // const myDbRef = dbRef(db);

  // dbGet(child(myDbRef, 'list')).then(snapshot => {
  //   if (snapshot.exists()) {
  //     console.log(snapshot.val());
  //   } else {
  //     console.log("No data available");
  //   }
  // }).catch((error) => {
  //   console.error(error);
  // });

})
</script>

<template>
  <a-layout class="app-table">
    <a-layout-header>
      <a-checkbox-group v-model:value="checkedList" :options="plainOptions" @change="onCheckboxChange" />
    </a-layout-header>
    <a-layout-header>
      <button-add-item @submit="addItemHandler"></button-add-item>
    </a-layout-header>
    <a-layout-content>
      <a-table size="large" :dataSource="dataSource" :columns="columns" @change="handleTableChange">
        <template #bodyCell="{ column, record }">
          <!-- Category -->
          <CeilCategory v-if="column.dataIndex === 'category'" :category="record.category" :edit="record.edit"
            @update="editUpdateHandler(record, column.dataIndex, $event)" />
          <!-- ID: static -->
          <span v-else-if="column.dataIndex === 'id'">{{ record.id }}</span>
          <!-- Date -->
          <CeilDate v-else-if="column.dataIndex === 'date'" :edit="record.edit" :date="record.date"
            @update="editUpdateHandler(record, column.dataIndex, $event)" />
          <!-- Receipt -->
          <CeilReceipt v-else-if="column.dataIndex === 'receipt'" :edit="record.edit" :receipt="record.receipt"
            @update="editUpdateHandler(record, column.dataIndex, $event)" />
          <!-- Price -->
          <CeilPrice v-else-if="column.dataIndex === 'price'" :edit="record.edit" :price="record.price" key="price"
            @update="editUpdateHandler(record, column.dataIndex, $event)" />
          <!-- Salvage -->
          <CeilPrice v-else-if="column.dataIndex === 'salvage'" :edit="record.edit" :price="record.salvage"
            key="salvage" @update="editUpdateHandler(record, column.dataIndex, $event)" />
          <CeilState v-else-if="column.dataIndex === 'state'" :edit="record.edit" :state="record.state"
            @update="editUpdateHandler(record, column.dataIndex, $event)" />
          <CeilPhoto v-else-if="column.dataIndex === 'photo'" :edit="record.edit" :id="record.id" load
            @update="editUpdateHandler(record, column.dataIndex, $event)" />
          <!-- Operation -->
          <CeilOperation v-else-if="column.dataIndex === 'operation'" :edit="record.edit"
            @start-edit="editStartHandler(record)" @cancel="editCancelHandler(record)"
            @submit="editSubmitHandler(record, $event)" />
          <!-- String: Other -->
          <CeilString v-else :value="record[column.dataIndex]" :edit="record.edit"
            :long="['format'].includes(column.dataIndex)"
            @update="editUpdateHandler(record, column.dataIndex, $event)" />
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
