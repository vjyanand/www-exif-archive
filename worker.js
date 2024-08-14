
importScripts('/exif-wasm.js?a');
let exif_parser = null
onmessage = async function (e) {
    const action = e.data.type;
    switch (action) {
        case 'file':
            await exif_file(e.data.file)
            break;
        case 'delete':
            await exif_delete(e.data.exif_key)
            break;
        default:
            console.log("default")
    }
}

exif_delete = async function (key) {
    let result = exif_parser.exif_delete(key)
    this.postMessage({ type: 'delete', data: result })
}

exif_file = async function (file) {
    let hashHex = "tmppdf"
    if (crypto.subtle) {
        const hashBuffer = await crypto.subtle.digest("SHA-256", file)
        const hashArray = Array.from(new Uint8Array(hashBuffer))
        hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("")
    }
    const fName = hashHex.slice(0, hashHex.length / 2)
    const fRandom = hashHex.slice(hashHex.length / 2, hashHex.length)

    let filename = fName
    let stream = FS.open(filename, 'w+')
    FS.write(stream, file, 0, file.length, 0)
    FS.close(stream)
    exif_parser = new Module.ExifParser(filename, fRandom)
    let result = exif_parser.exif_read()
    this.postMessage({ type: 'exif', data: result })
}

Module.onRuntimeInitialized = function () {
    console.log("Initilized")
}