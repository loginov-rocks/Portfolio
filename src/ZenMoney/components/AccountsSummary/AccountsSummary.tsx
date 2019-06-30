import * as React from 'react';

import Amount from '../Amount';

interface Props {
  children: JSX.Element;
  balance: number;
  instrumentId: string;
}

const AccountsSummary = ({ balance, instrumentId }: Props) => (
  <Amount instrumentId={instrumentId} value={balance} />
);

export default AccountsSummary;
