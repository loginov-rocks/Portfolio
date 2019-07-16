import { compose, withProps } from 'recompose';

import * as C from 'Constants';
import { Position } from 'Portfolio/lib';
import { sortCollection } from 'Shared/lib';

import withSorter, { Props as WithSorterProps } from '../../enhancers/withSorter';
import withStockPositions, { Props as WithStockPositionsProps } from '../../enhancers/withStockPositions';
import { calculateTotals, createOpenPositionsSummaries, OpenPositionsSummary } from '../../lib';
import { Props } from './OpenPositionsSummariesList';

interface EnhancedProps {
  positions: Position[];
}

interface WithProps {
  summaries: OpenPositionsSummary[];
}

export default compose<Props, EnhancedProps>(
  withProps<EnhancedProps, EnhancedProps>(({ positions }) => ({
    positions: positions.filter(position => position.closeDate === null),
  })),
  withStockPositions,
  withProps<Partial<Props>, EnhancedProps & WithStockPositionsProps>(({ stockPositions }) => ({
    summaries: createOpenPositionsSummaries(stockPositions),
  })),
  withSorter(
    C.OPEN_POSITIONS_SUMMARIES_LIST_SORTER_NAME,
    C.OPEN_POSITIONS_SUMMARIES_LIST_SORTER_INITIAL_KEY,
    C.OPEN_POSITIONS_SUMMARIES_LIST_SORTER_INITIAL_ORDER,
  ),
  withProps<Partial<Props>, EnhancedProps & WithStockPositionsProps & WithSorterProps & WithProps>(({
    sorterKey, sorterOrder, stockPositions, summaries,
  }) => ({
    summaries: sortCollection(summaries, sorterKey as keyof OpenPositionsSummary, sorterOrder),
    ...calculateTotals(stockPositions),
  })),
);
