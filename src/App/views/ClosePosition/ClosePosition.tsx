import * as React from 'react';

import ClosePositionForm from 'Portfolio/components/ClosePositionForm';
import { Position } from 'Portfolio/lib';
import Progress from 'Shared/components/Progress';

export interface Props {
  handleBackClick: () => void;
  position: Position | null;
  positionLoading: boolean;
}

const ClosePosition: React.FunctionComponent<Props> = ({
  handleBackClick, position, positionLoading,
}: Props) => (
  <React.Fragment>

    <div>
      <button onClick={handleBackClick} type="button">Back</button>
    </div>

    <h1>Close position</h1>

    <div>
      {positionLoading || !position
        ? <Progress />
        : <ClosePositionForm id={position.id} onClose={handleBackClick} />}
    </div>

  </React.Fragment>
);

export default ClosePosition;
