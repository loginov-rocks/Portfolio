import * as React from 'react';

interface Sector {
  amount: number,
  currentPrice: number,
  initialPrice: number,
  sector: string,
  share: number,
  symbols: { symbol: string }[],
}

interface Props {
  children: JSX.Element,
  sectors: Sector[],
}

const Sectors = ({ sectors }: Props) => (
  <div>

    <h3>Sectors</h3>

    <ol>
      {sectors.map(({
        currentPrice, initialPrice, sector, share, symbols,
      }) => (
        <li key={sector}>

          <div>
            {sector}
            :
            {(share * 100).toFixed(2)}
            %
          </div>

          <div
            style={{ color: currentPrice >= initialPrice ? 'green' : 'red' }}
          >
            {((currentPrice - initialPrice) / initialPrice * 100).toFixed(2)}
            %
            {' '}
            (
            {(currentPrice - initialPrice).toFixed(2)}
            )
          </div>

          <div>
            Stocks:
            {symbols.map(({ symbol }) => symbol).sort().join(', ')}
          </div>

        </li>
      ))}
    </ol>

  </div>
);

export default Sectors;
