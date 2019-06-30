import * as React from 'react';

import { Position } from 'Portfolio/lib/flow';
import PositionItem from 'Portfolio/components/PositionItem';
import { RenderProps as PositionItemRenderProps } from 'Portfolio/components/PositionItem/PositionItem';
import Stock from 'Stocks/components/Stock';
import { RenderProps as StockRenderProps } from 'Stocks/components/Stock/Stock';

interface Props {
  children: (props: PositionItemRenderProps & StockRenderProps) => JSX.Element,
  onClick?: (position: Position) => void,
  position: Position,
}

const StockPositionItem = ({ children, onClick, position }: Props) => (
  <PositionItem onClick={onClick} position={position}>
    {({ handleClick, isClickable }) => (
      <Stock symbol={position.symbol}>
        {({
          logo, logoProgress, price, quote, quoteProgress, symbol,
        }) => children({
          handleClick, isClickable, logo, logoProgress, position, price, quote, quoteProgress, symbol,
        })}
      </Stock>
    )}
  </PositionItem>
);

export default StockPositionItem;
