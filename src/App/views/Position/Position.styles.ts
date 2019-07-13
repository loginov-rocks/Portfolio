import { withStyles } from '@material-ui/core';

import { viewRoot } from 'Styles/mixins';

export default withStyles(theme => ({
  bar: {
    alignItems: 'center',
    borderBottom: `1px solid ${theme.palette.divider}`,
    display: 'flex',
    paddingBottom: theme.spacing(2),
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(2.5),
    paddingTop: theme.spacing(2),
  },
  companyName: {
    flexGrow: 1,
  },
  list: {
    width: '100%',
  },
  logo: {
    marginRight: theme.spacing(1.5),
  },
  root: {
    ...viewRoot(theme),
    padding: theme.spacing(2),
  },
}));
