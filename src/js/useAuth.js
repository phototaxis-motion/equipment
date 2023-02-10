import { getAuth, setPersistence, browserSessionPersistence, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from "firebase/auth";
import { getApp } from "firebase/app";
import { reactive, computed, onMounted } from 'vue'

export const useSignIn = () => {
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  setPersistence(auth, browserSessionPersistence).then(()=>{
    return signInWithPopup(auth, provider)
  }).catch((error) => {
    // Handle Errors here.
    console.log(error)
  });
}

export const initAuth = () => {
  const auth = getAuth();
  let once = true
  onAuthStateChanged(auth, (user) => {
    if (!user && once) {
      useSignIn()
      once = false
    } else {
      console.log(user)
    }
  })
}
export const useSignOut = async () => {
  const auth = getAuth();
  await signOut(auth)
}

export const useAuthState = () => {
  const state = reactive({
    displayName: '----',
    email: '------',
    photoURL: '',
    login: false
  })

  const updateHandler = (user) =>{
    state.displayName = user.displayName
    state.email = user.email
    state.photoURL = user.photoURL
    state.login = user.login
  }
  const auth = getAuth();
  if (auth.currentUser) {
    const user = auth.currentUser
    updateHandler({...user, login: true})
  } else {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        updateHandler({...user, login: true})
      } else {
        updateHandler({
          displayName: '----',
          email: '------',
          photoURL: '',
          login: false
        })
      }
    })
  }
  return state
}
