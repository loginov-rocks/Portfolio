import * as React from 'react';

export interface Props {
  amount: number;
  commission: number;
  date: string;
  handleAmountChange: (event: React.SyntheticEvent) => void;
  handleCommissionChange: (event: React.SyntheticEvent) => void;
  handleDateChange: (event: React.SyntheticEvent) => void;
  handlePriceChange: (event: React.SyntheticEvent) => void;
  handleSymbolChange: (event: React.SyntheticEvent) => void;
  handleSubmit: (event: React.SyntheticEvent) => void;
  price: number;
  symbol: string;
}

const OpenPositionForm: React.FunctionComponent<Props> = ({
  amount, commission, date, handleAmountChange, handleCommissionChange, handleDateChange, handlePriceChange,
  handleSymbolChange, handleSubmit, price, symbol,
}: Props) => (
  <form onSubmit={handleSubmit}>

    <div>
      Symbol
      <br />
      <input onChange={handleSymbolChange} type="text" value={symbol} />
    </div>

    <div>
      Amount
      <br />
      <input
        min="1"
        onChange={handleAmountChange}
        type="number"
        value={amount}
      />
    </div>

    <div>
      Price
      <br />
      <input
        min="0"
        onChange={handlePriceChange}
        step="0.01"
        type="number"
        value={price}
      />
    </div>

    <div>
      Commission
      <br />
      <input
        min="0"
        onChange={handleCommissionChange}
        step="0.01"
        type="number"
        value={commission}
      />
    </div>

    <div>
      Date
      <br />
      <input onChange={handleDateChange} type="date" value={date} />
    </div>

    <div>
      <button type="submit">Open</button>
    </div>

  </form>
);

export default OpenPositionForm;
