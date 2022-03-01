import { FileValidated } from 'dropzone-ui'
import download from './download'

const webmToMP4 = async (files: FileValidated[]) => {
  files.map((fileValidated) => {
    const fileReader = new FileReader()
    fileReader.readAsArrayBuffer(fileValidated.file)
    fileReader.onload = function () {
      const name = fileValidated.file.name.split('.').shift()
      if (name !== undefined) {
        const result = fileReader.result as ArrayBuffer
        const blob = new Blob([result], { type: 'video/mp4' })
        download(blob, name, '.mp4')
      }
    }
  })
}

export default webmToMP4
