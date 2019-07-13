import { withStyles } from '@material-ui/core';

import { viewHeadline, viewRoot } from 'Styles/mixins';

export default withStyles(theme => ({
  bar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  headline: viewHeadline(theme),
  root: {
    ...viewRoot(theme),
    paddingBottom: theme.spacing(2),
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: theme.spacing(2),
  },
}));
