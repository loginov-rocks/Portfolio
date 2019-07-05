import * as React from 'react';

import CreatePositionForm from 'Portfolio/components/OpenPositionForm';

export interface Props {
  handleCreate: () => void;
  handleHomeClick: () => void;
}

const CreatePosition: React.FunctionComponent<Props> = ({ handleCreate, handleHomeClick }: Props) => (
  <React.Fragment>

    <div>
      <button onClick={handleHomeClick} type="button">Home</button>
    </div>

    <h1>Create position</h1>

    <CreatePositionForm onCreate={handleCreate} />

  </React.Fragment>
);

export default CreatePosition;
