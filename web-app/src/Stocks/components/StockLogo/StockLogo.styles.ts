import { withStyles } from '@material-ui/core';

export default withStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: '10%',
    objectFit: 'contain',
  },
}));
