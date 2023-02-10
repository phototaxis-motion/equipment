import { getApp } from "firebase/app";
import { getDatabase, ref, child, get, push, update, onChildAdded, onChildChanged, onChildRemoved } from "firebase/database";
import { uploadImage, getImageUrlById } from './useStorage'
import { reactive, computed, onMounted } from 'vue'

export const useDatabase = () => {
  const app = getApp()
  const database = getDatabase(app);
  
  // // 即時更新Config
  // onValue(ref(database, '/config/'), (snapshot) => {
  //   Object.assign(config, snapshot.val())
  // });
  
  return database
}

export const addItem = async (data) => {
  const database = useDatabase()
  const updateData = {...data}
  Object.keys(updateData).forEach(key => updateData[key] === undefined && delete updateData[key])

  const itemRef = push(child(ref(database), 'list'))
  const config = (await get(child(ref(database), 'config'))).val()
  const getNewConfigPath = ()=>`/list/${config.pre}_${(config.index).toString().padStart(4, '0')
}`

  // Update Photo
  if (updateData.photo) {
    const id = `${config.pre}_${(config.index).toString().padStart(4, '0')}`
    const imgRef = await uploadImage(updateData.photo, id)
    updateData.photo = await getImageUrlById(id, imgRef)
  }

  const updates = {}
  updates[getNewConfigPath()] = updateData;
  updates[`/config/index`] = config.index + 1;
  await update(ref(database), updates);
  return itemRef
}

export const changeItem = async (id, data, callback) => {
  const database = useDatabase()
  const prefixPath = `/list/${id}/`
  const updates = {}

  // Upload Photo First
  if (data.photo && typeof data.photo.name == 'string') {
    const imgRef = await uploadImage(data.photo, id)
    data.photo = await getImageUrlById(id, imgRef)
  }
  console.log(data.photo)

  for (const [key, value] of Object.entries(data)) {
    if(!!value) {
      updates[prefixPath + key] = value
    }
  }
  console.log(updates)
  await update(ref(database), updates);
  callback();
}

export const useSyncDataList = (callback) => {
  const data = reactive({})
  const database = useDatabase()
  const listRef = child(ref(database), 'list')
  get(listRef).then((snap) => {
    const list = snap.val()
    for (const [key, value] of Object.entries(list)) {
      data[key] = value
    }
  }).catch(e=>{
    console.log(e)
  })
  const updateDataHandler = (snap)=>{
    data[snap.key] = snap.val()
  }
  onChildAdded(listRef, updateDataHandler)
  onChildChanged(listRef, updateDataHandler)
  onChildRemoved(listRef, (snap)=>{
    delete data[snap.key]
  })
  return data
}