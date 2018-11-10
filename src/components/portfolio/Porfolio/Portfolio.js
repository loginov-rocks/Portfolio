/* @flow */

import * as React from 'react';

import AddPosition from '../AddPositionForm';
import Stock from '../../stocks/Stock';

const Portfolio = ({ balance, closePosition, positions }) => (
  <div>

    <AddPosition />

    <div>Total: {balance}</div>

    <ul>
      {positions.map(({ amount, id, symbol }, index) => (
        <li key={index}>
          <Stock amount={amount} symbol={symbol} />
          <button onClick={() => closePosition(id)}>Remove</button>
        </li>
      ))}
    </ul>

  </div>
);

export default Portfolio;
