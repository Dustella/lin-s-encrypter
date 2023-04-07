<script setup lang="ts">
import { NButton } from 'naive-ui'
const isLoggedIn = inject('loginState') as { isLoggedIn: boolean }
</script>

<template>
  <nav class="p-5 flex flex-row container mx-auto justify-between">
    <span class="text-xl font-bold text-white">

      <RouterLink to="/">

        加密水印平台
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
    </div>
  </nav>
</template>
