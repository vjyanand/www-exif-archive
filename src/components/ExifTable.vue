<script setup>
import { ref, onMounted } from 'vue'
import { usePageStore } from '@/stores/exif'
import { Tooltip } from 'flowbite';

const pageStore = usePageStore()
const mtable = ref() //Ref to table
onMounted(() => {
  const data = pageStore.exif_data
  let result = JSON.parse(data);
  let exif = result["exif"];

  exif.unshift({ "label": "Mime", "value": result["mime"], "key": "mime", "typeName": "" })
  exif.unshift({ "label": "Pixel Height", "value": result["height"], "key": "pixel_height", "typeName": "" })
  exif.unshift({ "label": "Pixel Width", "value": result["width"], "key": "pixel_width", "typeName": "" })
  exif.unshift({ "label": "Byte Order", "value": (result["byte_order"] == 1 ? "littleEndian" : "bigEndian"), "key": "byte_order", "typeName": "" })
  const isTouch = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0)
  const tbl = mtable.value;
  <div v-if="ok">
    a
  </div>
  for (const index in exif) {
    const row = exif[index]
    const tr = tbl.insertRow();
    const td_label = tr.insertCell();
    td_label.appendChild(document.createTextNode(row["label"]));
    if (row["desc"]) {
      const outer_span = document.createElement("span")
      outer_span.innerText = "ⓘ"
      td_label.appendChild(outer_span);

      const tooltip_span = document.createElement("span")
      tooltip_span.innerText = row["desc"]
      tooltip_span.setAttribute("role", "tooltip");
      tooltip_span.className = "tooltip invisible absolute z-10 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300 dark:bg-gray-700";

      const tooltip_arrow = document.createElement("div")
      tooltip_arrow.className = "tooltip-arrow"
      tooltip_arrow.setAttribute("data-popper-arrow", "")
      tooltip_span.appendChild(tooltip_arrow)

      td_label.appendChild(outer_span);
      td_label.appendChild(tooltip_span);

      const tooltip = new Tooltip(tooltip_span, outer_span, { triggerType: isTouch ? 'click' : 'hover', onShow: () => { console.log("A") } });

    }
    const td_value = tr.insertCell();
    td_value.appendChild(document.createTextNode(row["value"]));
    tr.setAttribute("data-key", row["key"])
    tr.setAttribute("data-type", row["typeName"])
    tr.setAttribute("data-raw-value", row["value"])
    const td_delete = tr.insertCell();
    const delete_span = document.createElement("span")
    delete_span.innerText = "⌫"
    delete_span.addEventListener("click", delete_exif);
    td_delete.appendChild(delete_span)
  }

  function delete_exif(e) {
    let exif_key = e.target.parentNode.parentNode.getAttribute("data-key")
    pageStore.postMessage({ type: "delete", exif_key: exif_key })
  }

})
</script>
<template>
  <div class="min-h-screen p-2 overflow-x-auto relative md:mb-12">
    <table class="select-none font-lato max-w-5xl mx-auto my-2" ref="mtable">

    </table>

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

  </div>
</template>

<style scoped>
.flex-container {
  display: flex;
}

table,
th,
td {
  border: 1px solid rgb(207, 207, 207);
  border-collapse: collapse;
}

th,
td {
  padding: 10px;
}

tr:nth-child(odd) {
  background-color: #f9f9f9;
}

tr:nth-child(even) {
  background-color: #fcfcfc;
}
</style>
