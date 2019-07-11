import { IconButton, Typography } from '@material-ui/core';
import { ArrowBackOutlined } from '@material-ui/icons';
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

    <IconButton className={classes.back} onClick={handleBackClick}><ArrowBackOutlined /></IconButton>

    <Typography className={classes.headline} variant="h4">Close position</Typography>

    {positionLoading || !position
      ? <Progress />
      : <ClosePositionForm id={position.id} onClose={handleBackClick} />}

  </div>
);

export default ClosePosition;
