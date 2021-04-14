import { combineReducers } from 'redux';

import app from 'App/reducer';
import { CurrenciesReducer } from 'Layers/Application/Reducers/CurrenciesReducer/CurrenciesReducer';
import { FirebaseReducer } from 'Layers/Application/Reducers/FirebaseReducer/FirebaseReducer';
import stocks from 'Stocks/reducer';

export default combineReducers({
  app,
  currencies: CurrenciesReducer,
  firebase: FirebaseReducer,
  stocks,
});
