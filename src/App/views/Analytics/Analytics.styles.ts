import { withStyles } from '@material-ui/core';

import { viewRoot } from 'Styles/mixins';

export default withStyles(theme => ({
  root: viewRoot(theme),
  row: {
    alignItems: 'center',
    display: 'flex',
  },
  rowCompanyName: {
    width: '30%',
  },
  rowPercent: {
    textAlign: 'right',
    width: '20%',
  },
  rowShare: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: 3,
    height: 6,
    position: 'relative',
    width: '50%',
  },
  rowsWrapper: {
    width: '100%',
  },
  shareBar: {
    borderRadius: 3,
    bottom: 0,
    left: 0,
    position: 'absolute',
    top: 0,
    width: 0,
  },
}));
