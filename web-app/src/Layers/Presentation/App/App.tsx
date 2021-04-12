import { createMuiTheme, CssBaseline } from '@material-ui/core';
import { MuiThemeProvider } from '@material-ui/core/styles';
import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Persistor } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

import Navigation from 'App/components/Navigation';
import { Guest } from 'Layers/Presentation/Guest';
import { Loading } from 'Layers/Presentation/Loading';
import { AppEnhancerProps } from 'Layers/Behavior/AppEnhancer/AppEnhancer';
import { themeOptions } from 'Styles/themeOptions';

export interface AppProps {
  persistor: Persistor;
}

type Props = AppProps & AppEnhancerProps;

const theme = createMuiTheme(themeOptions);

// TODO: Better split architectural layers.
export const App: React.FunctionComponent<Props> = ({ isAuthenticated, persistor, progress }: Props) => {
  let component;

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
