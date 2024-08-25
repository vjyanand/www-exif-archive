import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const usePageStore = defineStore('exif', () => {
  const pworker = ref(null)
  const work_flow_state = ref("LANDING") // "LANDING", "LIST"
  const exif_changed = ref(false)
  const table_data = ref(null)
  const worker_initialized = ref(false)
//TODO actions
  function setWorker(worker) {
    pworker.value = worker
  }

  function setTableData(data) {
    table_data.value = data
  }

  function clearTableData() {
    table_data.value = null
  }

  return { worker_initialized, table_data, setTableData, clearTableData, work_flow_state, exif_changed, pworker, setWorker }
})