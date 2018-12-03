/* @flow */

import * as React from 'react';

import PositionsList from 'Portfolio/components/PositionsList';
import type { Position } from 'Portfolio/lib/flow';
import Progress from 'Shared/components/Progress';

type Props = {
  handleCreatePositionClick: () => void,
  handlePositionClick: () => void,
  handleProfileClick: () => void,
  positions: Array<Position>,
  positionsLoading: boolean,
};

const Home = ({
  handleCreatePositionClick, handlePositionClick, handleProfileClick, positions,
  positionsLoading,
}: Props) => (
  <React.Fragment>

    <h1>Home</h1>

    <div>
      <button onClick={handleCreatePositionClick}>Create position</button>
      <button onClick={handleProfileClick}>Profile</button>
    </div>

    <div>
      {positionsLoading
        ? <Progress />
        : <PositionsList onClick={handlePositionClick} positions={positions} />}
    </div>

  </React.Fragment>
);

export default Home;
