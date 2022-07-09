import { FileValidated } from 'dropzone-ui'
import download from './download'

const jsonToCSV = (files: FileValidated[]) => {
  files.map((fileValidated) => {
    const fileReader = new FileReader()
    fileReader.readAsText(fileValidated.file)
    fileReader.onload = function () {
      const name = fileValidated.file.name.split('.').shift()
      if (name !== undefined) {
        const json = JSON.parse(fileReader.result as string)
        const headers = Object.keys(json[0])
        const csv = [
          headers.join(','),
          ...json.map((row: any) =>
            headers.map((header) => JSON.stringify(row[header])).join(',')
          ),
        ].join('\r\n')
        const blob = new Blob([csv], {
          type: 'text/csv',
        })
        download(blob, name, '.csv')
      }
    }
  })
}

export default jsonToCSV
