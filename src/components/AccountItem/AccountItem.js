/* @flow */

import * as React from 'react';

const AccountItem = ({ account }) => (
  <div>
    <div>{account.title}</div>
    <div>{account.balance}</div>
  </div>
);

export default AccountItem;
