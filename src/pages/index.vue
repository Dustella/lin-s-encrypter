<script setup lang="ts">
import { NButton } from 'naive-ui'
import WelcomeImg from '../../public/welcome.png'
const isLoggedIn = inject('loginState') as { isLoggedIn: boolean }
</script>

<template>
  <section class="flex flex-row justify-center text-white">
    <main class=" p-1/9 ">
      <p class="text-6xl  text-left h-23 font-bold tracking-1 ">
        最安全的
      </p>
      <p class="text-6xl text-left  h-23  font-bold tracking-1 text-[var(--text)]">
        水印加密平台
      </p>
      <p class="text-left pb-4 text-xl text-white w-150">
        媒体行业数据爆炸增长，盗版侵权案件日益猖獗
      </p>
      <p class="text-left pb-4 text-xl text-white w-150">
        我们可以将您的文件，添加不可见的数字水印，加强版权保护。
      </p>
      <p class="text-left pb-4 text-xl text-white w-150">
        水印加密平台，为您的版权保驾护航
      </p>
      <div class="text-left p-2">
        <NButton
          v-if="isLoggedIn.isLoggedIn === false"

          size="large" type="primary" @click="$router.push('/login')"
        >
          注册以开始
        </NButton>
        <NButton
          v-else
          class="" size="large" type="primary" @click="$router.push('/encrypt')"
        >
          直接开始
        </NButton>
      </div>
    </main>
    <div class="flex flex-row items-center justify-start pr-40">
      <img :src="WelcomeImg" alt="welcome">
    </div>
  </section>
  <br>
  <br>
  <br>
</template>

<route lang="yaml">
meta:
  layout: default
</route>
