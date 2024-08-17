<script setup>
import { usePageStore } from '@/stores/exif'
import { ref } from 'vue'

const pageStore = usePageStore()

pageStore.pworker.onmessage = function (e) {
  let result = e.data
  switch (result.type) {
    case 'wasm':
      pageStore.worker_initialized = true;
      console.log("Initilized")
      break;
    case 'exif':
      pageStore.work_flow_state = 'LIST'
      pageStore.setTableData(result.data)
      break;
    case 'delete':
      let payload = JSON.parse(result.data)
      if (payload["success"]) {
        removeRow(payload["key"])
      }
      console.log(payload)
      break;
    case 'delete_all':
      let payload_delete_all = JSON.parse(result.data)
      console.log(payload_delete_all)
      break;
    case 'download':
      downloadBlob(result.data, "a.jpeg", 'image/jpeg')
      break;
    default:
      console.log("default")
  }
}

const cancelTable = (e) => {
  pageStore.work_flow_state = 'LANDING'
}

function download_file(e) {

}



function removeRow(key) {

}

function delete_all_exif(e) {

}

const downloadBlob = (data, fileName) => {
  let f = "VIJAYA"
}

</script>

<template>

  <div v-if="pageStore.work_flow_state === 'LIST'">
    <button type="button" @click="cancelTable();"
      class="text-white bg-gray-700 hover:bg-gray-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none">
      Cancel
    </button>

    <button type="button"
      class="text-white bg-red-700 hover:bg-red-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none">
      Delete All Exif
    </button>

    <button type="button" v-if="pageStore.exif_changed"
      class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
      Download
    </button>

  </div>

</template>