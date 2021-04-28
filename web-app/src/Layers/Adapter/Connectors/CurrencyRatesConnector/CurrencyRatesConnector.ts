import { connect, ConnectedProps } from 'react-redux';

import {
  changeCurrency, fetchRates, initialize,
} from 'Layers/Application/ActionCreators/CurrencyRatesActionCreators/CurrencyRatesActionCreators';
import { AvailableCurrenciesState } from 'Layers/Application/States/CurrencyRatesState/CurrencyRatesState';
import State from 'State';

interface StateProps {
  availableCurrencies: AvailableCurrenciesState;
  currency: string | null;
  currencyMultiplier: number | null;
}

const mapStateToProps = ({ currencyRates: { availableCurrencies, currency, rates } }: State): StateProps => {
  let multiplier = null;

  if (currency !== null && rates !== null && rates[currency]) {
    multiplier = rates[currency];
  }

  return {
    availableCurrencies,
    currency,
    currencyMultiplier: multiplier,
  };
};

const mapDispatchToProps = { changeCurrency, fetchRates, initialize };

export const CurrencyRatesConnector = connect(mapStateToProps, mapDispatchToProps);

export type CurrencyRatesConnectorProps = ConnectedProps<typeof CurrencyRatesConnector>;
