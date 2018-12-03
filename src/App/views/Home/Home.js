/* @flow */

import * as React from 'react';

import PositionsList from 'Portfolio/components/PositionsList';
import Progress from 'Shared/components/Progress';

const Home = ({
  handleCreatePositionClick, handleProfileClick, positions, positionsLoading,
}) => (
  <React.Fragment>

    <h1>Home</h1>

    <div>
      <button onClick={handleCreatePositionClick}>Create position</button>
      <button onClick={handleProfileClick}>Profile</button>
    </div>

    <div>
      {positionsLoading
        ? <Progress />
        : <PositionsList onClick={(position) => console.log(position)} positions={positions} />}
    </div>

  </React.Fragment>
);

export default Home;
