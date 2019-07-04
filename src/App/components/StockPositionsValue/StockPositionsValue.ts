import * as React from 'react';

// TODO: Tests.

export interface RenderProps {
  value: number;
}

export interface Props {
  children: React.FunctionComponent<RenderProps>;
  value: number;
}

const StockPositionsValue: React.FunctionComponent<Props> = ({ children, value }) => children({ value });

export default StockPositionsValue;
