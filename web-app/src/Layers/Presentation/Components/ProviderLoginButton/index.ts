import {
  ProviderLoginButtonEnhancer,
} from 'Layers/Behavior/Enhancers/ProviderLoginButtonEnhancer/ProviderLoginButtonEnhancer';

import { ProviderLoginButton as ProviderLoginButtonComponent, ProviderLoginButtonProps } from './ProviderLoginButton';

export const ProviderLoginButton = ProviderLoginButtonEnhancer<ProviderLoginButtonProps>()(
  ProviderLoginButtonComponent,
);
