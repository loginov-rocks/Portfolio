import * as React from 'react';

import { Progress } from 'Layers/Presentation/Progress';

interface Props {
  classes: { [key: string]: string };
}

export const Loading: React.FunctionComponent<Props> = ({ classes }: Props) => (
  <div className={classes.root}>
    <Progress size="large" />
  </div>
);
