import * as React from 'react';

import ProviderLoginButton from '../ProviderLoginButton';

const GoogleLoginButton: React.FunctionComponent = () => (
  <ProviderLoginButton provider="google">
    Sign in with Google
  </ProviderLoginButton>
);

export default GoogleLoginButton;
