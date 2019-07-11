import { withProps } from 'recompose';

import { Props } from './OpenPositionsList';

export default withProps<Props, Props>(({ positions }) => ({
  positions: positions.filter(position => position.closeDate === null),
}));
