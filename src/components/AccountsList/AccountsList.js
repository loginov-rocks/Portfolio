/* @flow */

import * as React from 'react';

import AccountItem from '../AccountItem';
import AccountsSummary from '../AccountsSummary';

const AccountsList = ({ accounts }) => (
  <div>
    <div>
      Total: <AccountsSummary accounts={accounts} instrumentId={1} />
    </div>
    <ul>
      {accounts.map(account => (
        <li key={account.id}>
          <AccountItem account={account} />
        </li>
      ))}
    </ul>
  </div>
);

export default AccountsList;
