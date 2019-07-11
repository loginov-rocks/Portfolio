import { withStyles } from '@material-ui/core';

export default withStyles(theme => ({
  headline: {
    marginBottom: theme.spacing(3),
    marginTop: theme.spacing(3),
    textAlign: 'center',
  },
  root: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(6),
  },
}));
