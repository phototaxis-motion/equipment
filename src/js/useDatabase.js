import { getApp } from "firebase/app";
import { getDatabase, ref, child, get, push, update, onValue  } from "firebase/database";
import { uploadImage, getImageUrlById } from './useStorage'

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
  const updateData = {...data}
  Object.keys(updateData).forEach(key => updateData[key] === undefined && delete updateData[key])

  const database = useDatabase()
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