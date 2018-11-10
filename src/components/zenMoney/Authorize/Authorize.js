/* @flow */

import * as React from 'react';

const Authorize = ({ handleAuthorize, progress }) => (
  <div>
    {progress
      ? <span>Progress...</span>
      : <button onClick={handleAuthorize}>Sign in</button>}
  </div>
);

export default Authorize;
