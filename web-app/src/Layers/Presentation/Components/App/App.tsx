import { createMuiTheme, CssBaseline } from '@material-ui/core';
import { MuiThemeProvider } from '@material-ui/core/styles';
import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Persistor } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

// TODO: Better split architectural layers.
import Navigation from 'App/components/Navigation';
import { AppEnhancerProps } from 'Layers/Behavior/Enhancers/AppEnhancer/AppEnhancer';
import { Guest } from 'Layers/Presentation/Components/Guest';
import { Loading } from 'Layers/Presentation/Components/Loading';
import { themeOptions } from 'Styles/themeOptions';

const theme = createMuiTheme(themeOptions);

export interface AppProps {
  persistor: Persistor;
}

type Props = AppProps & AppEnhancerProps;

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
