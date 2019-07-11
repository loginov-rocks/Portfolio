import { withProps } from 'recompose';

import { Props } from './ClosedPositionsList';

export default withProps<Props, Props>(({ positions }) => ({
  positions: positions.filter(position => position.closeDate !== null),
}));
