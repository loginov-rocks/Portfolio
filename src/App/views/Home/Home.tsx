import * as React from 'react';

import { Position } from 'Portfolio/lib';
import Money from 'Shared/components/Money';
import Progress from 'Shared/components/Progress';

import OpenPositionsList from '../../components/OpenPositionsList';
import StockPositionsValue, {
  RenderProps as StockPositionsValueRenderProps,
} from '../../components/StockPositionsValue';

export interface Props {
  handlePositionClick: (position: Position) => void;
  positions: Position[];
  positionsLoading: boolean;
}

const Home: React.FunctionComponent<Props> = ({
  handlePositionClick, positions, positionsLoading,
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
      {positionsLoading
        ? <Progress />
        : <OpenPositionsList onClick={handlePositionClick} positions={positions} />}
    </div>

  </React.Fragment>
);

export default Home;
