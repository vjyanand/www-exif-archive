<script setup>
import { usePageStore } from '@/stores/exif'
import FileSelect from '../components/FileSelect.vue'
import Slug from '../components/Slug.vue'
import Cards from '../components/Cards.vue'
import Actions from '../components/Actions.vue'
import ExifTable from '../components/ExifTable.vue'

const worker = new Worker(new URL('../worker.js', import.meta.url))
const pageStore = usePageStore()
pageStore.setWorker(worker)

</script>

<template>
  <main class="flex-1 overflow-y-auto md:mb-14 lg:mt-8 lg:mb-24">
    <Slug v-if="pageStore.work_flow_state === 'LANDING'" />
    <FileSelect v-if="pageStore.work_flow_state === 'LANDING'" />
    <Actions />
    <ExifTable v-if="pageStore.work_flow_state === 'LIST'" />
    <Cards v-if="pageStore.work_flow_state === 'LANDING'" />

  </main>
</template>
