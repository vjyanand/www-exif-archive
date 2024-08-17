<script setup>
import { usePageStore } from '@/stores/exif'
import { onMounted } from 'vue'

const pageStore = usePageStore()

onMounted(() => {
  let dropArea = document.getElementById("drop-area")

    ;['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
      dropArea.addEventListener(eventName, preventDefaults, false)
      document.body.addEventListener(eventName, preventDefaults, false)
    })

    ;['dragenter', 'dragover'].forEach(eventName => {
      dropArea.addEventListener(eventName, highlight, false)
    })

    ;['dragleave', 'drop'].forEach(eventName => {
      dropArea.addEventListener(eventName, unhighlight, false)
    })

  dropArea.addEventListener('drop', handleDrop, false)

  document.getElementById("file_picker").addEventListener("change", function () {
    let file = this.files[0];
    handleFile(file)
  })
})

function handleDrop(e) {
  let dt = e.dataTransfer
  let files = dt.files
  let file = files[0];
  handleFile(file)
}

function handleFile(file) {
  let reader = new FileReader()
  reader.onload = function () {
    let data = new Uint8Array(reader.result)
    pageStore.pworker.postMessage({ file: data, type: "file" });
  }
  reader.readAsArrayBuffer(file)
}

function highlight(e) {
  let dropArea = document.getElementById("drop-area")
  dropArea.classList.add('highlight')
}

function unhighlight(e) {
  let dropArea = document.getElementById("drop-area")
  dropArea.classList.remove('highlight')
}

function preventDefaults(e) {
  e.preventDefault()
  e.stopPropagation()
}


</script>

<template class="mx-auto bg-white min-h-screen flex flex-col items-center justify-center h-full py-4 px-8">
  <div class="container max-w-5xl mx-auto h-full">
    <section>
      <div id="drop-area">
        <form class="my-form">
          <p>Add a file with the file dialog or by dragging and dropping files onto the dashed region</p>
          <input type="file" id="file_picker">
          <div style="text-align:center;">
            <label class="button text-white bg-blue-400 dark:bg-blue-500  rounded-lg text-sm px-5 py-2.5 text-center"
              for="file_picker">Select file</label>
          </div>
        </form>
      </div>
    </section>
  </div>
</template>

<style scoped>
#drop-area {
  border: 2px dashed #ccc;
  border-radius: 20px;
  width: 200px;
  margin: 50px auto;
  padding: 20px;
}

@media screen and (min-width: 80rem) {
  #drop-area {
    width: 450px;
  }
}

#drop-area.highlight {
  border-color: purple;
}

p {
  margin-top: 0;
}

.my-form {
  margin-bottom: 10px;
}

#file_picker {
  display: none;
}

.button {
  display: inline-block;
  padding: 10px;
  background: #6e86ca;
  width: 120px;
  cursor: pointer;
  border-radius: 5px;
  border: 1px solid #ccc;
}

.button:hover {
  background: #4f6fc5;
}
</style>
