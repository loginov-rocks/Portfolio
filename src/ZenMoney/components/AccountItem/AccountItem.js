/* @flow */

import * as React from 'react';

import Amount from '../Amount';

const AccountItem = ({ account }) => (
  <div>
    <div>
      {account.title}
    </div>
    <div>
      <Amount instrumentId={account.instrument} value={account.balance} />
    </div>
  </div>
);

export default AccountItem;
