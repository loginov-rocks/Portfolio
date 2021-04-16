import { AppEnhancer } from 'Layers/Behavior/Enhancers/AppEnhancer/AppEnhancer';

import { App as AppComponent, AppProps } from './App';

export const App = AppEnhancer<AppProps>()(AppComponent);
