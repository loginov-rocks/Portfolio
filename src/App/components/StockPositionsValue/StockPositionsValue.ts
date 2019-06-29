/* @flow */

import * as React from 'react';

type Props = {
  children: React.Node,
  value: number,
};

const StockPositionsValue = ({ children, value }: Props) => children({ value });

export default StockPositionsValue;
