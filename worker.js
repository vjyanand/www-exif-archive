
importScripts('/exif-wasm.js?a');

onmessage = async function (e) {
    let f = e.data.file
    let hashHex = "tmppdf"
    if (crypto.subtle) {
        const hashBuffer = await crypto.subtle.digest("SHA-256", f)
        const hashArray = Array.from(new Uint8Array(hashBuffer))
        hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("")
    }
    const fName = hashHex.slice(0, hashHex.length / 2)
    const fRandom = hashHex.slice(hashHex.length / 2, hashHex.length)

    let filename = fName
    let stream = FS.open(filename, 'w+')
    FS.write(stream, f, 0, f.length, 0)
    FS.close(stream)
    let exif_parser = new Module.ExifParser(filename, fRandom)
    let result = exif_parser.exif_read()
    this.postMessage(result)
}

Module.onRuntimeInitialized = function() {
    console.log("Initilized")
}