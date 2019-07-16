import { compose, withProps } from 'recompose';

import * as C from 'Constants';
import { sortCollection } from 'Shared/lib';

import { Props } from './ClosedPositionsList';
import withSorter, { Props as WithSorterProps } from '../../enhancers/withSorter';
import { Props as WithStockPositionsProps } from '../../enhancers/withStockPositions';
import { calculateTotals, StockPosition } from '../../lib';

interface EnhancedProps {
  onPositionClick?: (positionId: string) => void;
  stockPositions: StockPosition[];
}

export default compose<Props, EnhancedProps>(
  withProps<EnhancedProps, EnhancedProps>(({ stockPositions }) => ({
    stockPositions: stockPositions.filter(position => position.closeDate !== null),
  })),
  withSorter(
    C.CLOSED_POSITIONS_LIST_SORTER_NAME,
    C.CLOSED_POSITIONS_LIST_SORTER_INITIAL_KEY,
    C.CLOSED_POSITIONS_LIST_SORTER_INITIAL_ORDER,
  ),
  withProps<Partial<Props>, EnhancedProps & WithStockPositionsProps & WithSorterProps>(({
    stockPositions, sorterKey, sorterOrder,
  }) => ({
    stockPositions: sortCollection(stockPositions, sorterKey as keyof StockPosition, sorterOrder),
    ...calculateTotals(stockPositions),
  })),
);
