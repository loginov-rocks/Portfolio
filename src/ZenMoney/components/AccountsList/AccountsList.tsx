import * as React from 'react';

import AccountItem from '../AccountItem';
import AccountsSummary from '../AccountsSummary';

interface Props {
  accounts: { id: string }[];
  brokerageAccountId: string;
  setBrokerageAccount: (id: string) => void;
}

const AccountsList: React.FunctionComponent<Props> = ({ accounts, brokerageAccountId, setBrokerageAccount }: Props) => (
  <div>
    <div>
      Total:
      <AccountsSummary accounts={accounts} instrumentId={2} />
    </div>
    <ul>
      {accounts.map(account => (
        <li key={account.id}>

          {account.id === brokerageAccountId && '*'}

          <AccountItem account={account} />

          <button
            onClick={() => setBrokerageAccount(account.id !== brokerageAccountId ? account.id : '')}
            type="button"
          >
            {account.id !== brokerageAccountId ? 'Brokerage' : 'Not brokerage'}
          </button>

        </li>
      ))}
    </ul>
  </div>
);

export default AccountsList;
