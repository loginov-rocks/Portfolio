import { withStyles } from '@material-ui/core';

import { viewHeadline, viewRoot } from 'Styles/mixins';

export default withStyles((theme) => ({
  avatar: {
    height: 128,
    marginBottom: theme.spacing(3),
    marginTop: theme.spacing(3),
    width: 128,
  },
  headline: viewHeadline(theme),
  root: {
    ...viewRoot(theme),
    justifyContent: 'center',
  },
  signOut: {
    marginBottom: theme.spacing(3),
    marginTop: theme.spacing(3),
  },
}));
