import * as React from 'react';

import Progress from 'Shared/components/Progress';

interface Props {
  classes: { [key: string]: string };
}

const Loading: React.FunctionComponent<Props> = ({ classes }: Props) => (
  <div className={classes.root}>
    <Progress size="large" />
  </div>
);

export default Loading;
