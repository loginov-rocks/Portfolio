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

const ClosedPositionsList: React.FunctionComponent<Props> = ({
  handleSorterKeyChange, handleSorterOrderChange, onPositionClick, stockPositions, sorterKey, sorterOrder,
}: Props) => (
  <React.Fragment>

    <Sorter
      keys={C.CLOSED_POSITIONS_LIST_SORTER_KEYS}
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
          <th>Close Date</th>
          <th>Close Price</th>
          <th>Close Sum</th>
          <th>P/L</th>
          <th>P/L%</th>
          <th>Annual P/L%</th>
        </tr>
      </thead>

      <tbody>
        {stockPositions.map(({
          amount, closeDate, closePL, closePLAnnualPercent, closePLPercent, closePrice, closeSum, id, openDate,
          openPrice, openSum, quote, quoteProgress, symbol,
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
            <td>{closeDate}</td>
            <td>{closePrice !== null && <Money value={closePrice} />}</td>
            <td>{closeSum !== null && <Money value={closeSum} />}</td>
            <td>{closePL !== null && <Money pl value={closePL} />}</td>
            <td>{closePLPercent !== null && <Percent pl value={closePLPercent} />}</td>
            <td>{closePLAnnualPercent !== null && <Percent pl value={closePLAnnualPercent} />}</td>
          </tr>
        ))}
      </tbody>
    </table>

  </React.Fragment>
);

export default ClosedPositionsList;