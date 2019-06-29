import * as React from 'react';

import CreatePositionForm from 'Portfolio/components/CreatePositionForm';

const CreatePosition = ({ handleHomeClick, handleOnCreate }) => (
  <React.Fragment>

    <div>
      <button onClick={handleHomeClick}>Home</button>
    </div>

    <h1>Create position</h1>

    <CreatePositionForm onCreate={handleOnCreate} />

  </React.Fragment>
);

export default CreatePosition;
