/* @flow */

import * as React from 'react';

import AccountItem from '../AccountItem';

const AccountsList = ({ accounts }) => (
  <div>
    {accounts.map(account => (
      <AccountItem account={account} key={account.id} />
    ))}
  </div>
);

export default AccountsList;
