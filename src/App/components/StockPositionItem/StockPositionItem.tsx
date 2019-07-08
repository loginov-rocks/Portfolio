import * as React from 'react';

import PositionItem, {
  EnhancedProps as PositionItemEnhancedProps,
  RenderProps as PositionItemRenderProps,
} from 'Portfolio/components/PositionItem';
import { calculateAnnualPLPercent } from 'Portfolio/lib';
import Stock, { RenderProps as StockRenderProps } from 'Stocks/components/Stock';

// TODO: Tests.

interface RenderProps extends PositionItemRenderProps, StockRenderProps {
  annualPLPercent: number | null;
  dailyPL: number | null;
  dailyPLPercent: number | null;
  marketValue: number | null;
  netPL: number | null;
  netPLPercent: number | null;
  openCost: number;
}

interface Props extends PositionItemEnhancedProps {
  children: React.FunctionComponent<RenderProps>;
}

const StockPositionItem: React.FunctionComponent<Props> = ({ children, onClick, position }: Props) => (
  <PositionItem onClick={onClick} position={position}>
    {({ handleClick, isClickable }: PositionItemRenderProps) => (
      <Stock symbol={position.symbol}>
        {({
          logo, logoProgress, price, quote, quoteProgress, symbol,
        }: StockRenderProps) => {
          const dailyPL = quote ? position.amount * quote.change : null;
          const dailyPLPercent = quote ? quote.changePercent : null;

          const marketValue = price !== null ? position.amount * price : null;

          const openCost = position.amount * position.openPrice + position.openCommission;

          const netPL = marketValue !== null ? marketValue - openCost : null;
          const netPLPercent = netPL !== null ? netPL / openCost : null;

          const annualPLPercent = netPLPercent !== null
            ? calculateAnnualPLPercent(netPLPercent, position.openDate) : null;

          return children({
            annualPLPercent,
            dailyPL,
            dailyPLPercent,
            handleClick,
            isClickable,
            logo,
            logoProgress,
            marketValue,
            netPL,
            netPLPercent,
            openCost,
            position,
            price,
            quote,
            quoteProgress,
            symbol,
          });
        }}
      </Stock>
    )}
  </PositionItem>
);

export default StockPositionItem;
