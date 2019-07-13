import { createMuiTheme, CssBaseline } from '@material-ui/core';
import { MuiThemeProvider } from '@material-ui/core/styles';
import * as React from 'react';
import { Persistor } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

import themeOptions from 'Styles/themeOptions';

import Navigation from '../Navigation';
import Guest from '../../views/Guest';
import Loading from '../../views/Loading';

export interface Props {
  isAuthenticated: boolean;
  persistor: Persistor;
  progress: boolean;
}

const theme = createMuiTheme(themeOptions);

const App: React.FunctionComponent<Props> = ({ isAuthenticated, persistor, progress }: Props) => {
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
      <PersistGate loading={<Loading />} persistor={persistor}>
        <Component />
      </PersistGate>
    </MuiThemeProvider>
  );
};

export default App;
