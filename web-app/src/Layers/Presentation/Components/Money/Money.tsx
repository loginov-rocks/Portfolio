import * as React from 'react';

import { MoneyEnhancerProps } from 'Layers/Behavior/Enhancers/MoneyEnhancer/MoneyEnhancer';

export interface MoneyProps {
  classes: { [key: string]: string };
  highlighted?: boolean;
  pl?: boolean;
  value: number;
}

type Props = MoneyProps & MoneyEnhancerProps;

export const Money: React.FunctionComponent<Props> = ({
  classes, currency, currencyMultiplier, highlighted, pl, value,
}: Props) => {
  let className;

  if (pl) {
    if (value === 0) {
      className = classes.neutral;
    } else {
      className = value > 0 ? classes.positive : classes.negative;
    }
  }

  const multipliedValue = currencyMultiplier ? currencyMultiplier * value : value;
  const content = currency
    ? multipliedValue.toLocaleString(undefined, { currency, style: 'currency' })
    : multipliedValue;

  if (highlighted) {
    return <strong className={className}>{content}</strong>;
  }

  return <span className={className}>{content}</span>;
};

Money.defaultProps = {
  highlighted: undefined,
  pl: undefined,
};
