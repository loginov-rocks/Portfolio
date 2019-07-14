import { annualizePercent, Position } from 'Portfolio/lib';
import { getQuotePrice } from 'Stocks/lib';
import Quote from 'Stocks/lib/IEX/Quote';

// TODO: Tests.

export interface StockPosition extends Position {
  openSum: number;

  closeSum: number | null;
  closePL: number | null;
  closePLPercent: number | null;
  closePLAnnualPercent: number | null;

  quote: Quote | null;
  quoteProgress: boolean;

  companyName: string | null;
  dailyPL: number | null;
  dailyPLPercent: number | null;

  marketPrice: number | null;
  marketSum: number | null;
  marketPL: number | null;
  marketPLPercent: number | null;
  marketPLAnnualPercent: number | null;
}

export const createStockPosition = (position: Position, quote: Quote | null, quoteProgress: boolean): StockPosition => {
  const openSum = position.amount * position.openPrice + position.openCommission;

  let closeSum = null;
  let closePL = null;
  let closePLPercent = null;
  let closePLAnnualPercent = null;

  if (position.closeCommission !== null && position.closeDate !== null && position.closePrice !== null) {
    closeSum = position.amount * position.closePrice - position.closeCommission;
    closePL = closeSum - openSum;
    closePLPercent = closePL / openSum;
    closePLAnnualPercent = annualizePercent(closePLPercent, position.openDate, position.closeDate);
  }

  let companyName = null;
  let dailyPL = null;
  let dailyPLPercent = null;

  if (quote) {
    ({ companyName } = quote);
    dailyPL = position.amount * quote.change;
    dailyPLPercent = quote.changePercent;
  }

  const marketPrice = getQuotePrice(quote);
  let marketSum = null;
  let marketPL = null;
  let marketPLPercent = null;
  let marketPLAnnualPercent = null;

  if (marketPrice) {
    marketSum = position.amount * marketPrice;
    marketPL = marketSum - openSum;
    marketPLPercent = marketPL / openSum;
    marketPLAnnualPercent = annualizePercent(marketPLPercent, position.openDate);
  }

  return {
    ...position,
    closePL,
    closePLAnnualPercent,
    closePLPercent,
    closeSum,
    companyName,
    dailyPL,
    dailyPLPercent,
    marketPL,
    marketPLAnnualPercent,
    marketPLPercent,
    marketPrice,
    marketSum,
    openSum,
    quote,
    quoteProgress,
  };
};
