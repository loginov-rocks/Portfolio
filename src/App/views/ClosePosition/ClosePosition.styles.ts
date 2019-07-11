import { withStyles } from '@material-ui/core';

export default withStyles(theme => ({
  back: {
    left: theme.spacing(6 - 3),
    position: 'absolute',
    top: theme.spacing(6 + 3) - (48 - 39) / 2, // Back button height - headline width.
  },
  headline: {
    marginBottom: theme.spacing(3),
    marginLeft: 48 - theme.spacing(3), // Back button width.
    marginRight: 48 - theme.spacing(3), // Back button width.
    marginTop: theme.spacing(3),
    textAlign: 'center',
  },
  root: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(6),
    position: 'relative',
  },
}));
