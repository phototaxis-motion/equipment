<script setup>
import { computed, ref, onMounted, watchEffect } from 'vue'
import { DownloadOutlined, PlusOutlined, LoadingOutlined } from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';

const emit = defineEmits(['update'])
const prop = defineProps({
  edit: {
    type: Boolean,
    default: false
  },
  id: {
    type: String
  },
  disabled: {
    type: Boolean,
    default: false
  },
})
const src = ref('')

// input
const imageUrl = ref('')
const fileList = ref([]);
const inputLoading = ref(false);

const loaded = ref(false)
const loading = ref(false)
const editValue = ref(null)
const loadHandler = () => {
  loading.value = true
}

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}
const handleUploadChange = info => {
  console.log(info.file.status)
  if (info.file.status === 'uploading') {
    inputLoading.value = true;
    return;
  }
  if (info.file.status === 'done') {
    // Get this url from response in real world.
    getBase64(info.file.originFileObj, base64Url => {
      imageUrl.value = base64Url;
      inputLoading.value = false;
    });
  }
  if (info.file.status === 'error') {
    inputLoading.value = false;
    message.error('upload error');
  }
};
const beforeUpload = file => {
  console.log('beforeUpload', file)
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  editValue.value = file
  return isJpgOrPng && isLt2M;
};
const handleRemove = file => {
  const index = fileList.value.indexOf(file);
  const newFileList = fileList.value.slice();
  newFileList.splice(index, 1);
  fileList.value = newFileList;
};

watchEffect(() => emit('update', editValue.value))

</script>
<template>
  <div>
    <a-image v-if="loaded && !edit" :src="src" :width="45"></a-image>
    <a-button v-else-if="!loaded && !edit" size="small" @click="loadHandler" :loading="loading">
      <template #icon>
        <download-outlined />
      </template>
    </a-button>
    <div v-else>
      <a-upload v-model:file-list="fileList" name="avatar" list-type="picture-card" class="avatar-uploader" method="get"
        :show-upload-list="false" :disabled="disabled" :before-upload="beforeUpload" @change="handleUploadChange"
        @remove="handleRemove">
        <img v-if="imageUrl" :src="imageUrl" alt="avatar" :width="100" />
        <div v-else>
          <loading-outlined v-if="inputLoading"></loading-outlined>
          <plus-outlined v-else></plus-outlined>
          <div class="ant-upload-text">Upload</div>
        </div>
      </a-upload>
    </div>
  </div>
</template>