/* @flow */

import * as React from 'react';

import Amount from '../../zenMoney/Amount';

const Stock = ({
  amount, logo, logoProgress, quote, quoteProgress, symbol,
}) => (
  <span>

    {symbol}

    {(logoProgress || quoteProgress) && 'Progress...'}

    {quote && (
      <React.Fragment>
        <div>
          <Amount
            instrumentId={1}
            value={quote.iexRealtimePrice
              ? quote.iexRealtimePrice
              : quote.latestPrice}
          />
          x
          {amount}
          =
          <Amount
            instrumentId={1}
            value={amount * (quote.iexRealtimePrice
              ? quote.iexRealtimePrice
              : quote.latestPrice)}
          />
        </div>
        <div style={{ color: quote.change >= 0 ? 'green' : 'red' }}>
          <Amount instrumentId={1} value={amount * quote.change} />
          {(quote.changePercent * 100).toFixed(2)}%
        </div>
      </React.Fragment>
    )}

    {logo && (
      <img alt="" src={logo} />
    )}

  </span>
);

export default Stock;
