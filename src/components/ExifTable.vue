<script setup>
import { usePageStore } from '@/stores/exif'
import { Tooltip } from 'flowbite';
import { onMounted } from 'vue';

const pageStore = usePageStore()
let f = pageStore.file_name
const data = pageStore.exif_data
let result = JSON.parse(data);
let exif = result["exif"];
exif.unshift({ "label": "Mime", "value": result["mime"], "key": "mime", "typeName": "" })
exif.unshift({ "label": "Pixel Height", "value": result["height"], "key": "pixel_height", "typeName": "" })
exif.unshift({ "label": "Pixel Width", "value": result["width"], "key": "pixel_width", "typeName": "" })
exif.unshift({ "label": "Byte Order", "value": (result["byte_order"] == 1 ? "littleEndian" : "bigEndian"), "key": "byte_order", "typeName": "" })
onMounted(() => {
  let tooltips = document.getElementsByClassName("tooltip")
  const isTouch = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0)
  for (const index in tooltips) {
    let tooltip_span = tooltips[index]
    let outer_span = tooltip_span.previousSibling
    new Tooltip(tooltip_span, outer_span, { triggerType: isTouch ? 'click' : 'hover', onShow: () => { console.log("A") } });
  }
})
</script>
<template>

  <table>
    <template v-for="field in exif">
      <tr v-bind:data-key="field.key" v-bind:data-type="field.typeName" v-bind:data-raw-value="field.value">
        <td>{{ field.label }}
          <span v-if="field.desc">
            ⓘ
          </span>
          <span v-if="field.desc" role="tooltip"
            class="tooltip invisible absolute z-10 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300 dark:bg-gray-700">
            {{ field.desc }}
            <div class="tooltip-arrow" data-popper-arrow=""></div>
          </span>
        </td>
        <template v-if="('editing' in field) === false">
          <td>{{ field.value }}</td>
          <td><img width="22" src="/assets/img/edit-button.svg" /></td>
        </template>
      </tr>
    </template>
  </table>
</template>