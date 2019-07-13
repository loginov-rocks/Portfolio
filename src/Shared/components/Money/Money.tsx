import * as React from 'react';

// TODO: Tests.

interface Props {
  classes: { [key: string]: string };
  pl?: boolean;
  value: number;
}

const Money: React.FunctionComponent<Props> = ({ classes, pl, value }: Props) => {
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
      {value.toLocaleString(undefined, { currency: 'USD', style: 'currency' })}
    </span>
  );
};

export default Money;
