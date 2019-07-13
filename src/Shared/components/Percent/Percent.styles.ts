import { withStyles } from '@material-ui/core';
import { green, grey, red } from '@material-ui/core/colors';

export default withStyles({
  negative: {
    color: red.A400,
  },
  neutral: {
    color: grey.A400,
  },
  positive: {
    color: green.A400,
  },
});
