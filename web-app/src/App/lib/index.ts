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

  marketPrice: number | null;
  marketSum: number | null;
  marketPL: number | null;
  marketPLPercent: number | null;
}

export interface Totals {
  totalDailyPL: number;
  totalDailyPLPercent: number;

  totalMarketPL: number;
  totalMarketPLPercent: number;
  totalMarketSum: number;

  totalCloseSum: number;
  totalClosePL: number;
  totalClosePLPercent: number;
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

  if (quote !== null) {
    ({ companyName } = quote);
    dailyPL = position.amount * quote.change;
    dailyPLPercent = quote.changePercent;
  }

  const marketPrice = getQuotePrice(quote);
  let marketSum = null;
  let marketPL = null;
  let marketPLPercent = null;
  let marketPLAnnualPercent = null;

  if (marketPrice !== null) {
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
    let marketSum: number | null = null;
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

      if (stockPosition.marketSum !== null) {
        if (marketSum === null) {
          marketSum = 0;
        }

        marketSum += stockPosition.marketSum;
      }

      if (stockPosition.marketPL !== null) {
        if (marketPL === null) {
          marketPL = 0;
        }

        marketPL += stockPosition.marketPL;
      }
    });

    const referencePosition = bySymbols[symbol][0];

    if (marketPL !== null) {
      marketPLPercent = marketPL / openSum;
    }

    const openPriceAverage = openPrice / amount;
    const { companyName, dailyPLPercent, marketPrice } = referencePosition;

    return {
      amount,
      companyName,
      dailyPL,
      dailyPLPercent,
      marketPL,
      marketPLPercent,
      marketPrice,
      marketSum,
      openPriceAverage,
      openSum,
      symbol,
    };
  });
};

export const calculateTotals = (stockPositions: StockPosition[]): Totals => {
  let totalCloseOpenSum = 0;
  let totalCloseSum = 0;

  let totalMarketOpenSum = 0;
  let totalDailyPL = 0;
  let totalPreviousCloseSum = 0;
  let totalMarketSum = 0;

  stockPositions.forEach(position => {
    if (position.closeSum !== null) {
      totalCloseOpenSum += position.openSum;
      totalCloseSum += position.closeSum;
    } else {
      totalMarketOpenSum += position.openSum;

      if (position.quote !== null) {
        totalDailyPL += position.amount * position.quote.change;
        // TODO: Check if the `previousClose` prop can be null.
        totalPreviousCloseSum += position.amount
          * (position.quote.close === null ? position.quote.previousClose : position.quote.close);
      }

      if (position.marketSum !== null) {
        totalMarketSum += position.marketSum;
      }
    }
  });

  const totalClosePL = totalCloseSum - totalCloseOpenSum;
  let totalClosePLPercent = totalClosePL / totalCloseOpenSum;

  let totalDailyPLPercent = totalDailyPL / totalPreviousCloseSum;

  const totalMarketPL = totalMarketSum - totalMarketOpenSum;
  let totalMarketPLPercent = totalMarketPL / totalMarketOpenSum;

  if (!Number.isFinite(totalClosePLPercent)) {
    totalClosePLPercent = 0;
  }

  if (!Number.isFinite(totalDailyPLPercent)) {
    totalDailyPLPercent = 0;
  }

  if (!Number.isFinite(totalMarketPLPercent)) {
    totalMarketPLPercent = 0;
  }

  return {
    totalClosePL,
    totalClosePLPercent,
    totalCloseSum,
    totalDailyPL,
    totalDailyPLPercent,
    totalMarketPL,
    totalMarketPLPercent,
    totalMarketSum,
  };
};
