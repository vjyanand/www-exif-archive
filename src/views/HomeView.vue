<script setup>
import Actions from '../components/Actions.vue'
import FileSelect from '../components/FileSelect.vue'
import ExifTable from '../components/ExifTable.vue'
import { usePageStore } from '@/stores/exif'

const worker = new Worker(new URL('../worker.js', import.meta.url))
const pageStore = usePageStore()
pageStore.setWorker(worker)
</script>

<template>
  <main class="flex-1 overflow-y-auto md:mb-14 lg:mt-8 lg:mb-24">
    <FileSelect v-if="pageStore.work_flow_state === 'LANDING'" />
    <Actions />
    <ExifTable v-if="pageStore.work_flow_state === 'LIST'" />
    
  </main>
</template>
