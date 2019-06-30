import * as React from 'react';

import GoogleLoginButton from 'User/components/GoogleLoginButton';

const Guest: React.FunctionComponent = () => (
  <React.Fragment>

    <h1>Welcome!</h1>

    <div>
      <GoogleLoginButton />
    </div>

  </React.Fragment>
);

export default Guest;
