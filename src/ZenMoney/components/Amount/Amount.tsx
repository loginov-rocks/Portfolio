import * as React from 'react';

interface Props {
  instrument: {
    symbol: string;
  };
  value: number;
}

const Amount = ({ instrument, value }: Props) => (
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
