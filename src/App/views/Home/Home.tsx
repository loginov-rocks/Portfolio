import { Tab, Tabs } from '@material-ui/core';
import * as React from 'react';

import { Position } from 'Portfolio/lib';
import Money from 'Shared/components/Money';
import Progress from 'Shared/components/Progress';

import ClosedPositionsList from '../../components/ClosedPositionsList';
import OpenPositionsList from '../../components/OpenPositionsList';
import StockPositionsValue, {
  RenderProps as StockPositionsValueRenderProps,
} from '../../components/StockPositionsValue';

export interface Props {
  handlePositionClick: (position: Position) => void;
  handleTabChange: () => void;
  positions: Position[];
  positionsLoading: boolean;
  tab: number;
}

const Home: React.FunctionComponent<Props> = ({
  handlePositionClick, handleTabChange, positions, positionsLoading, tab,
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

    <Tabs onChange={handleTabChange} value={tab}>
      <Tab label="Open" />
      <Tab label="Closed" />
    </Tabs>

    <div>
      {positionsLoading
        ? <Progress />
        : (
          <React.Fragment>
            {tab === 0 && <OpenPositionsList onClick={handlePositionClick} positions={positions} />}
            {tab === 1 && <ClosedPositionsList onClick={handlePositionClick} positions={positions} />}
          </React.Fragment>
        )}
    </div>

  </React.Fragment>
);

export default Home;
