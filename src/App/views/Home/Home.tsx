import * as React from 'react';

import { Position } from 'Portfolio/lib/flow';
import Progress from 'Shared/components/Progress';

import StockPositionsList from '../../components/StockPositionsList';
import StockPositionsValue from '../../components/StockPositionsValue';

interface Props {
  children: JSX.Element;
  handleCreatePositionClick: () => void;
  handlePositionClick: () => void;
  handleProfileClick: () => void;
  positions: Position[];
  positionsLoading: boolean;
}

const Home = ({
  handleCreatePositionClick, handlePositionClick, handleProfileClick, positions, positionsLoading,
}: Props) => (
  <React.Fragment>

    <h1>Home</h1>

    <div>
      <button onClick={handleCreatePositionClick} type="button">Create position</button>
      <button onClick={handleProfileClick} type="button">Profile</button>
    </div>

    <div>
      {positionsLoading
        ? <Progress />
        : (
          <StockPositionsValue positions={positions}>
            {({ value }) => value.toFixed(2)}
          </StockPositionsValue>
        )}
    </div>

    <div>
      {positionsLoading
        ? <Progress />
        : (
          <StockPositionsList
            onClick={handlePositionClick}
            positions={positions}
          />
        )}
    </div>

  </React.Fragment>
);

export default Home;
