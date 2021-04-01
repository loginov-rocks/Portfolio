import { createMuiTheme, CssBaseline } from '@material-ui/core';
import { MuiThemeProvider } from '@material-ui/core/styles';
import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
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
  let component = null;

  if (progress) {
    // TODO: Pending fix from the Material UI library.
    // @ts-ignore
    component = <Loading />;
  } else if (!isAuthenticated) {
    // TODO: Pending fix from the Material UI library.
    // @ts-ignore
    component = <Guest />;
  } else {
    component = (
      <BrowserRouter>
        <Navigation />
      </BrowserRouter>
    );
  }

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {/* TODO: Pending fix from the Material UI library. */}
      {/* @ts-ignore */}
      <PersistGate loading={<Loading />} persistor={persistor}>
        {component}
      </PersistGate>
    </MuiThemeProvider>
  );
};

export default App;
