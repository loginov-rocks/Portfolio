import AppState from 'App/State';
import FirebaseState from 'Firebase/State';
import StocksState from 'Stocks/State';

export default interface State {
  app: AppState;
  firebase: FirebaseState;
  stocks: StocksState;
}
