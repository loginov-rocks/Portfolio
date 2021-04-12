import { AppEnhancer } from 'Layers/Behavior/AppEnhancer/AppEnhancer';

import { App as AppComponent, AppProps } from './App';

export const App = AppEnhancer<AppProps>()(AppComponent);
