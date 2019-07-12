import { compose, withProps } from 'recompose';

import { Position } from 'Portfolio/lib';

import { Props } from './ClosedPositionsList';
import withStockPositions from '../../enhancers/withStockPositions';

interface EnhancedProps {
  onPositionClick?: (positionId: string) => void;
  positions: Position[];
}

export default compose<Props, EnhancedProps>(
  withProps<EnhancedProps, EnhancedProps>(({ positions }) => ({
    positions: positions.filter(position => position.closeDate !== null),
  })),
  withStockPositions,
);
