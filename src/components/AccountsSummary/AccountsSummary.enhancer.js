/* @flow */

import { connect } from 'react-redux';
import { compose, withProps } from 'recompose';

import { calculatePortfolioBalance } from '../../lib/stocks';

const mapStateToProps = ({
  brokerageAccountId, diff, portfolio, stockQuotes,
}) => ({
  brokerageAccountId,
  instruments: diff && diff.instrument ? diff.instrument : [],
  portfolio,
  stockQuotes,
});

export default compose(
  connect(mapStateToProps),
  withProps(({
    accounts, brokerageAccountId, instrumentId, instruments, portfolio,
    stockQuotes,
  }) => {
    const instrument = instruments.find(({ id }) => id === instrumentId);

    const balanceByAccounts = accounts.map((account) => {
      let { balance } = account;

      if (account.id === brokerageAccountId) {
        balance = calculatePortfolioBalance(portfolio, stockQuotes);
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
