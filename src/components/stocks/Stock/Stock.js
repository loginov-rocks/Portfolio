/* @flow */

import * as React from 'react';

import { getQuotePrice } from '../../../lib/stocks';

const Stock = ({
  amount, logo, logoProgress, quote, quoteProgress, symbol,
}) => (
  <span>

    {symbol}

    {(logoProgress || quoteProgress) && 'Progress...'}

    {quote && (
      <React.Fragment>

        <div>
          {getQuotePrice(quote).toFixed(2)}
          {' x '}
          {amount}
          {' = '}
          {(amount * getQuotePrice(quote)).toFixed(2)}
        </div>

        <div style={{ color: quote.change >= 0 ? 'green' : 'red' }}>
          {(quote.changePercent * 100).toFixed(2)}%
          {' '}
          ({(amount * quote.change).toFixed(2)})
        </div>

      </React.Fragment>
    )}

    {logo && (
      <img alt="" src={logo} />
    )}

  </span>
);

export default Stock;
