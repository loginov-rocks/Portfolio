import { withStyles } from '@material-ui/core';

import { viewHeadline, viewRoot } from 'Styles/mixins';

export default withStyles((theme) => ({
  headline: viewHeadline(theme),
  root: {
    ...viewRoot(theme),
    justifyContent: 'center',
  },
}));
