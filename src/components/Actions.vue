<script setup>
import { usePageStore } from '@/stores/exif'
import { Dismiss } from 'flowbite';

const pageStore = usePageStore()

pageStore.web_worker.onmessage = function (e) {
  let result = e.data
  switch (result.type) {
    case 'wasm':
      pageStore.worker_initialized = true
      console.log('Initilized')
      break
    case 'exif':
      pageStore.work_flow_state = 'LIST'
      let exif_data = JSON.parse(result.data)
      pageStore.setTableData(exif_data)
      pageStore.image_name = result.image_name
      break
    case 'delete':
      let payload = JSON.parse(result.data)
      if (payload['success']) {
        if (pageStore.exif_changed === false) {
          pageStore.exif_changed = true
        }
        pageStore.remove_exif_data(payload['key']);
        showToast(`${payload['key']} is removed`)
      }
      break
    case 'delete_all':
      let payload_delete_all = JSON.parse(result.data)
      if (pageStore.exif_changed === false && payload_delete_all === true) {
        pageStore.exif_changed = true
        showToast("All exif metadata removed")
      }
      console.log(payload_delete_all)
      break
    case 'download':
      let download_file_name = "mod_" + pageStore.file_name
      downloadBlob(result.data, download_file_name, 'image/jpeg')
      break

    default:
      console.log('default')
  }
}

const cancelTable = (e) => {
  pageStore.work_flow_state = 'LANDING'
  pageStore.exif_changed = false
}

function download_file(e) {
  pageStore.postMessage({ type: "download", filename: pageStore.image_name })
}

function delete_all_exif(e) {
  pageStore.postMessage({ type: "delete_all" })
}

const downloadBlob = (data, fileName) => {
  let row = document.querySelector('[data-key="mime"]');
  let mimeType = row.getAttribute("data-raw-value");

  const blob = new Blob([data], {
    type: mimeType
  })
  const url = window.URL.createObjectURL(blob)
  downloadURL(url, fileName)
  setTimeout(() => window.URL.revokeObjectURL(url), 1000)
}

const downloadURL = (data, fileName) => {
  const a = document.createElement('a')
  a.href = data
  a.download = fileName
  document.body.appendChild(a)
  a.style.display = 'none'
  a.click()
  a.remove()
}

const showToast = (message, type) => {
  const toast_message = message || ""
  const toastDiv = document.getElementById("toast")
  toastDiv.classList.remove("invisible")
  toastDiv.classList.remove("hidden")
  toastDiv.classList.remove("transition-opacity")
  toastDiv.classList.remove("opacity-0")
  toastDiv.classList.remove("ease-out")
  const toastMessageDiv = document.getElementById("toast-message")
  toastMessageDiv.innerText = toast_message
  toastDiv.classList.add("visible")
  clearTimeout(pageStore.toast_timer)
  pageStore.toast_timer = setTimeout(() => {
    const dismiss = new Dismiss(toastDiv);
    dismiss.hide();
  }, 2000);
}

</script>

<template>
  <div v-if="pageStore.work_flow_state === 'LIST'">
    <button type="button" @click="cancelTable()"
      class="text-white bg-gray-700 hover:bg-gray-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none">
      Cancel
    </button>

    <button type="button" v-on:click="delete_all_exif"
      class="text-white bg-red-700 hover:bg-red-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none">
      Delete All Exif
    </button>

    <button type="button" v-on:click="download_file" v-if="pageStore.exif_changed"
      class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
      Download
    </button>
  </div>

  <div id="toast"
    class="invisible fixed top-5 right-1 flex items-center w-full max-w-xs p-4 space-x-4 rtl:space-x-reverse text-gray-500 bg-white divide-x rtl:divide-x-reverse divide-gray-200 rounded-lg shadow dark:text-gray-400 dark:divide-gray-700 dark:bg-gray-800"
    role="alert">
    <svg class="w-5 h-5 text-blue-600 dark:text-blue-500 rotate-45" aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
        d="m9 17 8 2L9 1 1 19l8-2Zm0 0V9" />
    </svg>
    <div id="toast-message" class="ps-4 text-sm font-normal">Message sent successfully.</div>
  </div>

</template>