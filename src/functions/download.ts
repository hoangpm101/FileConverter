const download = (blob: Blob, name: string, extend: string) => {
  const element = window.document.createElement('a')
  element.href = window.URL.createObjectURL(blob)
  element.download = name.concat(extend)
  document.body.appendChild(element)
  element.click()
  document.body.removeChild(element)
}

export default download
