import { compose, withHandlers, withProps } from 'recompose';

import { Position } from '../../lib';
import { Props } from './PositionItem';

interface EnhancedProps {
  onClick?: (position: Position) => void;
  position: Position;
}

export default compose<Props & EnhancedProps, EnhancedProps>(
  withHandlers<EnhancedProps, {}>({

    handleClick: ({ onClick, position }) => () => {
      if (onClick) {
        onClick(position);
      }
    },

  }),
  withProps<{}, EnhancedProps>(({ onClick }) => ({
    isClickable: !!onClick,
  })),
);
