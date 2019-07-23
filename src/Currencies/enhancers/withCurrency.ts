import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';

import State from 'State';

import {
  changeCurrency, ChangeCurrencyAction, fetchRates, FetchRatesAction,
} from '../actions';

// TODO: Tests.

interface StateProps {
  currency: string;
  currencyMultiplier: number | null;
}

interface DispatchProps {
  changeCurrency: ChangeCurrencyAction;
  fetchCurrenciesRates: FetchRatesAction;
}

export interface Props extends StateProps, DispatchProps {
  // Export one interface for ease of use.
}

const mapStateToProps = ({ currencies: { currency, rates } }: State): StateProps => {
  let multiplier = null;

  if (rates !== null && rates[currency]) {
    multiplier = rates[currency];
  }

  return {
    currency,
    currencyMultiplier: multiplier,
  };
};

const mapDispatchToProps = { changeCurrency, fetchCurrenciesRates: fetchRates };

export default compose<Props, {}>(
  connect(mapStateToProps, mapDispatchToProps),
  lifecycle<StateProps & DispatchProps, {}>({

    componentDidMount() {
      this.props.fetchCurrenciesRates();
    },

  }),
);
