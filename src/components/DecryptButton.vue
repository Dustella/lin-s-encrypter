<script setup lang="ts">
import { NButton } from 'naive-ui'
defineProps({
  isde: Boolean,
  akey: String,
})
</script>

<template>
  <NButton v-if="!isde" @click="$router.push('/decrypt')">
    解密
  </NButton>
  <span v-else>{{ akey }}</span>
</template>
