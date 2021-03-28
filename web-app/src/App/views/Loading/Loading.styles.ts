import { withStyles } from '@material-ui/core';

import { viewRoot } from 'Styles/mixins';

export default withStyles(theme => ({
  root: {
    ...viewRoot(theme),
    justifyContent: 'center',
  },
}));
