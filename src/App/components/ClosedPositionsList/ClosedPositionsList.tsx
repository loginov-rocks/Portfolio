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

const ClosedPositionsList: React.FunctionComponent<Props> = ({ onClick, positions }: Props) => (
  <table>

    <thead>
      <tr>
        <th colSpan={2}>Company</th>
        <th>Symbol</th>
        <th>Amount</th>
        <th>Open Date</th>
        <th>Open Price</th>
        <th>Open Sum</th>
        <th>Close Date</th>
        <th>Close Price</th>
        <th>Close Sum</th>
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
            closePL, closePLAnnualPercent, closePLPercent, closeSum, handleClick, isClickable, logo, logoProgress,
            openSum, quote, quoteProgress, symbol,
          }) => (
            <tr onClick={handleClick} style={isClickable ? { cursor: 'pointer' } : {}}>
              <td>{logoProgress ? <Progress /> : <Logo url={logo} />}</td>
              <td>{quoteProgress ? <Progress /> : quote && quote.companyName}</td>
              <td>{symbol}</td>
              <td>{position.amount}</td>
              <td>{position.openDate}</td>
              <td><Money value={position.openPrice} /></td>
              <td><Money value={openSum} /></td>
              <td>{position.closeDate}</td>
              <td>{position.closePrice !== null && <Money value={position.closePrice} />}</td>
              <td>{closeSum !== null && <Money value={closeSum} />}</td>
              <td>{closePL !== null && <Money pl value={closePL} />}</td>
              <td>{closePLPercent !== null && <Percent pl value={closePLPercent} />}</td>
              <td>{closePLAnnualPercent !== null && <Percent pl value={closePLAnnualPercent} />}</td>
            </tr>
          )}
        </StockPositionItem>
      ))}
    </tbody>
  </table>
);

export default ClosedPositionsList;
