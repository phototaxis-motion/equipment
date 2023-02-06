<script setup>
import { message } from 'ant-design-vue';
import { UploadOutlined } from '@ant-design/icons-vue';
import { ref, onMounted, inject } from 'vue';

import { getStorage, ref as fRef, uploadBytes, getDownloadURL } from "firebase/storage";

const app = inject('firebase', null)
const storage = getStorage(app);

const storageRef = fRef(storage, 'images/test.jpg');
onMounted(() => {
  // getDownloadURL(storageRef)
  //   .then((url) => {
  //     // `url` is the download URL for 'images/stars.jpg'

  //     // This can be downloaded directly:
  //     const xhr = new XMLHttpRequest();
  //     xhr.responseType = 'blob';
  //     xhr.onload = (event) => {
  //       const blob = xhr.response;
  //     };
  //     xhr.open('GET', url);
  //     xhr.send();

  //     // Or inserted into an <img> element
  //     const img = document.getElementById('myimg');
  //     img.setAttribute('src', url);
  //   })
  //   .catch((error) => {
  //     // Handle any errors
  //   });
})
// // 'file' comes from the Blob or File API
// uploadBytes(storageRef, file).then((snapshot) => {
//   console.log('Uploaded a blob or file!');
// });


const headers = {}
const fileList = ref([]);
const uploading = ref(false);
const handleRemove = file => {
  const index = fileList.value.indexOf(file);
  const newFileList = fileList.value.slice();
  newFileList.splice(index, 1);
  fileList.value = newFileList;
};
const beforeUpload = file => {
  fileList.value = [...fileList.value, file];
  return false;
};
const handleUpload = () => {
  const formData = new FormData();
  fileList.value.forEach(file => {
    formData.append('files[]', file);
  });
  uploading.value = true;

  // You can use any AJAX library you like
  request('https://www.mocky.io/v2/5cc8019d300000980a055e76', {
    method: 'post',
    data: formData,
  }).then(() => {
    fileList.value = [];
    uploading.value = false;
    message.success('upload successfully.');
  }).catch(() => {
    uploading.value = false;
    message.error('upload failed.');
  });
};
const handleChange = ({ file, fileList }) => {
  // uploadBytes(storageRef, file).then((snapshot) => {
  //   console.log('Uploaded a blob or file!');
  // });
}


</script>
<template>
  <div>
    <a-upload list-type="picture" :file-list="fileList" :before-upload="beforeUpload" @remove="handleRemove"
      @change="handleChange">
      <a-button :disabled="fileList.length !== 0">
        <upload-outlined></upload-outlined>
        Select File
      </a-button>
    </a-upload>
    <a-button type="primary" :disabled="fileList.length === 0" :loading="uploading" style="margin-top: 16px"
      @click="handleUpload">
      {{ uploading? 'Uploading': 'Start Upload' }}
    </a-button>
  </div>
</template>