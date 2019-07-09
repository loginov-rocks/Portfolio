import { withStyles } from '@material-ui/core';

export default withStyles(theme => ({
  root: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    justifyContent: 'center',
  },
  row: {
    margin: theme.spacing(),
  },
}));
