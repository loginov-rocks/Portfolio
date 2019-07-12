import * as React from 'react';

import Money from 'Shared/components/Money';
import Percent from 'Shared/components/Percent';
import Progress from 'Shared/components/Progress';
import StockLogo from 'Stocks/components/StockLogo';

import { StockPosition } from '../../lib';

export interface Props {
  handleCloseClick: () => void;
  handleDeleteClick: () => void;
  handleHomeClick: () => void;
  positionLoading: boolean;
  stockPosition: StockPosition | null;
}

const Position: React.FunctionComponent<Props> = ({
  handleCloseClick, handleDeleteClick, handleHomeClick, positionLoading, stockPosition,
}: Props) => (
  <React.Fragment>

    <div>
      <button onClick={handleHomeClick} type="button">Home</button>
    </div>

    <h1>Position</h1>

    {positionLoading && <div><Progress /></div>}

    {!positionLoading && stockPosition && (
      <StockLogo symbol={stockPosition.symbol} />
    )}

    {!positionLoading && stockPosition && stockPosition.quote && (
      <div>{stockPosition.quote.companyName}</div>
    )}

    {!positionLoading && stockPosition && (
      <table>
        <tbody>

          <tr>
            <th colSpan={2}>Symbol</th>
            <td>{stockPosition.symbol}</td>
          </tr>
          <tr>
            <th colSpan={2}>Amount</th>
            <td>{stockPosition.amount}</td>
          </tr>

          <tr>
            <th rowSpan={4}>Open</th>
            <th>Date</th>
            <td>{stockPosition.openDate}</td>
          </tr>
          <tr>
            <th>Price</th>
            <td><Money value={stockPosition.openPrice} /></td>
          </tr>
          <tr>
            <th>Commission</th>
            <td><Money value={stockPosition.openCommission} /></td>
          </tr>
          <tr>
            <th>Sum</th>
            <td><Money value={stockPosition.openSum} /></td>
          </tr>

          {stockPosition.closeSum !== null && stockPosition.closeCommission !== null
          && stockPosition.closePrice !== null && (
            <React.Fragment>

              <tr>
                <th rowSpan={4}>Close</th>
                <th>Date</th>
                <td>{stockPosition.closeDate}</td>
              </tr>
              <tr>
                <th>Price</th>
                <td><Money value={stockPosition.closePrice} /></td>
              </tr>
              <tr>
                <th>Commission</th>
                <td><Money value={stockPosition.closeCommission} /></td>
              </tr>
              <tr>
                <th>Sum</th>
                <td><Money value={stockPosition.closeSum} /></td>
              </tr>

            </React.Fragment>
          )}

          {stockPosition.closePL !== null && (
            <tr>
              <th colSpan={2}>Close PL</th>
              <td><Money pl value={stockPosition.closePL} /></td>
            </tr>
          )}

          {stockPosition.closePLPercent !== null && (
            <tr>
              <th colSpan={2}>Close PL%</th>
              <td><Percent pl value={stockPosition.closePLPercent} /></td>
            </tr>
          )}

          {stockPosition.closePLAnnualPercent !== null && (
            <tr>
              <th colSpan={2}>Close Annual PL%</th>
              <td><Percent pl value={stockPosition.closePLAnnualPercent} /></td>
            </tr>
          )}

        </tbody>
      </table>
    )}

    {stockPosition && stockPosition.closeDate === null && (
      <div>
        <button onClick={handleCloseClick} type="button">Close</button>
      </div>
    )}

    <div>
      <button onClick={handleDeleteClick} type="button">Delete</button>
    </div>

  </React.Fragment>
);

export default Position;
