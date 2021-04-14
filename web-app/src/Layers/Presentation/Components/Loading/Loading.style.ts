import { withStyles } from '@material-ui/core';

import { viewRoot } from 'Styles/mixins';

export const style = withStyles((theme) => ({
  root: {
    ...viewRoot(theme),
    justifyContent: 'center',
  },
}));
