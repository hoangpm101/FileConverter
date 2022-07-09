import { Box } from '@material-ui/core'
import { Dropzone, FileItem, FullScreenPreview } from '@dropzone-ui/react'
import { useState } from 'react'
import { FileValidated } from 'dropzone-ui'
import { Convert } from 'src/components'

function App() {
  const [acceptType, setAcceptType] = useState('')
  const [files, setFiles] = useState<FileValidated[]>([])
  const [imageSrc, setImageSrc] = useState({
    src: '',
    open: false,
  })
  const updateFiles = (incomingFiles: FileValidated[]) => {
    setFiles(incomingFiles)
  }
  const onDelete = (id: string | number | undefined) => {
    setFiles(files.filter((x: FileValidated) => x.id !== id))
  }
  const handleSee = (imageSource: string) => {
    imageSource === ''
      ? setImageSrc({ src: imageSource, open: false })
      : setImageSrc({ src: imageSource, open: true })
  }
  const handleClean = (files: FileValidated[]) => {
    files.length > 0
  }

  return (
    <Box>
      <Dropzone
        style={{ minWidth: '550px' }}
        onChange={updateFiles}
        minHeight="195px"
        onClean={handleClean}
        value={files}
        maxFiles={5}
        maxFileSize={3220881911} //3GB
        label="Drag'n drop files here or click to browse"
        accept={acceptType}
        uploadingMessage={'Uploading...'}
        fakeUploading
        //url="" //url for storing files
        //localization={"FR-fr"}
        //disableScroll
        //view={"list"}
        //header={false}
        //footer={false}
      >
        {files.map((file) => (
          <FileItem
            {...file}
            key={`key value ${file.id}`}
            onDelete={(fileId) => onDelete(fileId)}
            onSee={(urlImg) => handleSee(urlImg)}
            preview
            info
            hd
          />
        ))}
        <FullScreenPreview
          imgSource={imageSrc.src}
          openImage={imageSrc.open}
          onClose={() => handleSee('')}
        />
      </Dropzone>
      <Convert
        files={files.filter((file: FileValidated) => file.valid === true)}
        // acceptType={acceptType}
        setAcceptType={setAcceptType}
      />
    </Box>
  )
}

export default App
