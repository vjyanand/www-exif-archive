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

    <!-- Dark style tooltip -->

<button data-tooltip-target="tooltip-dark" type="button" class="ms-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Dark tooltip</button>

<div id="tooltip-dark" role="tooltip" class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
    Tooltip content
    <div class="tooltip-arrow" data-popper-arrow></div>
</div>

  </main>
</template>
