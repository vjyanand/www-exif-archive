<script setup>
import { ref, onMounted } from 'vue'
import { usePageStore } from '@/stores/exif'
import NoTable from './NoTable.vue'
import { Tooltip } from 'flowbite';

const pageStore = usePageStore()
const mtable = ref() //Ref to table
const noTableData = ref(false)

onMounted(() => {
  const data = pageStore.table_data
  let result = JSON.parse(data);
  let exif = result["exif"];

  exif.unshift({ "label": "Mime", "value": result["mime"], "key": "mime", "typeName": "" })
  exif.unshift({ "label": "Pixel Height", "value": result["height"], "key": "pixel_height", "typeName": "" })
  exif.unshift({ "label": "Pixel Width", "value": result["width"], "key": "pixel_width", "typeName": "" })
  exif.unshift({ "label": "Byte Order", "value": (result["byte_order"] == 1 ? "littleEndian" : "bigEndian"), "key": "byte_order", "typeName": "" })

  const tbl = mtable.value;
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

      const tooltip = new Tooltip(tooltip_span, outer_span);
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

  }

})
</script>
<template>
  <div class="min-h-screen p-2 overflow-x-auto relative md:mb-12">
    <table class="select-none font-lato max-w-5xl mx-auto my-2" ref="mtable"></table>
    <NoTable v-if="noTableData" />
  </div>



<!-- Light style tooltip -->

<button data-tooltip-target="tooltip-light" data-tooltip-style="light" type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Light tooltip</button>

<div id="tooltip-light" role="tooltip" class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg shadow-sm opacity-0 tooltip">
    Tooltip content
    <div class="tooltip-arrow" data-popper-arrow></div>
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