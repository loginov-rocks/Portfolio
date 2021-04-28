import { CurrencyRatesState } from 'Layers/Application/States/CurrencyRatesState/CurrencyRatesState';
import { FirebaseState } from 'Layers/Application/States/FirebaseState/FirebaseState';
import { HomeState } from 'Layers/Application/States/HomeState/HomeState';
import { StocksState } from 'Layers/Application/States/StocksState/StocksState';

export default interface State {
  currencyRates: CurrencyRatesState;
  firebase: FirebaseState;
  home: HomeState;
  stocks: StocksState;
} // eslint-disable-line semi
