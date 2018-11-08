/* @flow */

import * as React from 'react';

const Authorize = ({ handleAuthorize }) => (
  <div>
    <button onClick={handleAuthorize}>Sign in</button>
  </div>
);

export default Authorize;
