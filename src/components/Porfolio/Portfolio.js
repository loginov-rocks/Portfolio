/* @flow */

import * as React from 'react';

import Amount from '../Amount';
import Stock from '../Stock';

const Portfolio = ({
  addAmount, addSymbol, balance, handleAddAmountChange, handleAddSymbolChange,
  handleSubmit, portfolio, removeStock,
}) => (
  <div>

    <form onSubmit={handleSubmit}>
      <input onChange={handleAddSymbolChange} type="text" value={addSymbol} />
      <input onChange={handleAddAmountChange} type="number" value={addAmount} />
      <button type="submit">Add</button>
    </form>

    <div>
      Total: <Amount instrumentId={1} value={balance} />
    </div>

    <ul>
      {portfolio.map(({ amount, symbol }, index) => (
        <li key={index}>
          <Stock amount={amount} symbol={symbol} />
          <button onClick={() => removeStock(symbol)}>Remove</button>
        </li>
      ))}
    </ul>

  </div>
);

export default Portfolio;
