import { withStyles } from '@material-ui/core';

import { viewHeadline, viewRoot } from 'Styles/mixins';

export default withStyles(theme => ({
  bar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  headline: viewHeadline(theme),
  root: {
    ...viewRoot(theme),
    padding: theme.spacing(2),
  },
}));
