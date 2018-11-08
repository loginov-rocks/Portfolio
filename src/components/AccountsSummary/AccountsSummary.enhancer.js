/* @flow */

import { connect } from 'react-redux';
import { compose, withProps } from 'recompose';

const mapStateToProps = ({
  brokerageAccountId, diff, portfolio, prices,
}) => ({
  brokerageAccountId,
  instruments: diff && diff.instrument ? diff.instrument : [],
  portfolio,
  prices,
});

export default compose(
  connect(mapStateToProps),
  withProps(({
    accounts, brokerageAccountId, instrumentId, instruments, portfolio, prices,
  }) => {
    const instrument = instruments.find(({ id }) => id === instrumentId);

    const balanceByAccounts = accounts.map((account) => {
      let { balance } = account;

      if (account.id === brokerageAccountId) {
        balance = portfolio
          .map(({ amount, symbol }) => (
            prices[symbol] ? amount * prices[symbol] : 0
          ))
          .reduce((a, b) => a + b, 0);
      }

      if (account.instrument === instrumentId) {
        return balance;
      }

      const accountInstrument = instruments
        .find(({ id }) => id === account.instrument);

      return balance / instrument.rate * accountInstrument.rate;
    });

    return {
      balance: balanceByAccounts.reduce((a, b) => a + b, 0),
    };
  }),
);
