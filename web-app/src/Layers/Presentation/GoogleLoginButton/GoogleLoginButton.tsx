import * as React from 'react';

import { ProviderLoginButton } from 'Layers/Presentation/ProviderLoginButton';

export const GoogleLoginButton: React.FunctionComponent = () => (
  <ProviderLoginButton provider="google">
    Sign in with Google
  </ProviderLoginButton>
);
