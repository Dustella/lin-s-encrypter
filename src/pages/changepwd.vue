<script lang="ts" setup>
import { NButton, NInput, NModal, NSpin } from 'naive-ui'
import { addRecord } from './data'

const key = ref('')
const showModal = ref(false)
const isLoading = ref(false)
const img_url = ref('')
const filename = ref('')

const customRequest = async () => {
  showModal.value = true
  isLoading.value = true
  const formData = new FormData()

  const image = document.getElementById('image') as HTMLInputElement

  formData.append('image', image.files![0])
  formData.append('image_name', image.files![0].name)
  const rawname = image.files![0].name
  filename.value = `${rawname.slice(0, rawname.lastIndexOf('.'))}_hidden.png`
  formData.append('account', localStorage.getItem('account')!)
  formData.append('key', key.value)
  const resp = await fetch('http://demo.drshw.tech/api/changepwd/', {
    method: 'POST',
    body: formData,
  })

  addRecord(filename.value, key.value)
  img_url.value = URL.createObjectURL(await resp.blob())
  isLoading.value = false
}
</script>

<template>
  <div class=" h-screen pt-1/16 bg-[#e0e0e0]">
    <div class="max-w-[580px] mx-auto bg-[#fff] p-13 text-black rounded-2xl shadow-xl">
      <NInput v-model:value="key" type="textarea" placeholder="输入新的密码" />
      <NInput v-model:value="key" type="textarea" placeholder="再次输入新的密码" />
      <NButton size="large" class="w-full mt-4" @click="customRequest">
        修改密码
      </NButton>
    </div>
  </div>
  <NModal
    v-model:show="showModal"
    :mask-closable="false"
    preset="dialog"
    title="结果"
    content="你确认"
  >
    <div v-if="isLoading">
      <NSpin size="large" />
      正在生成加密图像
    </div>
    <div v-else>
      <img :src="img_url" alt="">
      <a :href="img_url" :download="filename">
        <NButton>
          下载图像
        </NButton>
      </a>
    </div>
  </NModal>
</template>

<style scoped>
:deep(.n-form-item-label__text){
    font-size: 1rem !important;
    height: 1.8rem;
}
</style>
