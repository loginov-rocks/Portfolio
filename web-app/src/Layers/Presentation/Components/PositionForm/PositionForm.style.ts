import { withStyles } from '@material-ui/core';

export const style = withStyles((theme) => ({
  buttons: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  row: {
    marginBottom: theme.spacing(1),
    marginTop: theme.spacing(1),
    textAlign: 'center',
  },
}));
