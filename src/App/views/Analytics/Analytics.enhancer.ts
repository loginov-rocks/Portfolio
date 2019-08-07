import { compose, withProps } from 'recompose';

import withPositions from 'Portfolio/enhancers/withPositions';
import { sortCollection } from 'Shared/lib';

import { Props } from './Analytics';
import withStockPositions, { Props as WithStockPositionsProps } from '../../enhancers/withStockPositions';
import { calculateTotals, createOpenPositionsSummaries } from '../../lib';

export default compose<Props, {}>(
  withPositions,
  withStockPositions,
  withProps<Partial<WithStockPositionsProps>, WithStockPositionsProps>(({ stockPositions }) => ({
    stockPositions: stockPositions.filter(position => position.closeDate === null),
  })),
  withProps<Partial<Props>, WithStockPositionsProps>(({ stockPositions }) => ({
    ...calculateTotals(stockPositions),
    summaries: sortCollection(createOpenPositionsSummaries(stockPositions), 'marketSum', 'desc'),
  })),
);
