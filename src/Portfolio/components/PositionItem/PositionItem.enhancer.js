/* @flow */

import {
  compose, withHandlers, withProps, type HOC,
} from 'recompose';

type EnhancedComponentProps = {
  onClick?: (Position) => void,
  position: Position,
};

const enhancer: HOC<*, EnhancedComponentProps> = compose(
  withHandlers({

    handleClick: ({ onClick, position }) => () => {
      if (onClick) {
        onClick(position);
      }
    },

  }),
  withProps(({ onClick }) => ({
    isClickable: !!onClick,
  })),
);

export default enhancer;
