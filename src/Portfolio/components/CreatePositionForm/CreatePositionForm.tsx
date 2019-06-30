import * as React from 'react';

interface Props {
  amount: number;
  children: JSX.Element;
  date: string;
  handleAmountChange: () => void;
  handleDateChange: () => void;
  handlePriceChange: () => void;
  handleSymbolChange: () => void;
  handleSubmit: () => void;
  price: number;
  symbol: string;
}

const CreatePositionForm = ({
  amount, date, handleAmountChange, handleDateChange, handlePriceChange, handleSymbolChange, handleSubmit, price,
  symbol,
}: Props) => (
  <form onSubmit={handleSubmit}>

    <div>
      Symbol
      <br />
      <input onChange={handleSymbolChange} type="text" value={symbol} />
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
      Date
      <br />
      <input onChange={handleDateChange} type="date" value={date} />
    </div>

    <div>
      <button type="submit">Create</button>
    </div>

  </form>
);

export default CreatePositionForm;
