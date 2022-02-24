import { FileValidated } from 'dropzone-ui'

const jsonToCSV = (files: FileValidated[]) => {
  files.map((fileValidated) => {
    const fileReader = new FileReader()
    fileReader.readAsText(fileValidated.file)
    fileReader.onload = function () {
      const json = JSON.parse(fileReader.result as string)
      const headers = Object.keys(json[0])
      const csv = [
        headers.join(','),
        ...json.map((row: any) =>
          headers.map((header) => JSON.stringify(row[header])).join(',')
        ),
      ].join('\r\n')
      const name = fileValidated.file.name.split('.').shift()
      if (name !== undefined) {
        const blob = new Blob([csv], {
          type: 'text/csv',
        })
        const element = window.document.createElement('a')
        element.href = window.URL.createObjectURL(blob)
        element.download = name.concat('.csv')
        document.body.appendChild(element)
        element.click()
        document.body.removeChild(element)
      }
    }
  })
}

export default jsonToCSV
