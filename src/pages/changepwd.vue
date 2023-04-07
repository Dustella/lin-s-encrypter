<script lang="ts" setup>
import { NButton, NInput, NModal, NSpin, useMessage } from 'naive-ui'
import { ofetch } from 'ofetch'

const password = reactive({
  first: '',
  second: '',
})
const showModal = ref(false)
const isLoading = ref(false)
const img_url = ref('')
const filename = ref('')
const message = useMessage()

const customRequest = async () => {
  if (password.first !== password.second)
    return message.error('两次输入的密码不一致')

  if (password.first.length < 6)
    return message.error('密码长度不得小于6位')

  showModal.value = true
  isLoading.value = true

  const formData = new FormData()

  formData.append('account', localStorage.getItem('account')!)
  formData.append('new_password', password.first)

  const resp = await ofetch('http://demo.drshw.tech/api/changepwd/', {
    method: 'POST',
    body: formData,
  })
  if (resp.code === 200)
    message.success('修改成功,请重新登录')

  else
    message.error(resp.msg)

  isLoading.value = false
  showModal.value = false
}
</script>

<template>
  <div class=" h-screen pt-1/16 bg-[#e0e0e0]">
    <div class="max-w-[580px] mx-auto bg-[#fff] p-13 text-black rounded-2xl shadow-xl">
      <h1 class="text-xl">
        请输入你的密码
      </h1>
      <br>
      <NInput v-model:value="password.first" size="large" class="my-2" type="password" placeholder="输入新的密码" />
      <NInput v-model:value="password.second" size="large" class="my-2" type="password" placeholder="再次输入新的密码" />
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
