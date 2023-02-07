<script setup>
import { computed, ref, onMounted, getCurrentScope } from 'vue'
import { DownloadOutlined } from '@ant-design/icons-vue';
const prop = defineProps({
  edit: {
    type: Boolean,
    default: false
  },
  id: {
    type: String
  },
})
const src = ref('')
const loaded = ref(false)
const loading = ref(false)
const loadHandler = () => {
  loading.value = true

}
const loadedHook = (img) => {
  loading.value = false
  loaded.value = true
}
defineExpose({ loadedHook })
</script>
<template>
  <div>
    <a-image v-if="loaded && !edit" :src="src" :width="45"></a-image>
    <a-button v-else-if="!loaded && !edit" size="small" @click="loadHandler" :loading="loading">
      <template #icon>
        <download-outlined />
      </template>
    </a-button>
  </div>
</template>