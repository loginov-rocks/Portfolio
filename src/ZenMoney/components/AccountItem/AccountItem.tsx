import * as React from 'react';

import Amount from '../Amount';

interface Props {
  account: {
    balance: number;
    instrument: string;
    title: string;
  }
}

const AccountItem = ({ account }: Props) => (
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
