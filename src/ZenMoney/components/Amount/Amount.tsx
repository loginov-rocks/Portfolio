import * as React from 'react';

const Amount = ({ instrument, value }) => (
  instrument && value
    ? (
      <span>
      {value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}
        {instrument && instrument.symbol}
    </span>
    )
    : null
);

export default Amount;
