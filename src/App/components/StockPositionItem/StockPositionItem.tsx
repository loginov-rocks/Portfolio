import * as React from 'react';

import PositionItem, {
  EnhancedProps as PositionItemEnhancedProps,
  RenderProps as PositionItemRenderProps,
} from 'Portfolio/components/PositionItem';
import { calculateAnnualPLPercent } from 'Portfolio/lib';
import Stock, { RenderProps as StockRenderProps } from 'Stocks/components/Stock';

// TODO: Tests.

interface RenderProps extends PositionItemRenderProps, StockRenderProps {
  openSum: number;

  dailyPL: number | null;
  dailyPLPercent: number | null;

  marketSum: number | null;
  marketPL: number | null;
  marketPLPercent: number | null;
  marketPLAnnualPercent: number | null;

  closeSum: number | null;
  closePL: number | null;
  closePLPercent: number | null;
  closePLAnnualPercent: number | null;
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
          const openSum = position.amount * position.openPrice + position.openCommission;

          let dailyPL = null;
          let dailyPLPercent = null;

          let marketSum = null;
          let marketPL = null;
          let marketPLPercent = null;
          let marketPLAnnualPercent = null;

          let closeSum = null;
          let closePL = null;
          let closePLPercent = null;
          let closePLAnnualPercent = null;

          if (quote) {
            dailyPL = position.amount * quote.change;
            dailyPLPercent = quote.changePercent;
          }

          if (price) {
            marketSum = position.amount * price;
            marketPL = marketSum - openSum;
            marketPLPercent = marketPL / openSum;
            marketPLAnnualPercent = calculateAnnualPLPercent(marketPLPercent, position.openDate);
          }

          if (position.closeCommission !== null && position.closeDate !== null && position.closePrice !== null) {
            closeSum = position.amount * position.closePrice - position.closeCommission;
            closePL = closeSum - openSum;
            closePLPercent = closePL / openSum;
            closePLAnnualPercent = calculateAnnualPLPercent(closePLPercent, position.openDate, position.closeDate);
          }

          return children({
            closePL,
            closePLAnnualPercent,
            closePLPercent,
            closeSum,
            dailyPL,
            dailyPLPercent,
            handleClick,
            isClickable,
            logo,
            logoProgress,
            marketPL,
            marketPLAnnualPercent,
            marketPLPercent,
            marketSum,
            openSum,
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
