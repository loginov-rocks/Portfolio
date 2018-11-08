/* @flow */

import { connect } from 'react-redux';
import { compose, withProps } from 'recompose';

const mapStateToProps = ({ diff }) => ({
  instruments: diff && diff.instrument ? diff.instrument : [],
});

export default compose(
  connect(mapStateToProps),
  withProps(({ accounts, instrumentId, instruments }) => {
    const instrument = instruments.find(({ id }) => id === instrumentId);

    const balanceByAccounts = accounts.map((account) => {
      if (account.instrument === instrumentId) {
        return account.balance;
      }

      const accountInstrument = instruments
        .find(({ id }) => id === account.instrument);

      return account.balance / instrument.rate * accountInstrument.rate;
    });

    return {
      balance: balanceByAccounts.reduce((a, b) => a + b, 0),
    };
  }),
);
