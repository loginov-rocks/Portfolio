import * as React from 'react';

import { Position } from 'Portfolio/lib';
import Money from 'Shared/components/Money';
import Percent from 'Shared/components/Percent';
import Progress from 'Shared/components/Progress';
import Logo from 'Stocks/components/Logo';

import StockPositionItem from '../StockPositionItem';

// TODO: Tests.

export interface Props {
  onClick?: (position: Position) => void;
  positions: Position[];
}

const OpenPositionsList: React.FunctionComponent<Props> = ({ onClick, positions }: Props) => (
  <table>

    <thead>
      <tr>
        <th colSpan={2}>Company</th>
        <th>Symbol</th>
        <th>Amount</th>
        <th>Open Date</th>
        <th>Open Price</th>
        <th>Open Sum</th>
        <th>Market Price</th>
        <th>Market Sum</th>
        <th>Daily P/L</th>
        <th>Daily P/L%</th>
        <th>P/L</th>
        <th>P/L%</th>
        <th>Annual P/L%</th>
      </tr>
    </thead>

    <tbody>
      {positions.map(position => (
        <StockPositionItem
          key={position.id}
          onClick={onClick}
          position={position}
        >
          {({
            dailyPL, dailyPLPercent, handleClick, isClickable, logo, logoProgress, marketPL, marketPLAnnualPercent,
            marketPLPercent, marketSum, openSum, price, quote, quoteProgress, symbol,
          }) => (
            <tr onClick={handleClick} style={isClickable ? { cursor: 'pointer' } : {}}>
              <td>{logoProgress ? <Progress /> : <Logo url={logo} />}</td>
              <td>{quoteProgress ? <Progress /> : quote && quote.companyName}</td>
              <td>{symbol}</td>
              <td>{position.amount}</td>
              <td>{position.openDate}</td>
              <td><Money value={position.openPrice} /></td>
              <td><Money value={openSum} /></td>
              <td>{price !== null && <Money value={price} />}</td>
              <td>{marketSum !== null && <Money value={marketSum} />}</td>
              <td>{dailyPL !== null && <Money pl value={dailyPL} />}</td>
              <td>{dailyPLPercent !== null && <Percent pl value={dailyPLPercent} />}</td>
              <td>{marketPL !== null && <Money pl value={marketPL} />}</td>
              <td>{marketPLPercent !== null && <Percent pl value={marketPLPercent} />}</td>
              <td>{marketPLAnnualPercent !== null && <Percent pl value={marketPLAnnualPercent} />}</td>
            </tr>
          )}
        </StockPositionItem>
      ))}
    </tbody>
  </table>
);

export default OpenPositionsList;
