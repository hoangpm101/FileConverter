import { FileValidated } from 'dropzone-ui'
import download from './download'

const checkEmptyValue = (value: string) => {
  return value === ''
}

const csvToJSON = (files: FileValidated[]) => {
  if (files) {
    files.map((fileValidated) => {
      const fileReader = new FileReader()
      fileReader.readAsText(fileValidated.file)
      fileReader.onload = function () {
        const name = fileValidated.file.name.split('.').shift()
        if (name !== undefined) {
          const text = fileReader.result as string
          const lines = text.split('\n')
          const result = [] as object[]
          const headers = lines[0].split(',')
          for (let i = 1; i < lines.length; i++) {
            let obj = {} as object
            const currentLine = lines[i].split(',')
            if (!currentLine.every(checkEmptyValue)) {
              for (let j = 0; j < headers.length; j++) {
                if (currentLine[j] !== null && currentLine[j] !== undefined)
                  obj = { ...obj, [headers[j]]: currentLine[j] }
                else obj = { ...obj, [headers[j]]: '' }
              }
              result.push(obj)
            }
          }

          const blob = new Blob([JSON.stringify(result, null, 2)], {
            type: 'application/json',
          })
          download(blob, name, '.json')
        }
      }
    })
  }
}

export default csvToJSON
