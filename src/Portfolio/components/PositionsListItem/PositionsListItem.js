/* @flow */

import * as React from 'react';

import type { Position } from '../../lib/flow';

type Props = {
  handleClick: () => void,
  isClickable: boolean,
  position: Position,
};

const PositionsListItem = ({ handleClick, isClickable, position }: Props) => (
  <div onClick={handleClick} style={isClickable ? { cursor: 'pointer' } : {}}>
    <div>{position.symbol}</div>
    <div>{position.price}</div>
    <div>{position.amount}</div>
    <div>{position.date}</div>
  </div>
);

export default PositionsListItem;
