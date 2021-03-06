import { compose, withProps } from 'recompose';

import * as C from 'Constants';
import { sortCollection } from 'Shared/lib';

import withSorter, { Props as WithSorterProps } from '../../enhancers/withSorter';
import { Props as WithStockPositionsProps } from '../../enhancers/withStockPositions';
import { createOpenPositionsSummaries, OpenPositionsSummary, StockPosition } from '../../lib';
import { Props } from './OpenPositionsSummariesList';

interface EnhancedProps {
  stockPositions: StockPosition[];
}

interface WithProps {
  summaries: OpenPositionsSummary[];
}

export default compose<Props, EnhancedProps>(
  withProps<EnhancedProps, EnhancedProps>(({ stockPositions }) => ({
    stockPositions: stockPositions.filter((position) => position.closeDate === null),
  })),
  withProps<Partial<Props>, EnhancedProps & WithStockPositionsProps>(({ stockPositions }) => ({
    summaries: createOpenPositionsSummaries(stockPositions),
  })),
  withSorter(
    C.OPEN_POSITIONS_SUMMARIES_LIST_SORTER_NAME,
    C.OPEN_POSITIONS_SUMMARIES_LIST_SORTER_INITIAL_KEY,
    C.OPEN_POSITIONS_SUMMARIES_LIST_SORTER_INITIAL_ORDER,
  ),
  withProps<Partial<Props>, EnhancedProps & WithStockPositionsProps & WithSorterProps & WithProps>(({
    sorterKey, sorterOrder, summaries,
  }) => ({
    summaries: sortCollection(summaries, sorterKey as keyof OpenPositionsSummary, sorterOrder),
  })),
);
