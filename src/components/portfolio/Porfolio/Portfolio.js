/* @flow */

import * as React from 'react';

import AddPosition from '../AddPositionForm';
import Sectors from '../Sectors';
import Stock from '../../stocks/Stock';

const Portfolio = ({ closePosition, symbols, value }) => (
  <div>

    <h2>Portfolio</h2>

    <AddPosition />

    <div>Total: {value}</div>

    <ul>
      {symbols.map(({ amount, id, symbol }, index) => (
        <li key={index}>
          <Stock amount={amount} symbol={symbol} />
          <button onClick={() => closePosition(id)}>Remove</button>
        </li>
      ))}
    </ul>

    <Sectors />

  </div>
);

export default Portfolio;
