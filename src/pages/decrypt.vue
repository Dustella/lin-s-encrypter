<script lang="ts" setup>
import { NButton, NIcon, NModal, NP, NSpin, NText } from 'naive-ui'
import { ArchiveOutline as ArchiveIcon } from '@vicons/ionicons5'
import { ofetch } from 'ofetch'
import { queryRecord } from './data'

const showModal = ref(false)
const isLoading = ref(false)
const filename = ref('')

const customRequest = async () => {
  showModal.value = true
  isLoading.value = true
  const formData = new FormData()

  const image = document.getElementById('image') as HTMLInputElement

  filename.value = image.files![0].name
  formData.append('account', 'u3')
  const key = queryRecord(filename.value)
  await ofetch(`http://demo.drshw.tech/api/decrypt/?account=${localStorage.getItem('account')!}&key=${key}&image_name=${filename.value.replace('_hidden', '')}`, {

  })
  setTimeout(() => {
    isLoading.value = false
  }, 2000)
}
</script>

<template>
  <div class=" h-screen pt-1/16 bg-[#e0e0e0]">
    <div class="max-w-[580px] mx-auto bg-[#fff] p-13 text-black rounded-2xl shadow-xl">
      <input id="image" type="file" name="image" class="appearance-none opacity-0">
      <label for="image">
        <div
          class=" my-2 flex flex-col items-center justify-center h-[200px] rounded-2xl border-dashed border-2 border-[#d0d0d0]"
        >
          <div style="margin-bottom: 12px">
            <NIcon size="48" :depth="3">
              <ArchiveIcon />
            </NIcon>
          </div>
          <NText style="font-size: 16px">
            ·
            点击该区域来上传图像文件
          </NText>
          <NP depth="3" style="margin: 8px 0 0 0">
            您应当上传带有加密信息的文件
          </NP>
        </div>
      </label>
      <NButton size="large" class="w-full mt-4" @click="customRequest">
        解密
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
      正在解密
    </div>
    <div v-else>
      解密内容:
      <pre>
        {{ queryRecord(filename) }}
      </pre>
    </div>
  </NModal>
</template>

<style scoped>
:deep(.n-form-item-label__text){
    font-size: 1rem !important;
    height: 1.8rem;
}
</style>
