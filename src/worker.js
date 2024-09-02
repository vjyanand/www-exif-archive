importScripts('/assets/exif-wasm.js?a');

let exif_parser = null

onmessage = async function (e) {
  const action = e.data.type;
  switch (action) {
    case 'file':
      await exif_process(e.data.file)
      break;
    case 'delete':
      await exif_delete(e.data.exif_key)
      break;
    case 'delete_all':
      try {
        await exif_delete_all()
      } catch (e) {
        postMessage({ type: 'delete_all', data: false })
      }
      break;
    case 'download':
      await file_download(e.data.filename)
      break;
    default:
      console.log("default - worker")
  }
}

const exif_delete_all = async function (key) {
  let result = exif_parser.exif_delete_all()
  postMessage({ type: 'delete_all', data: result })
}

const file_download = async function (filename) {
  let result = FS.readFile(filename, { encoding: 'binary' })
  postMessage({ type: 'download', data: result })
}

const exif_delete = async function (key) {
  let result = exif_parser.exif_delete(key)
  postMessage({ type: 'delete', data: result })
}

const exif_process = async function (file) {
  let hashHex = "tmp"
  if (crypto.subtle) {
    const hashBuffer = await crypto.subtle.digest("SHA-256", file)
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("")
  }
  let filename = hashHex.slice(0, hashHex.length / 2)
  const fRandom = hashHex.slice(hashHex.length / 2, hashHex.length)

  let stream = FS.open(filename, 'w+')
  FS.write(stream, file, 0, file.length, 0)
  FS.close(stream)
  exif_parser && exif_parser.delete()
  exif_parser = new Module.ExifParser(filename, fRandom)
  let result = exif_parser.exif_read()
  postMessage({ type: 'exif', data: result, image_name: filename })
}

Module.onRuntimeInitialized = function () {
  postMessage({ type: 'wasm', data: {} })
}