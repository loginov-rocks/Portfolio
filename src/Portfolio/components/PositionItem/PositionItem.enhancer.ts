import { compose, withHandlers, withProps } from 'recompose';

export default compose(
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
