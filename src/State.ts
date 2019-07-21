import AppState from 'App/State';
import FirebaseState from 'Firebase/State';
import RatesState from 'Rates/State';
import StocksState from 'Stocks/State';

export default interface State {
  app: AppState;
  firebase: FirebaseState;
  rates: RatesState;
  stocks: StocksState;
}
