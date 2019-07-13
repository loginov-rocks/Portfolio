import * as React from 'react';

// TODO: Tests.

interface Props {
  classes: { [key: string]: string };
  pl?: boolean;
  value: number;
}

const Percent: React.FunctionComponent<Props> = ({ classes, pl, value }: Props) => {
  let className;

  if (pl) {
    if (value === 0) {
      className = classes.neutral;
    } else {
      className = value > 0 ? classes.positive : classes.negative;
    }
  }

  return (
    <span className={className}>
      {(value * 100).toFixed(2)}
      %
    </span>
  );
};

export default Percent;
