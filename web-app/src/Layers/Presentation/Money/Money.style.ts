import { withStyles } from '@material-ui/core';
import { green, grey, red } from '@material-ui/core/colors';

export const style = withStyles({
  negative: {
    color: red.A400,
  },
  neutral: {
    color: grey.A200,
  },
  positive: {
    color: green.A400,
  },
});
