/* @flow */

import { findQuoteBySymbol, getQuotePrice } from '../stocks';

export const calculatePositionsValue = (positions, quotesRepository) => (
  positions
    .map(position => {
      const { amount, symbol } = position;

      const quote = findQuoteBySymbol(quotesRepository, symbol);

      return amount * getQuotePrice(quote);
    })
    .reduce((a, b) => a + b, 0)
);

export const mergePositionsBySymbols = (positions) => {
  const symbols = {};

  positions.forEach((position) => {
    const { amount, price, symbol } = position;

    if (!symbols[symbol]) {
      symbols[symbol] = {
        amount: 0,
        positions: [],
        price: 0,
      };
    }

    symbols[symbol].amount += amount;
    symbols[symbol].price += amount * price;
    symbols[symbol].positions.push(position);
  });

  return Object.keys(symbols).map(symbol => ({
    ...symbols[symbol],
    symbol,
  }));
};

export const mergeSymbolsBySectors = (symbols, quotesRepository) => {
  const sectors = {};
  let currentTotalPrice = 0;

  symbols.forEach((symbolObject) => {
    const { amount, price, symbol } = symbolObject;
    const quote = findQuoteBySymbol(quotesRepository, symbol);

    if (!quote || !quote.sector) {
      return;
    }

    const { sector } = quote;

    if (!sectors[sector]) {
      sectors[sector] = {
        amount: 0,
        currentPrice: 0,
        initialPrice: 0,
        symbols: [],
      };
    }

    sectors[sector].amount += amount;
    sectors[sector].currentPrice += amount * getQuotePrice(quote);
    sectors[sector].initialPrice += price;
    sectors[sector].symbols.push(symbolObject);

    currentTotalPrice += sectors[sector].currentPrice;
  });

  return Object.keys(sectors).map(sector => ({
    ...sectors[sector],
    sector,
    share: sectors[sector].currentPrice / currentTotalPrice,
  }));
};
