import { withStyles } from '@material-ui/core';

import { viewHeadline, viewRoot } from 'Styles/mixins';

export const style = withStyles((theme) => ({
  headline: viewHeadline(theme),
  root: {
    ...viewRoot(theme),
    justifyContent: 'center',
  },
}));
