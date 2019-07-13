import * as React from 'react';

// TODO: Tests.

interface Props {
  classes: { [key: string]: string };
  highlighted?: boolean;
  pl?: boolean;
  value: number;
}

const Money: React.FunctionComponent<Props> = ({
  classes, highlighted, pl, value,
}: Props) => {
  let className;

  if (pl) {
    if (value === 0) {
      className = classes.neutral;
    } else {
      className = value > 0 ? classes.positive : classes.negative;
    }
  }

  const content = value.toLocaleString(undefined, { currency: 'USD', style: 'currency' });

  if (highlighted) {
    return <strong className={className}>{content}</strong>;
  }

  return <span className={className}>{content}</span>;
};

export default Money;
