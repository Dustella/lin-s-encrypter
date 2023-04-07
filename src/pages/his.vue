<script lang="ts" setup>
import { NDataTable } from 'naive-ui'
import { ofetch } from 'ofetch'

const showModal = ref(false)
const isLoading = ref(false)
const filename = ref('')

interface Record {
  filename: string
  isde: string
  time: string
}

const cols = [
  {
    title: '文件名',
    key: 'filename',
  },
  {
    title: '已经加密',
    key: 'isde',
  },
  {
    title: '时间',
    key: 'time',
  },
]

const data = ref<Record[]>([])

const query = async () => {
  const resp = await ofetch('http://demo.drshw.tech/api/checks', {
    query: { account: 'u3' },
  })
  const res = (resp.data as { image_name: string; is_decrypted: boolean; query_time: string }[]).map(
    ({ image_name, is_decrypted, query_time }) => ({
      filename: image_name,
      isde: is_decrypted ? '是' : '否',
      time: (new Date(query_time)).toLocaleDateString(),
    }),
  )
  const filenames = [] as string[]
  const fin = []
  for (const i of res) {
    if (filenames.includes(i.filename)) {
      // do nothing
    }
    else {
      fin.push(i)
      filenames.push(i.filename)
    }
  }

  data.value = fin
}

onMounted(() => {
  query()
})
</script>

<template>
  <div class=" h-screen pt-1/16 bg-[#e0e0e0]">
    <div class="max-w-[580px] mx-auto bg-[#fff] p-13 text-black rounded-2xl shadow-xl">
      <NDataTable
        :columns="cols"
        :data="data"
      />
    </div>
  </div>
</template>

<style scoped>
:deep(.n-form-item-label__text){
    font-size: 1rem !important;
    height: 1.8rem;
}
</style>
