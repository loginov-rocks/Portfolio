import { createMuiTheme, CssBaseline } from '@material-ui/core';
import { MuiThemeProvider } from '@material-ui/core/styles';
import * as React from 'react';

import themeOptions from 'Styles/themeOptions';

import Navigation from '../Navigation';
import Guest from '../../views/Guest';
import Loading from '../../views/Loading';

export interface Props {
  isAuthenticated: boolean;
  progress: boolean;
}

const theme = createMuiTheme(themeOptions);

const App: React.FunctionComponent<Props> = ({ isAuthenticated, progress }: Props) => {
  let Component = null;

  if (progress) {
    Component = Loading;
  } else if (!isAuthenticated) {
    Component = Guest;
  } else {
    Component = Navigation;
  }

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Component />
    </MuiThemeProvider>
  );
};

export default App;
