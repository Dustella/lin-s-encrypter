<script lang="ts">
import { defineComponent, ref } from 'vue'
import type {
  FormInst,
  FormItemInst,
  FormItemRule,
  FormRules,
} from 'naive-ui'
import {
  useMessage,
} from 'naive-ui'

interface ModelType {
  username: string | null
  password: string | null
  reenteredPassword: string | null
}

export default defineComponent({
  setup() {
    const formRef = ref<FormInst | null>(null)
    const rPasswordFormItemRef = ref<FormItemInst | null>(null)
    const message = useMessage()
    const modelRef = ref<ModelType>({
      username: null,
      password: null,
      reenteredPassword: null,
    })
    function validatePasswordStartWith(
      rule: FormItemRule,
      value: string,
    ): boolean {
      return (
        !!modelRef.value.password
          && modelRef.value.password.startsWith(value)
          && modelRef.value.password.length >= value.length
      )
    }
    function validatePasswordSame(rule: FormItemRule, value: string): boolean {
      return value === modelRef.value.password
    }
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
      reenteredPassword: [
        {
          required: true,
          message: '请再次输入密码',
          trigger: ['input', 'blur'],
        },
        {
          validator: validatePasswordStartWith,
          message: '两次密码输入不一致',
          trigger: 'input',
        },
        {
          validator: validatePasswordSame,
          message: '两次密码输入不一致',
          trigger: ['blur', 'password-input'],
        },
      ],
    }
    return {
      formRef,
      rPasswordFormItemRef,
      model: modelRef,
      rules,
      handlePasswordInput() {
        if (modelRef.value.reenteredPassword)
          rPasswordFormItemRef.value?.validate({ trigger: 'password-input' })
      },
      handleValidateButtonClick(e: MouseEvent) {
        e.preventDefault()
        formRef.value?.validate((errors) => {
          if (!errors)
            message.success('验证成功')

          else
            message.error('验证失败')
        })
      },
    }
  },
})
</script>

<template>
  <div class=" h-screen pt-1/9">
    <div class="max-w-[580px] mx-auto bg-[#f1f1f1] p-13 text-black rounded-2xl shadow-xl">
      <n-form ref="formRef" :model="model" :rules="rules" size="large">
        <n-form-item path="age" label="用户名">
          <n-input
            v-model:value="model.username" size="large"
            @keydown.enter.prevent
          />
        </n-form-item>
        <n-form-item path="password" label="密码">
          <n-input
            v-model:value="model.password"
            size="large"
            type="password"
            @input="handlePasswordInput"
            @keydown.enter.prevent
          />
        </n-form-item>
        <n-form-item
          ref="rPasswordFormItemRef"
          first
          path="reenteredPassword"
          size="large"
          label="重复密码"
        >
          <n-input
            v-model:value="model.reenteredPassword"
            :disabled="!model.password"
            type="password"
            @keydown.enter.prevent
          />
        </n-form-item>
        <div>
          <n-button
            type="info"
            class="w-full text-black"
            size="large"
            @click="handleValidateButtonClick"
          >
            注册或者登陆
          </n-button>
        </div>
      </n-form>
    </div>
  </div>
</template>

<style scoped>
:deep(.n-form-item-label__text){
    font-size: 1rem !important;
    height: 1.8rem;
}
</style>
