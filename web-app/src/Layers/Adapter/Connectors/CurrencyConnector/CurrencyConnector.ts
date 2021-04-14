import { connect, ConnectedProps } from 'react-redux';

import {
  changeCurrency, fetchRates,
} from 'Layers/Application/ActionCreators/CurrenciesActionCreators/CurrenciesActionCreators';
import State from 'State';

interface StateProps {
  currency: string;
  currencyMultiplier: number | null;
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

const mapDispatchToProps = { changeCurrency, fetchRates };

export const CurrencyConnector = connect(mapStateToProps, mapDispatchToProps);

export type CurrencyConnectorProps = ConnectedProps<typeof CurrencyConnector>;
