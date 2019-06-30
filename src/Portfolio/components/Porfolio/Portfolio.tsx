import * as React from 'react';

import Stock from 'Stocks/components/Stock';

// import AddPosition from '../AddPositionForm';
import Sectors from '../Sectors';

interface Props {
  children: JSX.Element;
  closePosition: (string) => void;
  symbols: { amount: number; id: string; symbol: string }[];
  value: number;
}

const Portfolio = ({ closePosition, symbols, value }: Props) => (
  <div>

    <h2>Portfolio</h2>

    {/* <AddPosition /> */}

    <div>
      Total:
      {value}
    </div>

    <ul>
      {symbols.map(({ amount, id, symbol }, index) => (
        /* eslint-disable-next-line react/no-array-index-key */
        <li key={index}>
          <Stock amount={amount} symbol={symbol} />
          <button onClick={() => closePosition(id)} type="button">Remove</button>
        </li>
      ))}
    </ul>

    <Sectors />

  </div>
);

export default Portfolio;
