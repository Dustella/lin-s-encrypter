<script setup lang="ts">
import { NButton } from 'naive-ui'
import { ofetch } from 'ofetch'
const isLoggedIn = inject('loginState') as { isLoggedIn: boolean }

const logout = async () => {
  await ofetch('http://demo.drshw.tech/api/logout')
  localStorage.clear()
  location.href = '/'
}
</script>

<template>
  <nav class="p-5 flex flex-row container mx-auto justify-between">
    <span class="text-xl font-bold text-white flex items-center">

      <NIcon class="inline mr-5">
        <img src="/logo.png" width="40">
      </NIcon>
      <RouterLink to="/">
        <span>

          加密水印平台
        </span>
      </RouterLink>
    </span>
    <NButton
      v-if="isLoggedIn.isLoggedIn === false"

      type="info" color="#818cf8" @click="$router.push('/login')"
    >
      登陆
    </NButton>
    <div v-else>
      <NButton class="mx-2 text-white" @click="$router.push('/encrypt')">
        加密
      </NButton>
      <NButton class="mx-2 text-white" @click="$router.push('/decrypt')">
        解密
      </NButton>
      <NButton class="mx-2 text-white" @click="$router.push('/his')">
        历史记录
      </NButton>
      <NButton class="mx-2 text-white" @click="logout">
        登出
      </NButton>
    </div>
  </nav>
</template>
