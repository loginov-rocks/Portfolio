import { withStyles } from '@material-ui/core';

export default withStyles(theme => ({
  group: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  root: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(2),
  },
  secondary: {
    display: 'flex',
  },
  sum: {
    marginBottom: theme.spacing(1),
    marginTop: theme.spacing(1),
  },
}));
