/* @flow */

import * as React from 'react';

import PositionsListItem from '../PositionsListItem';

const PositionsList = ({ positions }) => (
  <div>
    {positions.map(position => (
      <PositionsListItem key={position.id} position={position} />
    ))}
  </div>
);

export default PositionsList;
