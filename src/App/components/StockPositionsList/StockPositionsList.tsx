import * as React from 'react';

import { Position } from 'Portfolio/lib/flow';
import Progress from 'Shared/components/Progress';

import StockPositionItem from '../StockPositionItem';

interface Props {
  onClick?: (position: Position) => void;
  positions: Position[];
}

const StockPositionsList: React.FunctionComponent<Props> = ({ onClick, positions }: Props) => (
  <div>
    {positions.map(position => (
      <StockPositionItem
        key={position.id}
        onClick={onClick}
        position={position}
      >
        {({
          handleClick, isClickable, logo, logoProgress, price, quote, quoteProgress,
        }) => (
          <div
            onClick={handleClick}
            onKeyPress={handleClick}
            style={isClickable ? { cursor: 'pointer' } : {}}
            role="button"
            tabIndex={0}
          >

            <div>
              {position.symbol}
            </div>

            <div>
              {quoteProgress
                ? <Progress />
                : quote
                && (
                  <React.Fragment>

                    <div>
                      {price.toFixed(2)}
                      {' x '}
                      {position.amount}
                      {' = '}
                      {(position.amount * price).toFixed(2)}
                    </div>

                    <div style={{ color: quote.change >= 0 ? 'green' : 'red' }}>
                      {(quote.changePercent * 100).toFixed(2)}
                      %
                      (
                      {(position.amount * quote.change).toFixed(2)}
                      )
                    </div>

                  </React.Fragment>
                )}
            </div>

            <div>
              {logoProgress
                ? <Progress />
                : logo
                && (
                  <img alt="" src={logo} />
                )}
            </div>

          </div>
        )}
      </StockPositionItem>
    ))}
  </div>
);

export default StockPositionsList;
