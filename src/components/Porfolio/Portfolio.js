/* @flow */

import * as React from 'react';

const Portfolio = ({
  addAmount, addSymbol, handleAddAmountChange, handleAddSymbolChange,
  handleSubmit, portfolio, removeStock,
}) => (
  <div>

    <form onSubmit={handleSubmit}>
      <input onChange={handleAddSymbolChange} type="text" value={addSymbol} />
      <input onChange={handleAddAmountChange} type="number" value={addAmount} />
      <button type="submit">Add</button>
    </form>

    <ul>
      {portfolio.map(({ amount, symbol }, index) => (
        <li key={index}>
          {symbol} {amount}
          <button onClick={() => removeStock(symbol)}>Remove</button>
        </li>
      ))}
    </ul>

  </div>
);

export default Portfolio;
