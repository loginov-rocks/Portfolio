/* @flow */

import * as React from 'react';

const CreatePosition = ({ handleHomeClick }) => (
  <React.Fragment>

    <div>
      <button onClick={handleHomeClick}>Home</button>
    </div>

    <h1>Create position</h1>

  </React.Fragment>
);

export default CreatePosition;
