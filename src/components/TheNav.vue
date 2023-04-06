<script setup lang="ts">
import { NButton } from 'naive-ui'
</script>

<template>
  <nav class="p-5 flex flex-row container mx-auto justify-between">
    <span class="text-xl font-bold text-white">

      <RouterLink to="/">

        加密水印平台
      </RouterLink>
    </span>
    <NButton type="info" color="#818cf8">
      登陆
    </NButton>
  </nav>
</template>
