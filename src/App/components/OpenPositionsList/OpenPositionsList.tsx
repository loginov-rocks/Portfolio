import * as React from 'react';

import * as C from 'Constants';
import Money from 'Shared/components/Money';
import Percent from 'Shared/components/Percent';
import Progress from 'Shared/components/Progress';
import Sorter from 'Shared/components/Sorter';
import StockLogo from 'Stocks/components/StockLogo';

import { StockPosition } from '../../lib';

// TODO: Tests.

export interface Props {
  handleSorterKeyChange: (key: string) => void;
  handleSorterOrderChange: (order: 'asc' | 'desc') => void;
  onPositionClick?: (positionId: string) => void;
  sorterKey: string;
  sorterOrder: 'asc' | 'desc';
  stockPositions: StockPosition[];
}

const OpenPositionsList: React.FunctionComponent<Props> = ({
  handleSorterKeyChange, handleSorterOrderChange, onPositionClick, stockPositions, sorterKey, sorterOrder,
}: Props) => (
  <React.Fragment>

    <Sorter
      keys={C.OPEN_POSITIONS_LIST_SORTER_KEYS}
      onKeyChange={handleSorterKeyChange}
      onOrderChange={handleSorterOrderChange}
      sorterKey={sorterKey}
      sorterOrder={sorterOrder}
    />

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
        {stockPositions.map(({
          amount, dailyPL, dailyPLPercent, id, marketPL, marketPLAnnualPercent,
          marketPLPercent, marketPrice, marketSum, openDate, openPrice, openSum, quote, quoteProgress, symbol,
        }) => (
          <tr
            key={id}
            onClick={() => onPositionClick && onPositionClick(id)}
            style={onPositionClick ? { cursor: 'pointer' } : {}}
          >
            <td><StockLogo symbol={symbol} /></td>
            <td>{quoteProgress ? <Progress /> : quote && quote.companyName}</td>
            <td>{symbol}</td>
            <td>{amount}</td>
            <td>{openDate}</td>
            <td><Money value={openPrice} /></td>
            <td><Money value={openSum} /></td>
            <td>{marketPrice !== null && <Money value={marketPrice} />}</td>
            <td>{marketSum !== null && <Money value={marketSum} />}</td>
            <td>{dailyPL !== null && <Money pl value={dailyPL} />}</td>
            <td>{dailyPLPercent !== null && <Percent pl value={dailyPLPercent} />}</td>
            <td>{marketPL !== null && <Money pl value={marketPL} />}</td>
            <td>{marketPLPercent !== null && <Percent pl value={marketPLPercent} />}</td>
            <td>{marketPLAnnualPercent !== null && <Percent pl value={marketPLAnnualPercent} />}</td>
          </tr>
        ))}
      </tbody>
    </table>

  </React.Fragment>
);

export default OpenPositionsList;
