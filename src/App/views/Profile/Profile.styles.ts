import { withStyles } from '@material-ui/core';

export default withStyles(theme => ({
  avatar: {
    height: 128,
    marginBottom: theme.spacing(3),
    marginTop: theme.spacing(3),
    width: 128,
  },
  email: {
    //
  },
  headline: {
    marginBottom: theme.spacing(3),
    marginTop: theme.spacing(3),
    textAlign: 'center',
  },
  name: {
    //
  },
  root: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(6),
  },
  signOut: {
    marginBottom: theme.spacing(3),
    marginTop: theme.spacing(3),
  },
}));
