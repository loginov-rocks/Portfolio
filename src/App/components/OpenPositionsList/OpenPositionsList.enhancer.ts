import { compose, withProps } from 'recompose';

import * as C from 'Constants';
import { Position } from 'Portfolio/lib';
import { sortCollection } from 'Shared/lib';

import withSorter, { Props as WithSorterProps } from '../../enhancers/withSorter';
import withStockPositions, { Props as WithStockPositionsProps } from '../../enhancers/withStockPositions';
import { StockPosition } from '../../lib';
import { Props } from './OpenPositionsList';

interface EnhancedProps {
  onPositionClick?: (positionId: string) => void;
  positions: Position[];
}

export default compose<Props, EnhancedProps>(
  withProps<EnhancedProps, EnhancedProps>(({ positions }) => ({
    positions: positions.filter(position => position.closeDate === null),
  })),
  withStockPositions,
  withSorter(
    C.OPEN_POSITIONS_LIST_SORTER_NAME,
    C.OPEN_POSITIONS_LIST_SORTER_INITIAL_KEY,
    C.OPEN_POSITIONS_LIST_SORTER_INITIAL_ORDER,
  ),
  withProps<Partial<Props>, EnhancedProps & WithStockPositionsProps & WithSorterProps>(({
    stockPositions, sorterKey, sorterOrder,
  }) => ({
    stockPositions: sortCollection(stockPositions, sorterKey as keyof StockPosition, sorterOrder),
  })),
);
