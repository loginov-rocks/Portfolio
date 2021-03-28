import * as React from 'react';

import * as C from 'Constants';

interface Props {
  classes: { [key: string]: string };
  currency?: string;
  highlighted?: boolean;
  multiplier?: number | null;
  pl?: boolean;
  value: number;
}

const Money: React.FunctionComponent<Props> = ({
  classes, currency, highlighted, multiplier, pl, value,
}: Props) => {
  let className;

  if (pl) {
    if (value === 0) {
      className = classes.neutral;
    } else {
      className = value > 0 ? classes.positive : classes.negative;
    }
  }

  let resultCurrency = C.DEFAULT_CURRENCY;
  let resultValue = value;

  if (currency && multiplier) {
    resultCurrency = currency;
    resultValue = multiplier * value;
  }

  const content = resultValue.toLocaleString(undefined, { currency: resultCurrency, style: 'currency' });

  if (highlighted) {
    return <strong className={className}>{content}</strong>;
  }

  return <span className={className}>{content}</span>;
};

Money.defaultProps = {
  currency: undefined,
  highlighted: undefined,
  multiplier: undefined,
  pl: undefined,
};

export default Money;
