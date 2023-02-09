<script setup>
import CeilCategory from './CeilCategory.vue'
import CeilDate from './CeilDate.vue'
import CeilReceipt from './CeilReceipt.vue'
import CeilPrice from './CeilPrice.vue'
import CeilState from './CeilState.vue'
import CeilString from './CeilString.vue'
import CeilPhoto from './CeilPhoto.vue'
import { ref, reactive, onMounted, inject, getCurrentInstance } from 'vue';
const defaultConfig = {
  category: 'pc',
  date: new Date(),
  receipt: '',
  price: 0,
  salvage: 0,
  state: 'inuse'
}
const emit = defineEmits(['submit'])
const visible = ref(false)
const confirmLoading = ref(false)
const closable = ref(true)

const showModal = () => {
  visible.value = true
}
// Submit(callback, data)
const handleOk = () => {
  closable.value = false
  confirmLoading.value = true
  emit('submit', () => {
    closable.value = true
    confirmLoading.value = false
    visible.value = false
  }, editValue)
}
const record = reactive(defaultConfig)
const editValue = reactive({ ...defaultConfig })
const editUpdateHandler = (key, value) => {
  editValue[key] = value
}
const cancelHandler = () => {
  Object.assign(editValue, record)
}
const afterCloseHandler = () => {
}

</script>
<template>
  <div>
    <a-button type="primary" @click="showModal">新增設備</a-button>
    <a-modal v-model:visible="visible" :closable="closable" :maskClosable="false" :destroyOnClose="true"
      :confirmLoading="confirmLoading" title="新增設備" ok-text="新增" @ok="handleOk" @cancel="cancelHandler"
      :cancel-button-props="{ disabled: confirmLoading }" :after-close="afterCloseHandler">
      <!-- Name -->
      <a-divider>設備名稱</a-divider>
      <CeilString :value="record['name']" :edit="true" :disabled="confirmLoading"
        @update="editUpdateHandler('name', $event)" />
      <!-- Category -->
      <a-divider>分類</a-divider>
      <CeilCategory :category="record.category" :edit="true" :disabled="confirmLoading"
        @update="editUpdateHandler('category', $event)" />
      <!-- Date -->
      <a-divider>購買日期</a-divider>
      <CeilDate :edit="true" :disabled="confirmLoading" :date="record.date"
        @update="editUpdateHandler('date', $event)" />
      <!-- Receipt -->
      <a-divider>發票</a-divider>
      <CeilReceipt :edit="true" :disabled="confirmLoading" :receipt="record.receipt"
        @update="editUpdateHandler('receipt', $event)" />
      <!-- Price -->
      <a-divider>購入金額</a-divider>
      <CeilPrice :edit="true" :disabled="confirmLoading" :price="record.price" key="price"
        @update="editUpdateHandler('price', $event)" />
      <!-- Salvage -->
      <a-divider>殘值</a-divider>
      <CeilPrice :edit="true" :disabled="confirmLoading" :price="record.salvage" key="salvage"
        @update="editUpdateHandler('salvage', $event)" />
      <!-- Type -->
      <a-divider>型號</a-divider>
      <CeilString :value="record['type']" :edit="true" :disabled="confirmLoading"
        @update="editUpdateHandler('type', $event)" />
      <!-- Format -->
      <a-divider>規格</a-divider>
      <CeilString :value="record['format']" :edit="true" :disabled="confirmLoading" :long="true"
        @update="editUpdateHandler('format', $event)" />
      <!-- Department -->
      <a-divider>部門</a-divider>
      <CeilString :value="record['department']" :edit="true" :disabled="confirmLoading"
        @update="editUpdateHandler('department', $event)" />
      <!-- Location -->
      <a-divider>地點</a-divider>
      <CeilString :value="record['location']" :edit="true" :disabled="confirmLoading"
        @update="editUpdateHandler('location', $event)" />
      <!-- Person -->
      <a-divider>負責人</a-divider>
      <CeilString :value="record['person']" :edit="true" :disabled="confirmLoading"
        @update="editUpdateHandler('person', $event)" />
      <!-- State -->
      <a-divider>狀態</a-divider>
      <CeilState :edit="true" :disabled="confirmLoading" :state="record.state"
        @update="editUpdateHandler('state', $event)" />
      <!-- Photo -->
      <a-divider>相片</a-divider>
      <CeilPhoto :edit="true" :disabled="confirmLoading" :id="record.id" load
        @update="editUpdateHandler('photo', $event)" />
    </a-modal>
  </div>
</template>