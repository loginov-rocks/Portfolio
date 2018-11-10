/* @flow */

import { connect } from 'react-redux';
import { compose, withProps } from 'recompose';

import { calculatePositionsValue } from '../../../lib/stocks';

const mapStateToProps = ({
  portfolio: { positions },
  stocks: { quotes },
  zenMoney: { brokerageAccountId, instruments },
}) => ({
  brokerageAccountId, instruments, positions, quotes,
});

export default compose(
  connect(mapStateToProps),
  withProps(({
    accounts, brokerageAccountId, instrumentId, instruments, positions, quotes,
  }) => {
    const instrument = instruments.find(({ id }) => id === instrumentId);

    const balanceByAccounts = accounts.map((account) => {
      let { balance, instrument: accountInstrumentId } = account;

      if (account.id === brokerageAccountId) {
        balance = calculatePositionsValue(positions, quotes);
        accountInstrumentId = 1; // Hardcode dollar for brokerage account.
      }

      if (accountInstrumentId === instrumentId) {
        return balance;
      }

      const accountInstrument = instruments
        .find(({ id }) => id === accountInstrumentId);

      return balance / instrument.rate * accountInstrument.rate;
    });

    return {
      balance: balanceByAccounts.reduce((a, b) => a + b, 0),
    };
  }),
);
