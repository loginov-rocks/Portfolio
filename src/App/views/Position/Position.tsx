import * as React from 'react';

import Progress from 'Shared/components/Progress';

import { Props } from './Position.enhancer';

const Position: React.FunctionComponent<Props> = ({
  handleDeleteClick, handleHomeClick, position, positionLoading,
}: Props) => (
  <React.Fragment>

    <div>
      <button onClick={handleHomeClick} type="button">Home</button>
    </div>

    <h1>Position</h1>

    <div>
      {positionLoading
        ? <Progress />
        : JSON.stringify(position)}
    </div>

    <div>
      <button onClick={handleDeleteClick} type="button">Delete</button>
    </div>

  </React.Fragment>
);

export default Position;
