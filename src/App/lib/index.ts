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

export interface OpenPositionsSummary {
  symbol: string;
  amount: number;

  openPriceAverage: number;
  openSum: number;

  companyName: string | null;
  dailyPL: number | null;
  dailyPLPercent: number | null;

  marketPL: number | null;
  marketPLPercent: number | null;
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

export const createOpenPositionsSummaries = (stockPositions: StockPosition[]): OpenPositionsSummary[] => {
  const bySymbols: { [key: string]: StockPosition[] } = {};

  stockPositions.forEach(position => {
    if (!bySymbols[position.symbol]) {
      bySymbols[position.symbol] = [];
    }

    bySymbols[position.symbol].push(position);
  });

  return Object.keys(bySymbols).map(symbol => {
    let amount = 0;
    let openPrice = 0;
    let openSum = 0;
    let dailyPL: number | null = null;
    let dailyPLPercent: number | null = null;
    let marketPL: number | null = null;
    let marketPLPercent: number | null = null;

    bySymbols[symbol].forEach(stockPosition => {
      amount += stockPosition.amount;
      openPrice += stockPosition.amount * stockPosition.openPrice;
      openSum += stockPosition.openSum;

      if (stockPosition.dailyPL !== null) {
        if (dailyPL === null) {
          dailyPL = 0;
        }

        dailyPL += stockPosition.dailyPL;
      }

      if (stockPosition.marketPL !== null) {
        if (marketPL === null) {
          marketPL = 0;
        }

        marketPL += stockPosition.marketPL;
      }
    });

    const referencePosition = bySymbols[symbol][0];

    if (dailyPL !== null && referencePosition.quote !== null) {
      dailyPLPercent = dailyPL / amount / referencePosition.quote.close;
    }

    if (marketPL !== null) {
      marketPLPercent = marketPL / openSum;
    }

    const openPriceAverage = openPrice / amount;
    const { companyName } = referencePosition;

    return {
      amount,
      companyName,
      dailyPL,
      dailyPLPercent,
      marketPL,
      marketPLPercent,
      openPriceAverage,
      openSum,
      symbol,
    };
  });
};
