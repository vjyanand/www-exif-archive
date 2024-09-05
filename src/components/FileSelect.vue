<script setup>
import { usePageStore } from '@/stores/exif'
import { onMounted } from 'vue'
const pageStore = usePageStore()

onMounted(() => {
  let dropArea = document.getElementById('drop-area')
  dropArea.addEventListener('drop', handleDrop, false)
  ;['dragenter', 'dragover', 'dragleave', 'drop'].forEach((eventName) => {
    dropArea.addEventListener(eventName, preventDefaults, false)
    document.body.addEventListener(eventName, preventDefaults, false)
  })
  dropArea.addEventListener('drop', handleDrop, false)

  document.getElementById('file_picker').addEventListener('change', function () {
    let file = this.files[0]
    handleFile(file)
  })
})

function handleDrop(e) {
  let files = e.dataTransfer.files
  handleFile(files[0])
}

function handleFile(file) {
  let reader = new FileReader()
  reader.onload = function () {
    let data = new Uint8Array(reader.result)
    pageStore.postMessage({ file: data, type: 'file' })
    pageStore.file_name = file.name
  }
  reader.readAsArrayBuffer(file)
}

function preventDefaults(e) {
  e.preventDefault()
  e.stopPropagation()
}
</script>

<template>
  <div class="flex justify-center md:mb-10 lg:mt-8 lg:mb-24">
    <label
      id="drop-area"
      for="file_picker"
      class="flex flex-col items-center justify-center w-full md:w-1/2 h-64 md:h-64 lg:h-64 xl:h-64 2xl:h-64 border-2 bg-gray-200 mx-4 md:mx-8 lg:mx-12 xl:mx-16 2xl:mx-20 rounded-lg cursor-pointer dark:bg-gray-600 dark:hover:bg-gray-500"
    >
      <div class="flex flex-col items-center justify-center pt-5 pb-6 md:pt-5 md:pb-6 lg:pt-5 lg:pb-6 xl:pt-5 xl:pb-6 2xl:pt-5 2xl:pb-6">
        <svg
          class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400 md:w-8 md:h-8 lg:w-8 lg:h-8 xl:w-8 xl:h-8 2xl:w-8 2xl:h-8"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 20 16"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
          />
        </svg>
        <p class="mb-2 text-sm text-gray-500 dark:text-gray-400 md:text-sm lg:text-sm xl:text-sm 2xl:text-sm">
          <span class="font-semibold">Click to select</span> or drag and drop
        </p>
        <p class="text-xs text-gray-500 dark:text-gray-400 md:text-xs lg:text-xs xl:text-xs 2xl:text-xs">SVG, PNG, JPG or GIF</p>
      </div>
      
      <input id="file_picker" type="file" class="hidden" />
    </label>
  </div>
</template>
