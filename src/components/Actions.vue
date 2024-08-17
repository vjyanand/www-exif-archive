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
    let result = JSON.parse(data);
    let exif = result["exif"];

    exif.unshift({ "label": "Mime", "value": result["mime"], "key": "mime", "typeName": "" })
    exif.unshift({ "label": "Pixel Height", "value": result["height"], "key": "pixel_height", "typeName": "" })
    exif.unshift({ "label": "Pixel Width", "value": result["width"], "key": "pixel_width", "typeName": "" })
    exif.unshift({ "label": "Byte Order", "value": (result["byte_order"] == 1 ? "littleEndian" : "bigEndian"), "key": "byte_order", "typeName": "" })

    const table_div = document.getElementById("exif-div"), tbl = document.createElement('table');

    tbl.setAttribute("id", "exif-table")
    tbl.setAttribute("class", "exif-table")
    for (const index in exif) {
      const row = exif[index]
      const tr = tbl.insertRow();
      const td_label = tr.insertCell();
      td_label.appendChild(document.createTextNode(row["label"]));
      if (row["desc"]) {
        const outer_span = document.createElement("span")
        outer_span.innerText = "ⓘ"
        outer_span.setAttribute("data-bs-toggle", "tooltip")
        outer_span.setAttribute("data-bs-title", row["desc"])
        td_label.appendChild(outer_span);
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
    while (table_div.firstChild) {
      table_div.removeChild(table_div.lastChild)
    }
    table_div.appendChild(tbl);
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