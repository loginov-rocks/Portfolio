/* @flow */

import * as React from 'react';

const Amount = ({ instrument, value }) => (
  <span>
    {value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}
    {instrument.symbol}
  </span>
);

export default Amount;
