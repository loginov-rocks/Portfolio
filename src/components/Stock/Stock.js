/* @flow */

import * as React from 'react';

import Amount from '../Amount';

const Stock = ({
  amount, logo, logoProgress, quote, quoteProgress, symbol,
}) => (
  <span>

    {symbol}

    {(logoProgress || quoteProgress) && 'Progress...'}

    {quote && (
      <React.Fragment>
        <Amount instrumentId={1} value={quote.iexRealtimePrice} />
        x
        {amount}
        =
        <Amount instrumentId={1} value={amount * quote.iexRealtimePrice} />
      </React.Fragment>
    )}

    {logo && (
      <img alt="" src={logo} />
    )}

  </span>
);

export default Stock;
