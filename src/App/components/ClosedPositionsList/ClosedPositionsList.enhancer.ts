import { compose, withProps } from 'recompose';

import * as C from 'Constants';
import { Position } from 'Portfolio/lib';
import { sortCollection } from 'Shared/lib';

import { Props } from './ClosedPositionsList';
import withSorter, { Props as WithSorterProps } from '../../enhancers/withSorter';
import withStockPositions, { Props as WithStockPositionsProps } from '../../enhancers/withStockPositions';
import { StockPosition } from '../../lib';

interface EnhancedProps {
  onPositionClick?: (positionId: string) => void;
  positions: Position[];
}

export default compose<Props, EnhancedProps>(
  withProps<EnhancedProps, EnhancedProps>(({ positions }) => ({
    positions: positions.filter(position => position.closeDate !== null),
  })),
  withStockPositions,
  withSorter(
    C.CLOSED_POSITIONS_LIST_SORTER_NAME,
    C.CLOSED_POSITIONS_LIST_SORTER_INITIAL_KEY,
    C.CLOSED_POSITIONS_LIST_SORTER_INITIAL_ORDER,
  ),
  withProps<Partial<Props>, EnhancedProps & WithStockPositionsProps & WithSorterProps>(({
    stockPositions, sorterKey, sorterOrder,
  }) => {
    let totalOpenSum = 0;
    let totalCloseSum = 0;

    stockPositions.forEach(position => {
      totalOpenSum += position.openSum;

      if (position.closeSum !== null) {
        totalCloseSum += position.closeSum;
      }
    });

    const totalClosePL = totalCloseSum - totalOpenSum;
    const totalClosePLPercent = totalClosePL / totalOpenSum;

    return {
      stockPositions: sortCollection(stockPositions, sorterKey as keyof StockPosition, sorterOrder),
      totalClosePL,
      totalClosePLPercent,
      totalCloseSum,
    };
  }),
);
