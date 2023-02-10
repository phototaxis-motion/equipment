<script setup>
import { UserOutlined } from '@ant-design/icons-vue';
import { useSignOut, useSignIn } from '../js/useAuth'
const prop = defineProps({
  state: {
    type: Object
  }
})
const clickHandler = () => {
  if (state.login) {
    useSignOut()
  } else {
    useSignIn()
  }
}
</script>
<template>
  <div>
    <a-space>
      <a-avatar :size="40" v-if="state&&!state.login">
        <template #icon>
          <UserOutlined />
        </template>
      </a-avatar>
      <a-avatar :size="40" v-else :src="state && state.photoURL">
      </a-avatar>
      <a-button @click="clickHandler">
        {{ state && state.login ? '登出' : '登入' }}
      </a-button>
    </a-space>
  </div>
</template>