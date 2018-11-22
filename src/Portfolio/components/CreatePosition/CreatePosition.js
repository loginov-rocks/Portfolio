/* @flow */

import * as React from 'react';

const CreatePosition = ({
  amount, date, handleAmountChange, handleDateChange, handlePriceChange,
  handleSymbolChange, handleSubmit, price, symbol,
}) => (
  <form onSubmit={handleSubmit}>

    <input onChange={handleSymbolChange} type="text" value={symbol} />

    <input
      min="0"
      onChange={handlePriceChange}
      step="0.01"
      type="number"
      value={price}
    />

    <input min="1" onChange={handleAmountChange} type="number" value={amount} />

    <input onChange={handleDateChange} type="date" value={date} />

    <button type="submit">Create</button>

  </form>
);

export default CreatePosition;
