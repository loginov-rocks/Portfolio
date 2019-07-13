import * as React from 'react';

import Money from 'Shared/components/Money';
import Percent from 'Shared/components/Percent';
import Progress from 'Shared/components/Progress';
import StockLogo from 'Stocks/components/StockLogo';

import { StockPosition } from '../../lib';

export interface Props {
  classes: { [key: string]: string };
  handleCloseClick: () => void;
  handleDeleteClick: () => void;
  positionLoading: boolean;
  stockPosition: StockPosition | null;
}

const Position: React.FunctionComponent<Props> = ({
  classes, handleCloseClick, handleDeleteClick, positionLoading, stockPosition,
}: Props) => (
  <div className={classes.root}>

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

          {stockPosition.closeCommission !== null && stockPosition.closePrice !== null
          && stockPosition.closeSum !== null && stockPosition.closePL !== null
          && stockPosition.closePLPercent !== null && stockPosition.closePLAnnualPercent !== null && (
            <React.Fragment>

              <tr>
                <th rowSpan={7}>Close</th>
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
              <tr>
                <th>PL</th>
                <td><Money pl value={stockPosition.closePL} /></td>
              </tr>
              <tr>
                <th>PL%</th>
                <td><Percent pl value={stockPosition.closePLPercent} /></td>
              </tr>
              <tr>
                <th>Annual PL%</th>
                <td><Percent pl value={stockPosition.closePLAnnualPercent} /></td>
              </tr>

            </React.Fragment>
          )}

          {stockPosition.dailyPL !== null && stockPosition.dailyPLPercent !== null && (
            <React.Fragment>

              <tr>
                <th rowSpan={2}>Daily</th>
                <th>PL</th>
                <td><Money pl value={stockPosition.dailyPL} /></td>
              </tr>
              <tr>
                <th>PL%</th>
                <td><Percent pl value={stockPosition.dailyPLPercent} /></td>
              </tr>

            </React.Fragment>
          )}

          {stockPosition.marketPrice !== null && stockPosition.marketSum !== null
          && stockPosition.marketPL !== null && stockPosition.marketPLPercent !== null
          && stockPosition.marketPLAnnualPercent !== null && (
            <React.Fragment>

              <tr>
                <th rowSpan={5}>Market</th>
                <th>Price</th>
                <td><Money value={stockPosition.marketPrice} /></td>
              </tr>
              <tr>
                <th>Sum</th>
                <td><Money value={stockPosition.marketSum} /></td>
              </tr>
              <tr>
                <th>PL</th>
                <td><Money pl value={stockPosition.marketPL} /></td>
              </tr>
              <tr>
                <th>PL%</th>
                <td><Percent pl value={stockPosition.marketPLPercent} /></td>
              </tr>
              <tr>
                <th>Annual PL%</th>
                <td><Percent pl value={stockPosition.marketPLAnnualPercent} /></td>
              </tr>

            </React.Fragment>
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

  </div>
);

export default Position;
