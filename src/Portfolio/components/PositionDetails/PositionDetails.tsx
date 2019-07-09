import * as React from 'react';

import Money from 'Shared/components/Money';
import Percent from 'Shared/components/Percent';

import { Position } from '../../lib';

// TODO: Tests.

export interface Props {
  annualPLPercent: number | null;
  closeReturn: number | null;
  gainPL: number | null;
  gainPLPercent: number | null;
  openCost: number;
  position: Position;
}

const PositionDetails: React.FunctionComponent<Props> = ({
  annualPLPercent, closeReturn, gainPL, gainPLPercent, openCost, position,
}: Props) => (
  <table>
    <tbody>

      <tr>
        <th colSpan={2}>Symbol</th>
        <td>{position.symbol}</td>
      </tr>
      <tr>
        <th colSpan={2}>Amount</th>
        <td>{position.amount}</td>
      </tr>

      <tr>
        <th rowSpan={4}>Open</th>
        <th>Date</th>
        <td>{position.openDate}</td>
      </tr>
      <tr>
        <th>Price</th>
        <td><Money value={position.openPrice} /></td>
      </tr>
      <tr>
        <th>Commission</th>
        <td><Money value={position.openCommission} /></td>
      </tr>
      <tr>
        <th>Cost</th>
        <td><Money value={openCost} /></td>
      </tr>

      {closeReturn !== null && position.closeCommission !== null && position.closePrice !== null && (
        <React.Fragment>

          <tr>
            <th rowSpan={4}>Close</th>
            <th>Date</th>
            <td>{position.closeDate}</td>
          </tr>
          <tr>
            <th>Price</th>
            <td><Money value={position.closePrice} /></td>
          </tr>
          <tr>
            <th>Commission</th>
            <td><Money value={position.closeCommission} /></td>
          </tr>
          <tr>
            <th>Return</th>
            <td><Money value={closeReturn} /></td>
          </tr>

        </React.Fragment>
      )}

      {gainPL !== null && (
        <tr>
          <th colSpan={2}>Gain PL</th>
          <td><Money pl value={gainPL} /></td>
        </tr>
      )}

      {gainPLPercent !== null && (
        <tr>
          <th colSpan={2}>Gain PL%</th>
          <td><Percent pl value={gainPLPercent} /></td>
        </tr>
      )}

      {annualPLPercent !== null && (
        <tr>
          <th colSpan={2}>Annual PL%</th>
          <td><Percent pl value={annualPLPercent} /></td>
        </tr>
      )}

    </tbody>
  </table>
);

export default PositionDetails;
