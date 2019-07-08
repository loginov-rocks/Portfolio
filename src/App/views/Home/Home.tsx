import * as React from 'react';

import { Position } from 'Portfolio/lib';
import Money from 'Shared/components/Money';
import Progress from 'Shared/components/Progress';

import OpenPositionsList from '../../components/OpenPositionsList';
import StockPositionsValue, {
  RenderProps as StockPositionsValueRenderProps,
} from '../../components/StockPositionsValue';

export interface Props {
  handleCreatePositionClick: () => void;
  handlePositionClick: (position: Position) => void;
  handleProfileClick: () => void;
  positions: Position[];
  positionsLoading: boolean;
}

const Home: React.FunctionComponent<Props> = ({
  handleCreatePositionClick, handlePositionClick, handleProfileClick, positions, positionsLoading,
}: Props) => (
  <React.Fragment>

    <h1>Home</h1>

    <div>
      {positionsLoading
        ? <Progress />
        : (
          <StockPositionsValue positions={positions}>
            {({ value }: StockPositionsValueRenderProps) => <Money value={value} />}
          </StockPositionsValue>
        )}
    </div>

    <div>
      <button onClick={handleCreatePositionClick} type="button">Create position</button>
      <button onClick={handleProfileClick} type="button">Profile</button>
    </div>

    <div>
      {positionsLoading
        ? <Progress />
        : <OpenPositionsList onClick={handlePositionClick} positions={positions} />}
    </div>

  </React.Fragment>
);

export default Home;
