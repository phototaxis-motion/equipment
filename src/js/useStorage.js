import { getApp } from "firebase/app";
import { getStorage, ref, getDownloadURL, uploadBytes } from "firebase/storage";

export const useStorage = () => {
  const app = getApp()
  const storage = getStorage(app);
  return storage
}

export const uploadImage = async (file, id)=> {
  const storage = useStorage()
  const storageRef = ref(storage,`images/${id}.jpg`);

  const result = await uploadBytes(storageRef, file)
  return result.ref
}

export const getImageUrlById = async (id, imgRef = null) => {
  const storage = useStorage()
  const storageRef = imgRef || ref(storage,`images/${id}.jpg`);
  let url = ''
  try {
    url = await getDownloadURL(storageRef)
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'blob';
    xhr.onload = (event) => {
      const blob = xhr.response;
    };
    xhr.open('GET', url);
    xhr.send();
  } catch (e) {
    console.error(e)
  } finally {
    return url
  }
}
