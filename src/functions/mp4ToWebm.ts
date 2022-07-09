import { FileValidated } from 'dropzone-ui'
import download from './download'

const mp4ToWebm = async (files: FileValidated[]) => {
  files.map((fileValidated) => {
    const fileReader = new FileReader()
    fileReader.readAsArrayBuffer(fileValidated.file)
    fileReader.onload = function () {
      const name = fileValidated.file.name.split('.').shift()
      if (name !== undefined) {
        const result = fileReader.result as ArrayBuffer
        const blob = new Blob([result], { type: 'video/webm' })
        download(blob, name, '.webm')
      }
    }
  })
}

export default mp4ToWebm
