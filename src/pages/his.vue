<script lang="ts" setup>
import { NDataTable } from 'naive-ui'
import { ofetch } from 'ofetch'
import DecryptButton from '~/components/DecryptButton.vue'

interface Record {
  filename: string
  isde: string
  time: string
}

const username = localStorage.getItem('account')

const cols = [
  {
    title: '原始图片文件名',
    key: 'filename',
    render: (row: any) =>
      h('a', {
        download: row.filename,
        href: `http://demo.drshw.tech/api/getimage/?account=${username}&image_name=${row.filename}&is_decrypted=${row.isde.is_decrypted}`,
      }, row.filename),
  },
  {
    title: '加密图片文件名',
    key: 'filename_hidden',
    render: (row: any) => h('a', {
      download: row.filename_hidden,
      href: `http://demo.drshw.tech/api/getimage/?account=${username}&image_name=${row.filename}&is_decrypted=${row.isde.is_decrypted}`,
    }, row.filename_hidden),
  },
  {
    title: '密钥',
    key: 'isde',
    render: (key: any) => h(DecryptButton, { isde: key.isde.is_decrypted, akey: key.isde.key }),
  },
  {
    title: '时间',
    key: 'time',
  },
]

const data = ref<Record[]>([])

const query = async () => {
  const resp = await ofetch('http://demo.drshw.tech/api/checks', {
    query: { account: localStorage.getItem('account') },
  })
  const res = (resp.data as { image_name: string; is_decrypted: boolean; query_time: string; key: string }[]).map(
    ({ image_name, is_decrypted, query_time, key }) => ({
      filename: image_name,
      isde: { is_decrypted, key },
      time: (new Date(query_time)).toLocaleDateString(),
      filename_hidden: image_name.replace('.png', '_hidden.png').replace('.jpg', '_hidden.png'),
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
    <div class="max-w-[980px] mx-auto bg-[#fff] p-13 text-black rounded-2xl shadow-xl">
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
