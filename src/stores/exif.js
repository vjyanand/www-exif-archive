import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const usePageStore = defineStore('exif', () => {
  const pworker = ref(null)
  function setWorker(worker) {
    pworker.value = worker
  }
  return { pworker, setWorker }
})