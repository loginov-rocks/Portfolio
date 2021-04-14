import AppState from 'App/State';
import { CurrenciesState } from 'Layers/Application/States/CurrenciesState/CurrenciesState';
import { FirebaseState } from 'Layers/Application/States/FirebaseState/FirebaseState';
import StocksState from 'Stocks/State';

export default interface State {
  app: AppState;
  currencies: CurrenciesState;
  firebase: FirebaseState;
  stocks: StocksState;
} // eslint-disable-line semi
