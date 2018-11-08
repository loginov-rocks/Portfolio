/* @flow */

import * as React from 'react';

import Amount from '../Amount';

const Stock = ({ amount, quote, quoteProgress, symbol }) => (
  <span>

    {symbol}

    {quoteProgress && 'Progress...'}

    {quote && (
      <React.Fragment>
        <Amount instrumentId={1} value={quote.iexRealtimePrice} />
        x
        {amount}
        =
        <Amount instrumentId={1} value={amount * quote.iexRealtimePrice} />
      </React.Fragment>
    )}

  </span>
);

export default Stock;
