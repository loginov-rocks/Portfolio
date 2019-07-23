import AppState from 'App/State';
import CurrenciesState from 'Currencies/State';
import FirebaseState from 'Firebase/State';
import StocksState from 'Stocks/State';

export default interface State {
  app: AppState;
  currencies: CurrenciesState;
  firebase: FirebaseState;
  stocks: StocksState;
}
