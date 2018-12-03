/* @flow */

import * as React from 'react';

import type { Position } from '../../lib/flow';
import PositionsListItem from '../PositionsListItem';

type Props = {
  onClick?: (Position) => void,
  positions: Array<Position>,
};

const PositionsList = ({ onClick, positions }: Props) => (
  <div>
    {positions.map(position => (
      <PositionsListItem
        key={position.id}
        onClick={onClick}
        position={position}
      />
    ))}
  </div>
);

export default PositionsList;
