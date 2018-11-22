/* @flow */

import * as React from 'react';

const PositionsListItem = ({ handleDelete, position }) => (
  <div>
    <div>{position.symbol}</div>
    <div>{position.price}</div>
    <div>{position.amount}</div>
    <div>{position.date}</div>
    <div>
      <button onClick={handleDelete}>Delete</button>
    </div>
  </div>
);

export default PositionsListItem;
