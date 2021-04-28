import { combineReducers } from 'redux';

import { CurrencyRatesReducer } from 'Layers/Application/Reducers/CurrencyRatesReducer/CurrencyRatesReducer';
import { FirebaseReducer } from 'Layers/Application/Reducers/FirebaseReducer/FirebaseReducer';
import { HomeReducer } from 'Layers/Application/Reducers/HomeReducer/HomeReducer';
import { StocksReducer } from 'Layers/Application/Reducers/StocksReducer/StocksReducer';

export default combineReducers({
  currencyRates: CurrencyRatesReducer,
  firebase: FirebaseReducer,
  home: HomeReducer,
  stocks: StocksReducer,
});
