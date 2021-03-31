import { withStyles } from '@material-ui/core';

import { viewBar, viewRoot } from 'Styles/mixins';

export default withStyles((theme) => ({
  bar: viewBar(theme),
  root: viewRoot(theme, { dense: true }),
}));
