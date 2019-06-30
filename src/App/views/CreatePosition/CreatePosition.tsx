import * as React from 'react';

import CreatePositionForm from 'Portfolio/components/CreatePositionForm';

interface Props {
  children: JSX.Element;
  handleHomeClick: () => void;
  handleOnCreate: () => void;
}

const CreatePosition = ({ handleHomeClick, handleOnCreate }: Props) => (
  <React.Fragment>

    <div>
      <button onClick={handleHomeClick} type="button">Home</button>
    </div>

    <h1>Create position</h1>

    <CreatePositionForm onCreate={handleOnCreate} />

  </React.Fragment>
);

export default CreatePosition;
