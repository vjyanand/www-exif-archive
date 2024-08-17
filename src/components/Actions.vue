<script setup>
import { usePageStore } from '@/stores/exif'
import { ref } from 'vue'

const pageStore = usePageStore()

pageStore.pworker.onmessage = function (e) {
  let result = e.data
  switch (result.type) {
    case 'exif':
      makeTable(result.data)
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

  function makeTable(data) {
    console.log(data)
  }

  function download_file(e) {
  }

  function delete_exif(e) {

  }

  function removeRow(key) {

  }

  function delete_all_exif(e) {

  }

  const downloadBlob = (data, fileName) => {
    let f = "VIJAYA"
  }
}
</script>

<template>

</template>