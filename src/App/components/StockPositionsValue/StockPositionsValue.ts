import * as React from 'react';

interface Props {
  children: React.FunctionComponent<{ value: number }>;
  value: number;
}

const StockPositionsValue: React.FunctionComponent<Props> = ({ children, value }: Props) => children({ value });

export default StockPositionsValue;
