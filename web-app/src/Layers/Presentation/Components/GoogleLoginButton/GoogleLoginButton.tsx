import * as React from 'react';

import { ProviderLoginButton } from 'Layers/Presentation/Components/ProviderLoginButton';

export const GoogleLoginButton: React.FunctionComponent = () => (
  <ProviderLoginButton provider="google">
    Sign in with Google
  </ProviderLoginButton>
);
