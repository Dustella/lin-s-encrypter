<script lang="ts" setup>
import { NButton, NIcon, NInput, NP, NText, NUpload, NUploadDragger } from 'naive-ui'
import { ArchiveOutline as ArchiveIcon } from '@vicons/ionicons5'
</script>

<template>
  <div class=" h-screen pt-1/16 bg-[#e0e0e0]">
    <div class="max-w-[580px] mx-auto bg-[#fff] p-13 text-black rounded-2xl shadow-xl">
      <NUpload
        multiple
        directory-dnd
        action="https://www.mocky.io/v2/5e4bafc63100007100d8b70f"
        :max="5"
      >
        <NUploadDragger>
          <div style="margin-bottom: 12px">
            <NIcon size="48" :depth="3">
              <ArchiveIcon />
            </NIcon>
          </div>
          <NText style="font-size: 16px">
            点击或者拖动文件到该区域来上传图像文件
          </NText>
          <NP depth="3" style="margin: 8px 0 0 0">
            图像中不应当包含你的机密讯息
          </NP>
        </NUploadDragger>
      </NUpload>
      <NInput type="textarea" placeholder="输入加密讯息" />
      <NButton size="large" class="w-full mt-4">
        加密
      </NButton>
    </div>
  </div>
</template>

<style scoped>
:deep(.n-form-item-label__text){
    font-size: 1rem !important;
    height: 1.8rem;
}
</style>
