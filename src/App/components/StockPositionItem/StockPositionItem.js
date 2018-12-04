/* @flow */

import * as React from 'react';

import type { Position } from 'Portfolio/lib/flow';
import PositionItem from 'Portfolio/components/PositionItem';
import Stock from 'Stocks/components/Stock';

type Props = {
  children: React.Node,
  onClick?: (Position) => void,
  position: Position,
};

const StockPositionItem = ({ children, onClick, position }: Props) => (
  <PositionItem onClick={onClick} position={position}>
    {({ handleClick, isClickable }) => (
      <Stock symbol={position.symbol}>
        {({ logo, logoProgress, price, quote, quoteProgress }) => children({
          handleClick, isClickable, logo, logoProgress, position, price, quote,
          quoteProgress,
        })}
      </Stock>
    )}
  </PositionItem>
);

export default StockPositionItem;
