import { withStyles } from '@material-ui/core';

import { viewRoot } from 'Styles/mixins';

export default withStyles(theme => ({
  chartWrapper: {
    height: '50%',
    width: '100%',
  },
  root: viewRoot(theme, { dense: true }),
  row: {
    alignItems: 'center',
    display: 'flex',
    paddingBottom: theme.spacing(0.5),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    paddingTop: theme.spacing(0.5),
  },
  rowCompanyName: {
    paddingRight: theme.spacing(),
    width: '40%',
  },
  rowPercent: {
    textAlign: 'right',
    width: '20%',
  },
  rowShare: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.spacing(0.5),
    height: theme.spacing(),
    position: 'relative',
    width: '40%',
  },
  rowsWrapper: {
    width: '100%',
  },
  shareBar: {
    borderRadius: theme.spacing(0.5),
    bottom: 0,
    left: 0,
    position: 'absolute',
    top: 0,
    width: 0,
  },
}));
