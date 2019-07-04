import * as React from 'react';

import PositionItem, {
  EnhancedProps as PositionItemEnhancedProps,
  RenderProps as PositionItemRenderProps,
} from 'Portfolio/components/PositionItem';
import Stock, { RenderProps as StockRenderProps } from 'Stocks/components/Stock';

// TODO: Tests.

interface Props extends PositionItemEnhancedProps {
  children: React.FunctionComponent<PositionItemRenderProps & StockRenderProps>;
}

const StockPositionItem: React.FunctionComponent<Props> = ({ children, onClick, position }: Props) => (
  <PositionItem onClick={onClick} position={position}>
    {({ handleClick, isClickable }: PositionItemRenderProps) => (
      <Stock symbol={position.symbol}>
        {({
          logo, logoProgress, price, quote, quoteProgress, symbol,
        }: StockRenderProps) => children({
          handleClick, isClickable, logo, logoProgress, position, price, quote, quoteProgress, symbol,
        })}
      </Stock>
    )}
  </PositionItem>
);

export default StockPositionItem;
