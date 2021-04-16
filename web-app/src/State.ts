import { CurrenciesState } from 'Layers/Application/States/CurrenciesState/CurrenciesState';
import { FirebaseState } from 'Layers/Application/States/FirebaseState/FirebaseState';
import { HomeState } from 'Layers/Application/States/HomeState/HomeState';
import { StocksState } from 'Layers/Application/States/StocksState/StocksState';

export default interface State {
  currencies: CurrenciesState;
  firebase: FirebaseState;
  home: HomeState;
  stocks: StocksState;
} // eslint-disable-line semi
