/* @flow */

import * as React from 'react';

const Stock = ({
  amount, logo, logoProgress, quote, quoteProgress, symbol,
}) => (
  <span>

    {symbol}

    {(logoProgress || quoteProgress) && 'Progress...'}

    {quote && (
      <React.Fragment>
        <div>
          {quote.iexRealtimePrice ? quote.iexRealtimePrice : quote.latestPrice}
          x
          {amount}
          =
          {amount *
          (quote.iexRealtimePrice ? quote.iexRealtimePrice : quote.latestPrice)}
        </div>
        <div style={{ color: quote.change >= 0 ? 'green' : 'red' }}>
          {amount * quote.change}
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
