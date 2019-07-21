import { Theme } from '@material-ui/core';
import { CSSProperties } from '@material-ui/styles/withStyles/withStyles';

export const viewBar = (theme: Theme): CSSProperties => ({
  borderBottom: `1px solid ${theme.palette.divider}`,
});

export const viewHeadline = (theme: Theme): CSSProperties => ({
  marginBottom: theme.spacing(2),
  marginTop: theme.spacing(2),
  textAlign: 'center',
});

interface ViewRootOptions {
  dense?: boolean;
}

export const viewRoot = (theme: Theme, options: ViewRootOptions = {}): CSSProperties => ({
  alignItems: 'center',
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1,
  ...(options.dense ? {
    paddingBottom: theme.spacing(2),
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: theme.spacing(2),
  } : {
    padding: theme.spacing(4),
  }),
});
