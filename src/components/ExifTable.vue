<script setup>
import { usePageStore } from '@/stores/exif'
import { Tooltip } from 'flowbite';
import { onMounted } from 'vue';
import { ref } from 'vue'

const editing_field = ref(null)
const pageStore = usePageStore()
const result = pageStore.exif_data
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

function set_editing_field(field) {
  editing_field.value = field
}
function update_field(field) {

}

function delete_field(field) {
  console.log("Deleting - delete_field")
  pageStore.postMessage({ type: "delete", exif_key: field })
}

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
        <template v-if="field.key !== editing_field">
          <td>{{ field.value }}</td>
          <td><img width="220" @click="set_editing_field(`${field.key}`)" src="/assets/img/edit-button.svg" /></td>
        </template>
        <template v-else>

          <td><input type="text" v-bind:placeholder="field.value" v-bind:value="field.value"/></td>
          <td><span style="display: flex;justify-content: space-between;">
              <img width="22" @click="update_field(`${field.key}`)" src="/assets/img/trash-button.svg" />
              <img width="22" @click="delete_field(`${field.key}`)" src="/assets/img/save-button.svg" />
              <img width="22" @click="set_editing_field('')" src="/assets/img/cancel-button.svg" />
            </span>
          </td>
        </template>
      </tr>
    </template>
  </table>
</template>