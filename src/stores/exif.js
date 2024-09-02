import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
export const usePageStore = defineStore('exif', () => {
  const web_worker = ref(null)
  const file_name = ref(null)
  const image_name = ref(null)
  const worker_initialized = ref(false)
  const work_flow_state = ref("LANDING") // "LANDING", "LIST"
  const exif_changed = ref(false)
  const exif_data = ref(null)
  const toast_timer = ref(null)

  function setWorker(worker) {
    web_worker.value = worker
  }

  function setTableData(data) {
    exif_data.value = data
  }

  function clearTableData() {
    exif_data.value = null
  }

  function postMessage(payload) {
    web_worker.value.postMessage(payload)
  }

  return {
    web_worker,
    work_flow_state,
    worker_initialized,
    exif_changed,
    exif_data,
    toast_timer,
    file_name,
    image_name,
    clearTableData,
    setWorker,
    setTableData,
    postMessage
  }
})