<script lang="ts" setup>
import { ref } from 'vue'
import type {
  FormInst,
  FormItemRule,
  FormRules,
} from 'naive-ui'
import {
  NButton,
  NForm,
  NFormItem,
  NInput,
  useMessage,
} from 'naive-ui'
import { ofetch } from 'ofetch'

interface ModelType {
  username: string | null
  password: string | null
}

const formRef = ref<FormInst | null>(null)
const message = useMessage()
const model = ref<ModelType>({
  username: null,
  password: null,
})

const setLoggedIn = inject('setLoggedIn') as () => void
const rules: FormRules = {
  username: [
    {
      required: true,
      validator(rule: FormItemRule, value: string) {
        // 它应该是数组、英文字母和下划线的组合
        if (!/^[a-zA-Z0-9_]+$/.test(value))
          return false
        return true
      },
      trigger: ['input', 'blur'],
    },
  ],
  password: [
    {
      required: true,
      message: '请输入密码',
    },
  ],
}
async function handleRegisterClick(e: MouseEvent) {
  e.preventDefault()
  formRef.value?.validate(async (errors) => {
    if (!errors) {
      // start login attempt
      const { username, password } = model.value
      const form = new FormData()
      form.append('account', username!)
      form.append('password', password!)
      const resp = await ofetch(`http://demo.drshw.tech/api/register/?account=${username}&password=${password}`, {
        method: 'POST',
        body: form,
      })
      if (resp.code === 200)

        message.success(JSON.stringify(resp.msg))

      else

        message.error(JSON.stringify(resp.msg))
    }
    else { message.error('验证失败') }
  })
}
const router = useRouter()
async function handleLoginClick(e: Event) {
  e.preventDefault()
  formRef.value?.validate(async (errors) => {
    if (!errors) {
      const { username, password } = model.value
      // start login attempt
      const resp = await ofetch(`http://demo.drshw.tech/api/login/?account=${username}&password=${password}`)
      if (resp.code === 200) {
        // successful login
        localStorage.setItem('isLoggedIn', '1')
        setLoggedIn()
        message.success(JSON.stringify(resp.msg))
        router.push('/')
      }

      else { message.error(JSON.stringify(resp.msg)) }
    }
    else { message.error('验证失败') }
  })
}
</script>

<template>
  <div class="bg-[#f3f4f6] h-screen pt-1/9">
    <div class="max-w-[580px] mx-auto bg-[white] p-13 text-black rounded-2xl shadow-xl">
      <NForm ref="formRef" :model="model" :rules="rules" size="large">
        <NFormItem path="age" label="用户名">
          <NInput
            v-model:value="model.username" size="large"
            @keydown.enter.prevent
          />
        </NFormItem>
        <NFormItem path="password" label="密码">
          <NInput
            v-model:value="model.password"
            size="large"
            type="password"
            @keydown.enter.prevent
          />
        </NFormItem>
        <div class="flex flex-row justify-around">
          <NButton
            type="info"
            class=" text-black w-1/3"
            size="large"
            @click="handleRegisterClick"
          >
            注册
          </NButton>
          <NButton
            type="info"
            class=" text-black w-1/3"
            size="large"
            @click="handleLoginClick"
          >
            登陆
          </NButton>
        </div>
      </NForm>
    </div>
  </div>
</template>

<style scoped>
:deep(.NFormItem-label__text){
    font-size: 1rem !important;
    height: 1.8rem;
}
</style>
