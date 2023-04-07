<script setup lang="ts">
import { NButton, NDropdown } from 'naive-ui'
import { ofetch } from 'ofetch'
const isLoggedIn = inject('loginState') as { isLoggedIn: boolean }

const options = [
  {
    label: '登出',
    key: 'logout',
  },
  {
    label: '历史记录',
    key: 'his',
  }, {
    label: '修改密码',
    key: 'changepwd',
  },
]

const logout = async () => {
  await ofetch('http://demo.drshw.tech/api/logout')
  localStorage.clear()
  location.href = '/'
}

const router = useRouter()
const handle = (key: string) => {
  if (key === 'logout') {
    logout()
    return
  }
  router.push(`/${key}`)
}
</script>

<template>
  <nav class="p-5 flex flex-row container mx-auto justify-between">
    <span class="text-xl font-bold text-white flex items-center">

      <NIcon class="inline mr-5">
        <img src="/logo.png" width="40">
      </NIcon>
      <RouterLink to="/">
        <span>

          加密水印平台
        </span>
      </RouterLink>
    </span>
    <NButton
      v-if="isLoggedIn.isLoggedIn === false"

      type="info" color="#818cf8" @click="$router.push('/login')"
    >
      登陆
    </NButton>
    <div v-else>
      <NButton class="mx-2 text-white" @click="$router.push('/encrypt')">
        加密
      </NButton>
      <NButton class="mx-2 text-white" @click="$router.push('/decrypt')">
        解密
      </NButton>
      <NDropdown :options="options" @select="handle">
        <NButton class="mx-2 text-white">
          用户
        </NButton>
      </NDropdown>
    </div>
  </nav>
</template>
