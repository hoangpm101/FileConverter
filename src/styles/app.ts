import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      width: '15%',
      margin: theme.spacing(1),
      lineHeight: 1.5,
      backgroundColor: '#33eb91',
      color: 'white',
      '&:hover': {
        backgroundColor: 'orange',
      },
    },
  })
)
