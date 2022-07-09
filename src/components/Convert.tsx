import { Box, Button, FormControl, InputLabel, Select } from '@material-ui/core'
import {
  getProperty,
  webmToMP4,
  csvToJSON,
  jsonToCSV,
  mp4ToWebm,
} from 'src/functions'
import { useStyles } from 'src/styles/app'
import { FileValidated } from 'dropzone-ui'

interface Props {
  files: FileValidated[]
  acceptType: string
  setAcceptType: React.Dispatch<React.SetStateAction<string>>
}
const Convert = ({ files, acceptType, setAcceptType }: Props) => {
  const classes = useStyles()
  const types: string[] = ['video', 'application']
  const convertTypes: object = {
    video: ['webm', 'mp4'],
    application: ['json', 'csv'],
  }
  const handleChangeType = (
    e: React.ChangeEvent<{
      name?: string
      value: unknown
    }>
  ) => {
    e.target.value !== ''
      ? setAcceptType((e.target.value as string).concat(`/*`))
      : setAcceptType(e.target.value as string)
  }
  const handleConvert = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    switch (e.currentTarget.convertType.value) {
      case 'json':
        csvToJSON(files)
        break
      case 'csv':
        jsonToCSV(files)
        break
      case 'mp4':
        webmToMP4(files)
        break
      case 'webm':
        mp4ToWebm(files)
        break
    }
  }
  return (
    <form onSubmit={(e) => handleConvert(e)}>
      <Box display="flex" style={{ gap: '1%' }}>
        <FormControl
          fullWidth
          margin="dense"
          variant="outlined"
          color="secondary"
        >
          <InputLabel>Select accept type</InputLabel>
          <Select
            required
            native
            defaultValue={``}
            label={`Select accept type`}
            onChange={(e) => handleChangeType(e)}
          >
            <option></option>
            {types.map((type) => (
              <option key={`typeFile ${type}`}>{type}</option>
            ))}
          </Select>
        </FormControl>
        <FormControl
          fullWidth
          margin="dense"
          variant="outlined"
          color="secondary"
        >
          <InputLabel>Select type to convert</InputLabel>
          <Select
            required
            native
            defaultValue={``}
            label={`Select type to convert`}
            name="convertType"
          >
            <option></option>
            {getProperty(convertTypes, acceptType.replace('/*', '')).map(
              (convertType) => (
                <option key={`convertTypeFile ${convertType}`}>
                  {convertType}
                </option>
              )
            )}
          </Select>
        </FormControl>
        <Button variant="contained" className={classes.button} type="submit">
          convert
        </Button>
      </Box>
    </form>
  )
}

export default Convert
