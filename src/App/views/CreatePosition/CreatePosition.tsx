import { Typography } from '@material-ui/core';
import * as React from 'react';

import CreatePositionForm from 'Portfolio/components/OpenPositionForm';

export interface Props {
  classes: { [key: string]: string };
  handleCreate: () => void;
}

const CreatePosition: React.FunctionComponent<Props> = ({ classes, handleCreate }: Props) => (
  <div className={classes.root}>

    <Typography className={classes.headline} variant="h4">Open position</Typography>

    <CreatePositionForm onCreate={handleCreate} />

  </div>
);

export default CreatePosition;
