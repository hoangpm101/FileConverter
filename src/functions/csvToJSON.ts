import Papa from 'papaparse'
import { FileValidated } from 'dropzone-ui'

const csvToJSON = (files: FileValidated[]) => {
  if (files) {
    files.map((fileValidated) =>
      Papa.parse(fileValidated.file, {
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true,
        complete: function (results) {
          const name = fileValidated.file.name.split('.').shift()
          if (name !== undefined) {
            const blob = new Blob([JSON.stringify(results.data, null, 2)], {
              type: 'application/json',
            })
            const element = window.document.createElement('a')
            element.href = window.URL.createObjectURL(blob)
            element.download = name.concat('.json')
            document.body.appendChild(element)
            element.click()
            document.body.removeChild(element)
          }
        },
      })
    )
  }
}

export default csvToJSON
