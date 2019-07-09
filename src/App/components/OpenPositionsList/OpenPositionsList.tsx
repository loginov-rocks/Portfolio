import * as React from 'react';

import { Position } from 'Portfolio/lib';
import Progress from 'Shared/components/Progress';
import Money from 'Shared/components/Money';
import Percent from 'Shared/components/Percent';
import Logo from 'Stocks/components/Logo';

import StockPositionItem from '../StockPositionItem';

// TODO: Tests.

interface Props {
  onClick?: (position: Position) => void;
  positions: Position[];
}

const OpenPositionsList: React.FunctionComponent<Props> = ({ onClick, positions }: Props) => (
  <table>

    <thead>
      <tr>
        <th colSpan={2}>Company</th>
        <th>Symbol</th>
        <th>Open Date</th>
        <th>Amount</th>
        <th>Open Price</th>
        <th>Open Cost</th>
        <th>Market Price</th>
        <th>Market Value</th>
        <th>Daily P/L%</th>
        <th>Daily P/L</th>
        <th>Net P/L%</th>
        <th>Net P/L</th>
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
            annualPLPercent, dailyPL, dailyPLPercent, handleClick, isClickable, logo, logoProgress, marketValue, netPL,
            netPLPercent, openCost, price, quote, quoteProgress, symbol,
          }) => (
            <tr onClick={handleClick} style={isClickable ? { cursor: 'pointer' } : {}}>
              <td>{logoProgress ? <Progress /> : <Logo url={logo} />}</td>
              <td>{quoteProgress ? <Progress /> : quote && quote.companyName}</td>
              <td>{symbol}</td>
              <td>{position.openDate}</td>
              <td>{position.amount}</td>
              <td><Money value={position.openPrice} /></td>
              <td><Money value={openCost} /></td>
              <td>{price !== null && <Money value={price} />}</td>
              <td>{marketValue !== null && <Money value={marketValue} />}</td>
              <td>{dailyPLPercent !== null && <Percent pl value={dailyPLPercent} />}</td>
              <td>{dailyPL !== null && <Money pl value={dailyPL} />}</td>
              <td>{netPLPercent !== null && <Percent pl value={netPLPercent} />}</td>
              <td>{netPL !== null && <Money pl value={netPL} />}</td>
              <td>{annualPLPercent !== null && <Percent pl value={annualPLPercent} />}</td>
            </tr>
          )}
        </StockPositionItem>
      ))}
    </tbody>
  </table>
);

export default OpenPositionsList;
