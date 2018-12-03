/* @flow */

import * as React from 'react';

import type { Position } from 'Portfolio/lib/flow';
import PositionItem from 'Portfolio/components/PositionItem';
import Progress from 'Shared/components/Progress';
import Stock from 'Stocks/components/Stock';

type Props = {
  onClick?: (Position) => void,
  positions: Array<Position>,
};

const StockPositionsList = ({ onClick, positions }: Props) => (
  <div>
    {positions.map(position => (
      <PositionItem key={position.id} onClick={onClick} position={position}>
        {({ handleClick, isClickable }) => (
          <Stock symbol={position.symbol}>
            {({ logo, logoProgress, price, quote, quoteProgress }) => (
              <div
                onClick={handleClick}
                style={isClickable ? { cursor: 'pointer' } : {}}
              >

                <div>
                  {position.symbol}
                </div>

                <div>
                  {quoteProgress
                    ? <Progress />
                    : quote && (
                    <React.Fragment>

                      <div>
                        {price.toFixed(2)}
                        {' x '}
                        {position.amount}
                        {' = '}
                        {(position.amount * price).toFixed(2)}
                      </div>

                      <div
                        style={{ color: quote.change >= 0 ? 'green' : 'red' }}
                      >
                        {(quote.changePercent * 100).toFixed(2)}%
                        {' '}
                        ({(position.amount * quote.change).toFixed(2)})
                      </div>

                    </React.Fragment>
                  )}
                </div>

                <div>
                  {logoProgress
                    ? <Progress />
                    : logo && (
                    <img alt="" src={logo} />
                  )}
                </div>

              </div>
            )}
          </Stock>
        )}
      </PositionItem>
    ))}
  </div>
);

export default StockPositionsList;
