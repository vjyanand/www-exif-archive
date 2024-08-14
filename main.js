function makeTable(data) {
    let result = JSON.parse(data);
    let exif = result["exif"];

    exif.unshift({ "label": "Mime", "value": result["mime"], "key": "mime", "desc": "Mime type", "typeName": "" })
    exif.unshift({ "label": "Pixel Height", "value": result["height"] , "key": "pixel_height", "desc": "Pixel Height", "typeName": "" })
    exif.unshift({ "label": "Pixel Width", "value": result["width"] , "key": "pixel_width", "desc": "Pixel Width", "typeName": "" })
    exif.unshift({ "label": "Byte Order", "value": (result["byte_order"] == 1 ? "littleEndian" : "bigEndian"), "key": "byte_order", "desc": "Byte Order", "typeName": "" })

    const table_div = document.getElementById("exif-div"), tbl = document.createElement('table');
    tbl.setAttribute("id", "exif-table")
    for (const index in exif) {
        const row = exif[index]
        const tr = tbl.insertRow();
        const td_label = tr.insertCell();
        const outer_span = document.createElement("span")
        outer_span.className = "tooltip"
        outer_span.innerText = "ⓘ"
        outer_span.setAttribute("title", row["desc"])
        td_label.appendChild(document.createTextNode(row["label"]));
        td_label.appendChild(outer_span);
        const td_value = tr.insertCell();
        td_value.appendChild(document.createTextNode(row["value"]));
        tr.setAttribute("data-key", row["key"])
        tr.setAttribute("data-desc", row["desc"])
        tr.setAttribute("data-type", row["typeName"])
    }
    table_div.firstChild && table_div.firstChild.remove()
    table_div.appendChild(tbl);
}

window.onload = (event) => {
    let myWorker = new Worker('./worker.js?f3')
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
            myWorker.postMessage({ file: data });
        }
        reader.readAsArrayBuffer(file)
        myWorker.onmessage = function (e) {
            makeTable(e.data)
            //console.dir(e.data)
            //alert(JSON.stringify(e.data))

        }
    }

    document.getElementById("file_picker").addEventListener("change", function () {
        let file = this.files[0];
        handleFile(file)
    })

}

function preventDefaults(e) {
    e.preventDefault()
    e.stopPropagation()
}

function highlight(e) {
    let dropArea = document.getElementById("drop-area")
    dropArea.classList.add('highlight')
}

function unhighlight(e) {
    let dropArea = document.getElementById("drop-area")
    dropArea.classList.remove('highlight')
}