import { withStyles } from '@material-ui/core';

export default withStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  row: {
    margin: theme.spacing(1),
    textAlign: 'center',
  },
}));
