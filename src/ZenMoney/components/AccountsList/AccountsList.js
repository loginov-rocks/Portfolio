/* @flow */

import * as React from 'react';

import AccountItem from '../AccountItem';
import AccountsSummary from '../AccountsSummary';

const AccountsList = ({
  accounts, brokerageAccountId, setBrokerageAccount,
}) => (
  <div>
    <div>
      Total: <AccountsSummary accounts={accounts} instrumentId={2} />
    </div>
    <ul>
      {accounts.map(account => (
        <li key={account.id}>

          {account.id === brokerageAccountId && '*'}

          <AccountItem account={account} />

          <button onClick={() => setBrokerageAccount(
            account.id !== brokerageAccountId ? account.id : '',
          )}>
            {account.id !== brokerageAccountId ? 'Brokerage' : 'Not brokerage'}
          </button>

        </li>
      ))}
    </ul>
  </div>
);

export default AccountsList;
