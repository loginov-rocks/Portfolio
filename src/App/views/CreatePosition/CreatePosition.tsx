import * as React from 'react';

import CreatePositionForm from 'Portfolio/components/OpenPositionForm';

export interface Props {
  handleCreate: () => void;
}

const CreatePosition: React.FunctionComponent<Props> = ({ handleCreate }: Props) => (
  <React.Fragment>

    <h1>Create position</h1>

    <CreatePositionForm onCreate={handleCreate} />

  </React.Fragment>
);

export default CreatePosition;
