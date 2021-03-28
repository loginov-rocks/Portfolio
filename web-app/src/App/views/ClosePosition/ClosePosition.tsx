import { Button, Typography } from '@material-ui/core';
import * as React from 'react';

import ClosePositionForm from 'Portfolio/components/ClosePositionForm';
import { Position } from 'Portfolio/lib';
import Progress from 'Shared/components/Progress';

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
          backButton={<Button color="primary" onClick={handleBackClick}>Cancel</Button>}
          id={position.id}
          onClose={handleBackClick}
        />
      )}

  </div>
);

export default ClosePosition;
