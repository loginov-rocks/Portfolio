/* @flow */

import * as React from 'react';

const ProviderLoginButton = ({ children, handleClick }) => (
  <button onClick={handleClick}>{children}</button>
);

export default ProviderLoginButton;
