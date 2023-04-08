<script lang="ts" setup>
import { NButton, NIcon, NInput, NModal, NP, NSpin, NText } from 'naive-ui'
import { ArchiveOutline as ArchiveIcon } from '@vicons/ionicons5'
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
  await fetch('http://demo.drshw.tech/api/encrypt/', {
    method: 'POST',
    body: formData,
  })

  addRecord(filename.value, key.value)
  img_url.value = ` http://demo.drshw.tech/api/getimage/?account=${localStorage.getItem('account')}&image_name=${rawname}&is_decrypted=false`
  isLoading.value = false
}
</script>

<template>
  <div class=" h-screen pt-1/16 bg-[#e0e0e0]">
    <div class="max-w-[580px] mx-auto bg-[#fff] p-13 text-black rounded-2xl shadow-xl">
      <input id="image" type="file" name="image" class="appearance-none opacity-0">
      <label for="image">
        <div
          class=" my-2 flex flex-col items-center justify-center h-[200px]  rounded-2xl border-dashed border-2 border-[#d0d0d0]"
        >
          <div style="margin-bottom: 12px">
            <NIcon size="48" :depth="3">
              <ArchiveIcon />
            </NIcon>
          </div>
          <NText style="font-size: 16px">
            ·
            点击或者拖动文件到该区域来上传图像文件
          </NText>
          <NP depth="3" style="margin: 8px 0 0 0">
            图像中不应当包含你的机密讯息
          </NP>
        </div>
      </label>
      <NInput v-model:value="key" type="textarea" placeholder="输入加密讯息" />
      <NButton size="large" class="w-full mt-4" @click="customRequest">
        加密
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
