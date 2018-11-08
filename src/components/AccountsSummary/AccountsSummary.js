/* @flow */

import * as React from 'react';

import Amount from '../Amount';

const AccountsSummary = ({ balance, instrumentId }) => (
  <Amount instrumentId={instrumentId} value={balance} />
);

export default AccountsSummary;
