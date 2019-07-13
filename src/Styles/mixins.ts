import { Theme } from '@material-ui/core';
import { CSSProperties } from '@material-ui/styles/withStyles/withStyles';

export const viewHeadline = (theme: Theme): CSSProperties => ({
  marginBottom: theme.spacing(2),
  marginTop: theme.spacing(2),
  textAlign: 'center',
});

export const viewRoot = (theme: Theme): CSSProperties => ({
  alignItems: 'center',
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1,
  padding: theme.spacing(4),
});
