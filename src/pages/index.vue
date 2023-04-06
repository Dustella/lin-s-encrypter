<script setup lang="ts">
import { NButton } from 'naive-ui'
import WelcomeImg from '../../public/welcome.png'
</script>

<template>
  <section class="flex flex-row justify-around text-white">
    <main class=" p-1/9">
      <p class="text-6xl  text-left h-23 font-bold tracking-1 ">
        最安全的
      </p>
      <p class="text-6xl text-left  h-23  font-bold tracking-1 text-[var(--text)]">
        水印加密平台
      </p>
      <p class="text-left pb-4 text-xl text-white">
        这里应该有一堆介绍啥的
      </p>
      <div class="text-left p-2">
        <NButton size="large" type="primary" @click="$router.push('/login')">
          注册以开始
        </NButton>
        <NButton class="ml-4" size="large" type="primary" @click="$router.push('/encrypt')">
          直接开始
        </NButton>
      </div>
    </main>
    <img :src="WelcomeImg" alt="welcome">
  </section>
  <br>
  <br>
  <br>
</template>

<route lang="yaml">
meta:
  layout: default
</route>
