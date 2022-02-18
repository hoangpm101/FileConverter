import { Box, Button, FormControl, InputLabel, Select } from '@material-ui/core'
import { getProperty } from 'src/functions'
import { useStyles } from 'src/styles/app'
import { FileValidated } from 'dropzone-ui'
import { csvToJSON } from 'src/functions'

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
    application: ['json', 'pdf', 'docx'],
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
    if (e.currentTarget.convertType.value === 'json') csvToJSON(files)
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
