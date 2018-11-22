/* @flow */

import * as React from 'react';

const LogoutButton = ({ children, handleClick }) => (
  <button onClick={handleClick}>{children}</button>
);

export default LogoutButton;
