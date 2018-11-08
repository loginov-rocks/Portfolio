/* @flow */

import * as React from 'react';

import Amount from '../Amount';

const Stock = ({ amount, price, symbol }) => (
  <span>
    {symbol}
    {price && (
      <React.Fragment>
        <Amount instrumentId={1} value={price} />
        x
        {amount}
        =
        <Amount instrumentId={1} value={amount * price} />
      </React.Fragment>
    )}
  </span>
);

export default Stock;
