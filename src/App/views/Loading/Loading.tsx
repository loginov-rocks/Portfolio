import * as React from 'react';

import Progress from 'Shared/components/Progress';

const Loading: React.FunctionComponent = () => (
  <React.Fragment>

    <h1>Loading</h1>

    <div>
      <Progress />
    </div>

  </React.Fragment>
);

export default Loading;
