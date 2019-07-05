import * as React from 'react';

import { Position as PositionInterface } from 'Portfolio/lib';
import Progress from 'Shared/components/Progress';

export interface Props {
  handleCloseClick: () => void;
  handleDeleteClick: () => void;
  handleHomeClick: () => void;
  position: PositionInterface | null;
  positionLoading: boolean;
}

const Position: React.FunctionComponent<Props> = ({
  handleCloseClick, handleDeleteClick, handleHomeClick, position, positionLoading,
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

    {position && position.closeDate === null
      ? (
        <div>
          <button onClick={handleCloseClick} type="button">Close</button>
        </div>
      ) : null}

    <div>
      <button onClick={handleDeleteClick} type="button">Delete</button>
    </div>

  </React.Fragment>
);

export default Position;
