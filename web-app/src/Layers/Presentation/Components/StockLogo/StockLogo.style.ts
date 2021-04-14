import { withStyles } from '@material-ui/core';

export const style = withStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: '10%',
    objectFit: 'contain',
  },
}));
