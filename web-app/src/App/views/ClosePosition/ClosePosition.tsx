import { Typography } from '@material-ui/core';
import * as React from 'react';

import { Position } from 'Layers/Business/Services/PortfolioService/Interfaces/Position';
import { Progress } from 'Layers/Presentation/Components/Progress';
import { ClosePositionForm } from 'Layers/Presentation/Components/ClosePositionForm';

export interface Props {
  classes: { [key: string]: string };
  handleBackClick: () => void;
  position: Position | null;
  positionLoading: boolean;
}

const ClosePosition: React.FunctionComponent<Props> = ({
  classes, handleBackClick, position, positionLoading,
}: Props) => (
  <div className={classes.root}>

    <Typography className={classes.headline} variant="h4">Close position</Typography>

    {positionLoading || !position
      ? <Progress />
      : (
        <ClosePositionForm
          onCancelButtonClick={handleBackClick}
          onClose={handleBackClick}
          position={position}
        />
      )}

  </div>
);

export default ClosePosition;
